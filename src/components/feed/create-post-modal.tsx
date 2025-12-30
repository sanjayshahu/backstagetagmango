'use client';

import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { format } from 'date-fns';
import { Pencil, Trash2, Loader2 } from 'lucide-react';
import { ClockIcon } from '@phosphor-icons/react';
import { AvatarComponent } from '@/components/avatar-component';
import { Button } from '@/components/ui/button';
import { SplitButton } from '@/components/ui/split-button';
import {
  VisibilitySelector,
  VisibilitySelectorModalV2,
} from './visibility-selector';
import { SchedulePostModal } from './schedule-post-modal';
import { EditMediaModal } from './edit-media-modal';
import {
  MediaPreview,
  createMediaItemFromFile,
  createMediaItemFromAsset,
  type MediaItem,
} from './media-preview';
import { useCreatePost, useUpdatePost } from '@/hooks/use-posts';
import { useUploadStageAsset } from '@/hooks/use-assets';
import { useStagePasses } from '@/hooks/use-stages';
import type { BaseModalProps } from '@/types/modal';
import { ImageIcon, PlayCircleIcon, SmileyIcon } from '@phosphor-icons/react';
import { EmojiPicker, useEmojiInsertion } from '@/components/ui/emoji-picker';
import { Input } from '../ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../ui/tooltip';
import { BlurryImageEffect } from '../profile/BlurryImageEffect';
import { useSession } from '@/lib/auth-client';
import { Modal } from '@/components/modal';
import { Text } from '../ui/text';
import { Textarea } from '../ui/textarea';
import { toast } from '@/components/ui/sonner';
import { focusComponent } from '@/lib/utils';
import { CircularProgress } from '../customized/progress/progress-08';
import { useStageAccess } from '@/lib/stage-access-context';

const MAX_TEXT_LENGTH = 10000;
const MAX_MEDIA_ITEMS = 10;
const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB in bytes

type VisibilityType = 'public' | 'restricted';

export interface CreatePostModalProps extends BaseModalProps {
  stageId: string;
  currentUser?: {
    name?: string | null;
    image?: string | null;
  };
  onSuccess?: () => void;
  isEditMode?: boolean;
  postData?: {
    id: string;
    text: string | null;
    passes: { id: string }[];
    media: {
      id: string;
      type: string;
      url: string;
      thumbnailUrl?: string | null;
    }[];
  };
}

export function CreatePostModal({
  isOpen,
  onClose,
  stageId,
  currentUser,
  onSuccess,
  isEditMode = false,
  postData,
}: CreatePostModalProps) {
  const [text, setText] = useState('');
  const [selectedPassIds, setSelectedPassIds] = useState<string[]>([]);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const hideProgressTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [scheduledFor, setScheduledFor] = useState<Date | null>(null);
  const [isPassSelectionValid, setIsPassSelectionValid] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Local state for sub-modals (replaces context-based activeModal)
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showVisibilityModal, setShowVisibilityModal] = useState(false);
  const [showEditMediaModal, setShowEditMediaModal] = useState(false);

  // Resizable divider state
  const [textAreaHeight, setTextAreaHeight] = useState<number | null>(null);
  const isDraggingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { createPostAsync, isPending: isCreating } = useCreatePost();
  const { updatePostAsync, isPending: isUpdating } = useUpdatePost();
  const isPending = isCreating || isUpdating;
  const { uploadAsync } = useUploadStageAsset(stageId);

  const { role } = useStageAccess();
  const { data: { groundPass } = { groundPass: undefined } } = useStagePasses({ stageId });
  const isOwner = ['owner', 'admin', 'moderator'].includes(role ?? '');
  const [visibilityType, setVisibilityType] = useState<VisibilityType>(isOwner ? 'public' : 'restricted');
  const { data: userData } = useSession();
  const { insertEmoji } = useEmojiInsertion(setText, textareaRef);
  // Calculate the max height for textarea based on drag position or available space
  const getTextareaMaxHeight = useCallback(() => {
    if (textAreaHeight !== null) {
      return textAreaHeight; // User has dragged, use their preference
    }
    if (mediaItems.length > 0) {
      return 80; // Default ~3 lines when media is present
    }
    // No media - use most of available space
    if (containerRef.current) {
      return containerRef.current.clientHeight - 60; // Leave some padding
    }
    return 300; // Fallback
  }, [textAreaHeight, mediaItems.length]);

  // Auto-resize textarea with dynamic max height
  // Auto-resize textarea with max height
  const resizeTextarea = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const maxHeight = getTextareaMaxHeight();
      const newHeight = Math.min(textarea.scrollHeight, maxHeight);
      textarea.style.height = `${newHeight}px`;
      textarea.style.overflowY =
        textarea.scrollHeight > maxHeight ? 'auto' : 'hidden';
    }
  }, [getTextareaMaxHeight]);

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setText(value);
      resizeTextarea();
    },
    [resizeTextarea],
  );

  // Drag divider handlers
  const handleDragStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      isDraggingRef.current = true;
      document.body.style.cursor = 'row-resize';
      document.body.style.userSelect = 'none';
    },
    [],
  );

  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDraggingRef.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const relativeY = clientY - containerRect.top;

    // Clamp between min (56px for ~2 lines) and max (container height - 100px for media)
    const minHeight = 56;
    const maxHeight = containerRect.height - 100;
    const newHeight = Math.max(minHeight, Math.min(relativeY, maxHeight));

    setTextAreaHeight(newHeight);
  }, []);

  const handleDragEnd = useCallback(() => {
    isDraggingRef.current = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }, []);

  // Add/remove global drag listeners
  useEffect(() => {
    const moveHandler = (e: MouseEvent | TouchEvent) => handleDragMove(e);
    const endHandler = () => handleDragEnd();

    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mouseup', endHandler);
    document.addEventListener('touchmove', moveHandler);
    document.addEventListener('touchend', endHandler);

    return () => {
      document.removeEventListener('mousemove', moveHandler);
      document.removeEventListener('mouseup', endHandler);
      document.removeEventListener('touchmove', moveHandler);
      document.removeEventListener('touchend', endHandler);
    };
  }, [handleDragMove, handleDragEnd]);

  // Resize textarea when drag height or media items change
  useEffect(() => {
    resizeTextarea();
  }, [textAreaHeight, mediaItems.length, resizeTextarea]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setText('');
      setSelectedPassIds([]);
      setVisibilityType(isOwner ? 'public' : 'restricted');
      setMediaItems([]);
      setIsUploading(false);
      setScheduledFor(null);
      setIsPassSelectionValid(true);
      setShowScheduleModal(false);
      setShowVisibilityModal(false);
      setShowEditMediaModal(false);
      setTextAreaHeight(null);
      // Clear upload progress state
      if (hideProgressTimeoutRef.current) {
        clearTimeout(hideProgressTimeoutRef.current);
        hideProgressTimeoutRef.current = null;
      }
      setShowProgress(false);
    } else if (isEditMode && postData) {
      // Initialize state from postData in edit mode
      setText(postData.text ?? '');
      setSelectedPassIds(postData.passes.map((p) => p.id));
      // Convert media to MediaItem format for display (read-only)
      setMediaItems(
        postData.media.map((m) => ({
          id: m.id,
          type: m.type as 'image' | 'video',
          url: m.url,
          thumbnailUrl: m.thumbnailUrl ?? undefined,
          isUploading: false,
        })),
      );
    }
  }, [isOpen, isEditMode, postData]);

  // Clear state on unmount
  useEffect(() => {
    return () => {
      setText('');
      setSelectedPassIds([]);
      setVisibilityType(isOwner ? 'public' : 'restricted');
      setMediaItems([]);
      setIsUploading(false);
      setScheduledFor(null);
      setIsPassSelectionValid(true);
      setShowScheduleModal(false);
      setShowVisibilityModal(false);
      setShowEditMediaModal(false);
      // Clear upload progress timeout on unmount
      if (hideProgressTimeoutRef.current) {
        clearTimeout(hideProgressTimeoutRef.current);
      }
    };
  }, []);

  // Initialize selectedPassIds with ground pass when modal opens (create mode only)
  // useEffect(() => {
  //   if (isOpen && !isEditMode && groundPass && selectedPassIds.length === 0) {
  //     setSelectedPassIds([groundPass.id]);
  //     setVisibilityType(isOwner ? 'public' : 'restricted');
  //   }
  // }, [isOpen, isEditMode, groundPass, selectedPassIds.length]);

  // Handle file selection
  const handleFileSelect = useCallback(
    async (files: FileList | null, _type: 'image' | 'video' | 'audio') => {
      if (!files || files.length === 0) return;

      // Early return if already at max capacity
      if (mediaItems.length >= MAX_MEDIA_ITEMS) {
        toast.warning(`Maximum ${MAX_MEDIA_ITEMS} media items allowed`);
        return;
      }

      const remainingSlots = MAX_MEDIA_ITEMS - mediaItems.length;
      const allFiles = Array.from(files);

      // Block upload if selected files exceed remaining slots
      if (allFiles.length > remainingSlots) {
        toast.error(
          `Cannot upload ${allFiles.length} files. Only ${remainingSlots} slot(s) remaining (max ${MAX_MEDIA_ITEMS} items).`,
        );
        return;
      }

      // Block upload if any file exceeds max file size (500MB)
      const oversizedFiles = allFiles.filter(
        (file) => file.size > MAX_FILE_SIZE,
      );
      if (oversizedFiles.length > 0) {
        toast.error(
          `Cannot upload: ${oversizedFiles.length} file(s) exceed 500MB limit`,
        );
        return;
      }

      setIsUploading(true);
      setShowProgress(true);

      // Clear any existing hide timeout
      if (hideProgressTimeoutRef.current) {
        clearTimeout(hideProgressTimeoutRef.current);
        hideProgressTimeoutRef.current = null;
      }

      // Create local preview items
      const newItems = allFiles.map((file) => createMediaItemFromFile(file));
      setMediaItems((prev) => [...prev, ...newItems]);

      // Upload files one by one
      for (let i = 0; i < allFiles.length; i++) {
        const file = allFiles[i];
        const localItem = newItems[i];

        try {
          const result = await uploadAsync({
            file,
            passIds: selectedPassIds,
            durationInSeconds: 0,
          });

          // Replace local item with uploaded asset
          setMediaItems((prev) =>
            prev.map((item) =>
              item.id === localItem.id
                ? createMediaItemFromAsset(result.asset)
                : item,
            ),
          );
        } catch (error) {
          console.error('Failed to upload file:', error);
          // Remove failed item
          setMediaItems((prev) =>
            prev.filter((item) => item.id !== localItem.id),
          );
        }
      }

      setIsUploading(false);

      // Hide progress after 2 seconds if all uploads are complete
      hideProgressTimeoutRef.current = setTimeout(() => {
        // Check if all media items are done uploading
        setMediaItems((currentItems) => {
          const allDone = currentItems.every((item) => !item.isUploading);
          if (allDone) {
            setShowProgress(false);
          }
          return currentItems;
        });
      }, 2000);
    },
    [mediaItems.length, uploadAsync, selectedPassIds],
  );

  // Handle media removal
  const handleRemoveMedia = useCallback((id: string) => {
    setMediaItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // Handle post submission (create or update)
  const handleSubmit = async () => {
    if (!text.trim() && mediaItems.length === 0) return;
    const finalPassIds = visibilityType === 'public' ? [groundPass?.id ?? ''] : selectedPassIds;
    try {
      if (isEditMode && postData) {
        // UPDATE existing post (only text and passIds can be changed)
        await updatePostAsync({
          postId: postData.id,
          stageId,
          data: {
            text: text.trim(),
            passIds: finalPassIds,
          },
        });
      } else {
        // CREATE new post
        const assetIds = mediaItems
          .filter((item) => !item.isUploading && !item.id.startsWith('local_'))
          .map((item) => item.id);

        await createPostAsync({
          stageId,
          text: text.trim(),
          passIds: finalPassIds,
          assets: assetIds.length > 0 ? assetIds : undefined,
          scheduledFor: scheduledFor?.toISOString(),
        });
      }

      onSuccess?.();
      onClose('success');
    } catch (error) {
      console.error('Failed to save post:', error);
    }
  };

  // File input refs
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // const canPost =
  //   (text.trim().length > 0 || mediaItems.length > 0) &&
  //   text.length <= MAX_TEXT_LENGTH &&
  //   !isUploading &&
  //   !isPending &&
  //   isPassSelectionValid;
  const postingConditionsMet = useMemo(() => {
    // Evaluate each condition, setting status and reason if failing
    if (!(text.trim().length > 0 || mediaItems.length > 0)) {
      return { status: false, reason: 'Add text or media to post.' };
    }
    if (text.length > MAX_TEXT_LENGTH) {
      return {
        status: false,
        reason: `Text exceeds maximum length of ${MAX_TEXT_LENGTH} characters.`,
      };
    }
    if (isUploading) {
      return { status: false, reason: 'Media is still uploading.' };
    }
    if (isCreating) {
      return { status: false, reason: 'Post is being created.' };
    }
    if (!isPassSelectionValid) {
      return { status: false, reason: 'Select a pass to continue.' };
    }
    return { status: true, reason: '' };
  }, [text, mediaItems, isUploading, isCreating, isPassSelectionValid]);

  const handleMainModalClose = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const uploadedFileCount = mediaItems.filter((m) => !m.isUploading).length;

  return (
    <>
      {/* Main Create Post Modal */}
      <Modal
        open={isOpen}
        onOpenChange={handleMainModalClose}
        showCloseButton={true}
        dismissible={false}
        wrapperClassName="p-0!"
        className="min-w-150 rounded-t-3xl! md:rounded-3xl! overflow-hidden p-0!"
      >
        <div className="relative min-h-[85dvh] max-h-[85dvh] flex flex-col bg-background">
          {/* Cover image as background */}
          <div className="absolute inset-x-0 top-0 overflow-hidden rounded-t-3xl md:rounded-t-3xl">
            <BlurryImageEffect
              className="h-45 w-full"
              src={userData?.user.image || '/creator_dp.png'}
            />
          </div>

          {/* Author section - fixed at top */}
          <div className="relative z-1 mx-12 mt-12">
            {/* Avatar - large with blue ring */}
            <AvatarComponent
              src={currentUser?.image}
              username={currentUser?.name ?? undefined}
              size="size-24"
            />

            <div className="flex flex-col gap-2">
              {/* Name */}
              <Text
                as="h3"
                className="font-semibold text-[20px] text-neutral-12 mt-6"
              >
                {currentUser?.name || 'Anonymous User'}
              </Text>

              {/* Visibility selector pill */}
              <div className="">
                <VisibilitySelector
                  stageId={stageId}
                  visibilityType={visibilityType}
                  selectedPassIds={selectedPassIds}
                  onOpenChange={(open) => setShowVisibilityModal(open)}
                  onValidityChange={setIsPassSelectionValid}
                />
              </div>
            </div>
          </div>

          {/* Scrollable content area - text and media only */}
          <div
            ref={containerRef}
            className="flex-1 relative z-1 mx-12 mt-3 overflow-y-auto scrollbar-hide flex flex-col"
            onClick={() => focusComponent(textareaRef.current)}
          >
            {/* Text area container */}
            <div className="relative mt-5">
              {/* Text input - height controlled by resizeTextarea() */}
              <Textarea
                ref={textareaRef}
                value={text}
                onChange={handleTextChange}
                placeholder="What do you want to share about?"
                className="w-full p-0 resize-none bg-transparent border-0 outline-none text-neutral-12 placeholder:text-neutral-alpha-8 text-base scrollbar-thin scrollbar-thumb-neutral-6 scrollbar-track-transparent min-h-0!"
                rows={1}
                autoFocus
              />
            </div>

            {/* Spacer - pushes character count to bottom when no media */}
            {mediaItems.length === 0 && <div className="flex-1" />}

            {/* Character count - at bottom when no media, below textarea when media exists */}
            <div
              className={`text-xs mb-3 text-right ${text.length > MAX_TEXT_LENGTH ? 'text-red-9' : 'text-mauve-11'
                }`}
            >
              {text.length}/{MAX_TEXT_LENGTH}
            </div>

            {/* Drag divider between text and media */}
            {mediaItems.length > 0 && (
              <div
                className="flex items-center justify-center py-3 cursor-row-resize group"
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-16 h-1.5 rounded-full bg-neutral-7 group-hover:bg-neutral-9 transition-colors" />
              </div>
            )}

            {/* Media preview */}
            {mediaItems.length > 0 && (
              <div
                className="pb-4"
                // stop propagation on click on media so that text area will not be focused
                onClick={(e) => e.stopPropagation()}
              >
                <MediaPreview
                  items={mediaItems}
                  onRemove={isEditMode ? () => { } : handleRemoveMedia}
                  onEditClick={
                    isEditMode ? undefined : () => setShowEditMediaModal(true)
                  }
                />
              </div>
            )}
          </div>

          {/* Footer toolbar */}
          <div className="px-12 pt-3 pb-12 flex items-center justify-between">
            {/* Media buttons */}
            <div className="flex items-center gap-3">
              {/* Image button - hidden in edit mode */}
              {!isEditMode && (
                <>
                  <Button
                    type="button"
                    onClick={() => imageInputRef.current?.click()}
                    disabled={
                      mediaItems.length >= MAX_MEDIA_ITEMS || isUploading
                    }
                    className="w-12 h-12 rounded-full bg-blue-3 flex items-center justify-center hover:bg-blue-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Add images"
                  >
                    <ImageIcon
                      className="size-6 text-blue-9"
                      height={24}
                      width={24}
                      size={24}
                      weight="fill"
                    />
                  </Button>
                  <Input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    disabled={mediaItems.length >= MAX_MEDIA_ITEMS}
                    onChange={(e) => handleFileSelect(e.target.files, 'image')}
                  />
                </>
              )}

              {/* Video button - hidden in edit mode */}
              {!isEditMode && (
                <>
                  <Button
                    type="button"
                    onClick={() => videoInputRef.current?.click()}
                    disabled={
                      mediaItems.length >= MAX_MEDIA_ITEMS || isUploading
                    }
                    className="w-12 h-12 rounded-full bg-red-3 hover:bg-red-4 flex items-center justify-center"
                    title="Add video"
                  >
                    <PlayCircleIcon
                      className="size-6 text-red-9"
                      weight="fill"
                    />
                  </Button>
                  <Input
                    ref={videoInputRef}
                    type="file"
                    accept="video/*"
                    multiple
                    className="hidden"
                    disabled={mediaItems.length >= MAX_MEDIA_ITEMS}
                    onChange={(e) => handleFileSelect(e.target.files, 'video')}
                  />
                </>
              )}

              {/* emoji button - always visible */}
              <EmojiPicker
                onEmojiSelect={(emoji) => insertEmoji(emoji.native)}
                showRecent={true}
                showSearch={true}
                side="top"
                align="start"
              >
                <Button
                  type="button"
                  className="h-12 w-12 rounded-full bg-amber-3 flex items-center justify-center hover:bg-amber-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Add emoji"
                >
                  <SmileyIcon className="size-6 text-amber-10" weight="fill" />
                </Button>
              </EmojiPicker>
            </div>

            <div className="flex gap-4">
              {/* Upload progress - invisible when not uploading */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={
                      showProgress && mediaItems.length > 0
                        ? 'opacity-100 cursor-pointer'
                        : 'opacity-0 pointer-events-none'
                    }
                  >
                    <CircularProgress
                      value={(uploadedFileCount / mediaItems.length) * 100 || 0}
                      size={55}
                      strokeWidth={5}
                      showLabel
                      renderLabel={() =>
                        `${uploadedFileCount}/${mediaItems.length}`
                      }
                      labelClassName="text-xs font-medium text-neutral-12"
                      className="stroke-static-neutral-9"
                      progressClassName="stroke-static-success-9"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className='z-1000 text-white bg-black'>
                  Uploading
                </TooltipContent>
              </Tooltip>

              {!isPassSelectionValid ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>
                      <SplitButton
                        variant="accent"
                        inactive={!postingConditionsMet.status}
                        autoIconWidth={true}
                        icon={
                          isPending ? (
                            <Loader2 className="size-6 text-[#fff] animate-spin" />
                          ) : (
                            <ClockIcon
                              className="size-6 text-[#fff]"
                              weight="regular"
                            />
                          )
                        }
                        onIconClick={() =>
                          !isEditMode && setShowScheduleModal(true)
                        }
                        onTextClick={handleSubmit}
                        textDisabled={!postingConditionsMet.status}
                        hideIcon={true}
                        size={'lg'}
                      >
                        <span className="text-[#fff]">
                          {isPending
                            ? isEditMode
                              ? 'Saving...'
                              : scheduledFor
                                ? 'Scheduling...'
                                : 'Posting...'
                            : isEditMode
                              ? 'Save Changes'
                              : scheduledFor
                                ? 'Schedule'
                                : 'Post'}
                        </span>
                      </SplitButton>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="top" className='z-1000 text-white bg-black'>
                    Select a pass to continue
                  </TooltipContent>
                </Tooltip>
              ) : (
                <SplitButton
                  variant="accent"
                  inactive={!postingConditionsMet.status}
                  autoIconWidth={true}
                  icon={
                    isPending ? (
                      <Loader2 className="size-6 text-[#fff] animate-spin" />
                    ) : (
                      <ClockIcon
                        className="size-6 text-[#fff]"
                        weight="regular"
                      />
                    )
                  }
                  onIconClick={() => !isEditMode && setShowScheduleModal(true)}
                  onTextClick={handleSubmit}
                  textDisabled={!postingConditionsMet.status}
                  hideIcon={true}
                  size={'lg'}
                >
                  <span className="text-[#fff]">
                    {isPending
                      ? isEditMode
                        ? 'Saving...'
                        : scheduledFor
                          ? 'Scheduling...'
                          : 'Posting...'
                      : isEditMode
                        ? 'Save Changes'
                        : scheduledFor
                          ? 'Schedule'
                          : 'Post'}
                  </span>
                </SplitButton>
              )}
            </div>
          </div>

          {/* Schedule banner */}
          {scheduledFor && (
            <>
              <div className="bg-amber-2 px-6 py-3 flex items-center justify-between border-t border-mauve-6">
                <div className="flex items-center gap-2 text-sm text-amber-11">
                  <ClockIcon className="size-4" />
                  <Text as="span">
                    Schedule for: {format(scheduledFor, 'MMM d, yyyy')} at{' '}
                    {format(scheduledFor, 'h:mm a')}
                  </Text>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowScheduleModal(true)}
                    requireAuth={false}
                    className="text-amber-11 hover:text-amber-12 hover:bg-transparent h-auto w-auto p-0"
                    title="Edit schedule"
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setScheduledFor(null)}
                    requireAuth={false}
                    className="text-amber-11 hover:text-amber-12 hover:bg-transparent h-auto w-auto p-0"
                    title="Remove schedule"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowScheduleModal(true)}
                  requireAuth={false}
                  className="text-[#D4A853] hover:text-[#c49843] hover:bg-transparent h-auto w-auto p-0"
                  title="Edit schedule"
                >
                  <Pencil className="size-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setScheduledFor(null)}
                  requireAuth={false}
                  className="text-[#D4A853] hover:text-[#c49843] hover:bg-transparent h-auto w-auto p-0"
                  title="Remove schedule"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </>
          )}
        </div>
      </Modal>

      {/* Schedule Modal - controlled by local state */}
      <SchedulePostModal
        open={showScheduleModal}
        value={scheduledFor}
        onChange={setScheduledFor}
        onClose={() => setShowScheduleModal(false)}
      />

      {/* Visibility Selector Modal - controlled by local state */}
      <VisibilitySelectorModalV2
        open={showVisibilityModal}
        stageId={stageId}
        selectedPassIds={selectedPassIds}
        visibilityType={visibilityType}
        onDone={({passIds, visibilityType}) => {
          setSelectedPassIds(passIds);
          setVisibilityType(visibilityType);
        }}
        onClose={() => setShowVisibilityModal(false)}
        onValidityChange={setIsPassSelectionValid}
      />

      {/* Edit Media Modal - controlled by local state */}
      {mediaItems.length > 0 && (
        <EditMediaModal
          open={showEditMediaModal}
          onOpenChange={setShowEditMediaModal}
          items={mediaItems}
          onDone={setMediaItems}
          onRemove={handleRemoveMedia}
        />
      )}
    </>
  );
}
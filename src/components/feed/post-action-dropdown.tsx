'use client';

import * as React from 'react';
import { MoreHorizontal, Trash, Pencil } from 'lucide-react';
import { PushPin, PushPinSlash } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ConfirmationModal } from '@/components/ui/confirmation-modal';
import { useSession } from '@/lib/auth-client';
import { useStageAccess } from '@/lib/stage-access-context';
import { useDeletePost, usePinPost } from '@/hooks/use-posts';

// ============================================
// Type Definitions
// ============================================

export interface PostCardActionDropdownProps {
    postId: string;
    authorId: string;
    stageId: string;
    isPinned?: boolean;
    onEdit?: () => void;
}

// ============================================
// Main Component
// ============================================

export function PostCardActionDropdown({
    postId,
    authorId,
    stageId,
    isPinned = false,
    onEdit,
}: PostCardActionDropdownProps) {
    const { data: session } = useSession();
    const { role } = useStageAccess();
    const { deletePost, isPending: isDeleting } = useDeletePost();
    const { pinPost, isPending: isPinning } = usePinPost();
    const [showConfirmation, setShowConfirmation] = React.useState(false);

    const isOwnPost = session?.user?.id === authorId;
    const isStaff = role === 'owner' || role === 'admin' || role === 'moderator';

    const handleDeleteClick = React.useCallback(() => {
        setShowConfirmation(true);
    }, []);

    const handleConfirmDelete = React.useCallback(() => {
        deletePost({ postId, stageId });
    }, [deletePost, postId, stageId]);

    const handlePinClick = React.useCallback(() => {
        pinPost({ postId, stageId });
    }, [pinPost, postId, stageId]);

    // Show dropdown if user owns the post OR is staff
    if (!isOwnPost && !isStaff) {
        return null;
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        requireAuth={false}
                        className="w-8 h-8 rounded-full hover:bg-black/5 focus-visible:ring-0 -mr-2 -mt-2"
                        aria-label="Post options"
                    >
                        <MoreHorizontal className="w-5 h-5 text-neutral-12" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    {/* Edit - only for post owner */}
                    {isOwnPost && (
                        <DropdownMenuItem onClick={onEdit}>
                            <Pencil className="w-4 h-4 mr-2" />
                            Edit Post
                        </DropdownMenuItem>
                    )}

                    {/* Pin/Unpin - only for staff */}
                    {isStaff && (
                        <DropdownMenuItem onClick={handlePinClick} disabled={isPinning}>
                            {isPinned ? (
                                <>
                                    <PushPinSlash className="w-4 h-4 mr-2" />
                                    Unpin Post
                                </>
                            ) : (
                                <>
                                    <PushPin className="w-4 h-4 mr-2" />
                                    Pin Post
                                </>
                            )}
                        </DropdownMenuItem>
                    )}

                    {/* Delete - for post owner OR staff */}
                    {(isOwnPost || isStaff) && (
                        <DropdownMenuItem onClick={handleDeleteClick} variant="destructive">
                            <Trash className="w-4 h-4 mr-2" />
                            Delete Post
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            <ConfirmationModal
                open={showConfirmation}
                onOpenChange={setShowConfirmation}
                title="Delete Post"
                description="Are you sure you want to delete this post? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                variant="destructive"
                loading={isDeleting}
                onConfirm={handleConfirmDelete}
            />
        </>
    );
}

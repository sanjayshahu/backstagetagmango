'use client';

import { AvatarComponent } from '@/components/avatar-component';
import { Login } from '@/components/login';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/sonner';
import { Text } from '@/components/ui/text';
import { ExpandableText } from '@/components/ui/expandable-text';
import { useSession } from '@/lib/auth-client';
import { useAuthGate } from '@/lib/auth-gate-context';
import { SkeletonProvider } from '@/lib/skeleton-context';
import { useStageAccess } from '@/lib/stage-access-context';
import {
  NewspaperIcon,
  TicketIcon,
  TrophyIcon,
  VideoCameraIcon,
} from '@phosphor-icons/react';
import { ChevronDown, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { CreatePostModal } from '../feed/create-post-modal';
import { PageHeader } from '../header/header';
import { ProfileHeaderTabs } from '../header/header-tabs';
import { StickyHeader } from '../header/sticky-header';
import { CreateStreamModal } from '../streams/modal/create-stream-modal';
import { ProfileStats } from './profile-stats';

interface ProfileHeaderProps {
  slug: string;
}

const MOBILE_BREAKPOINT = 768;

export function ProfileHeaderV2({ slug }: ProfileHeaderProps) {
  const router = useRouter();
  const { data: session, isPending: isSessionPending } = useSession();
  const { logout } = useAuthGate();
  const { stage, isLoading, role } = useStageAccess();
  const isOwner = role === 'owner';

  // Mobile detection state for create stream
  const [isMobile, setIsMobile] = useState(false);

  // Profile dropdown state for hover behavior
  // const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  // Modal states
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [createStreamModalOpen, setCreateStreamModalOpen] = useState(false);
  const [createPostModalOpen, setCreatePostModalOpen] = useState(false);

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const user = session?.user;
  const isLoggedIn = !!user;

  const handleOpenLoginModal = () => {
    setLoginModalOpen(true);
  };

  const handleShareProfile = useCallback(async () => {
    const url = `${window.location.origin}/${slug}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Profile link copied to clipboard');
    } catch {
      toast.error('Failed to copy link');
    }
  }, [slug]);

  // Helper to get avatar URL for stream modal
  const getAvatarUrl = useCallback((): string => {
    const image = stage?.owner?.image;
    if (typeof image === 'string') return image;
    return '/creator_dp.png';
  }, [stage?.owner?.image]);

  // Handler for opening create stream modal/drawer
  const handleOpenCreateStream = useCallback(() => {
    if (!stage) return;

    if (isMobile) {
      // Open drawer on mobile
      router.push(`/${slug}/stream-mobile`);
    } else {
      // Open modal on desktop
      setCreateStreamModalOpen(true);
    }
  }, [stage, isMobile, slug, router]);

  const handleCreatePost = useCallback(() => {
    if (!stage) return;
    setCreatePostModalOpen(true);
  }, [stage]);

  const CREATE_ACTIONS = [
    {
      showSeparator: false,
      icon: <NewspaperIcon className="text-success-10 size-6" weight="fill" />,
      label: 'Post on Feed',
      dscription: 'Share with everyone in your community',
      onClick: handleCreatePost,
      bgColor: 'bg-success-4',
    },
    {
      showSeparator: false,
      icon: <VideoCameraIcon className="text-info-10 size-6" weight="fill" />,
      label: 'Create Stream',
      dscription: 'Create group video call slots',
      onClick: handleOpenCreateStream,
      bgColor: 'bg-info-4',
    },
    {
      showSeparator: false,
      icon: <TrophyIcon className="text-orange-10 size-6" weight="fill" />,
      label: 'Create Challenge',
      dscription: 'Create a goal-based challenge for members',
      onClick: () => {
        console.log('create challenge');
      },
      bgColor: 'bg-orange-3',
    },
    {
      showSeparator: true,
      icon: <TicketIcon className="text-error-10 size-6" weight="fill" />,
      label: 'Create Pass',
      dscription: 'Sell access to exclusive content',
      onClick: () => {
        router.push(`/${slug}/pass`);
      },
      bgColor: 'bg-error-4',
    },
  ];

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 280);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <SkeletonProvider loading={isLoading}>
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out
                ${isSticky ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
            `}
      >
        <StickyHeader
          slug={slug}
          avatarSrc={
            (stage?.image as string) || (stage?.owner?.image as string)
          }
          name={stage?.name}
          isLoggedIn={isLoggedIn}
          isSessionPending={isSessionPending}
          user={user}
          onLoginClick={handleOpenLoginModal}
          onLogout={logout}
          isHeaderSticky={isSticky}
        />
      </div>
      <PageHeader
        isLoggedIn={isLoggedIn}
        isSessionPending={isSessionPending}
        user={user}
        onLoginClick={handleOpenLoginModal}
        onLogout={logout}
      />
      <div className="border-b border-neutral-6 relative z-50">
        <div className="mx-auto max-w-264 space-y-2 px-4">
          {/* Info wrapper */}
          <div className="flex justify-between w-full gap-10 py-3">
            <div className="flex items-center gap-8">
              <AvatarComponent
                src={(stage?.image as string) || (stage?.owner.image as string)}
                username={stage?.name}
                size="size-35.5"
                className="shadow-xl"
              />

              {/* Profile Details */}
              <div className="flex flex-col">
                <Text
                  as="h2"
                  className="text-[42px] font-semibold text-neutral-12"
                >
                  {stage?.name}
                </Text>

                {/* Subtitle - fades out */}
                <div className="flex flex-col">
                  <Text
                    as="h5"
                    className="text-sm font-medium text-neutral-alpha-12 "
                  >
                    {stage?.owner.name}
                  </Text>

                  {/* Stats Badges - from stage description */}
                  <div className="flex items-center mt-4">
                    <ExpandableText
                      content={(stage?.description as unknown as string) || ''}
                      maxLines={3}
                      textClassName="text-base font-medium text-neutral-12"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-5 pt-3">
              {isOwner ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button>
                      {/* Main button section */}
                      <span className="flex items-center gap-3 px-1 h-10">
                        <Plus className="w-4.5 h-4.5 text-[#fff]" />
                        <span className="text-base font-medium text-[#fff]">
                          Create
                        </span>
                      </span>
                      {/* Dropdown arrow section - separated by border */}
                      <span className="flex items-center h-10 pl-3 pr-1 border-l border-[#E0B669]">
                        <ChevronDown className="w-5 h-5 text-[#fff]" />
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {CREATE_ACTIONS.map((action) => (
                      <div>
                        {action.showSeparator && <DropdownMenuSeparator />}
                      <DropdownMenuItem
                        className="py-8 my-2"
                        key={action.label}
                        onClick={action.onClick}
                      >
                        <div className="flex items-center gap-4">
                          <span
                            className={`flex items-center justify-center rounded-full w-12 h-12 ${action.bgColor}`}
                          >
                            {action.icon}
                          </span>
                          <div>
                            <Text className="text-base font-bold text-neutral-12">
                              {action.label}
                            </Text>
                            <Text className="text-sm text-neutral-10">
                              {action.dscription}
                            </Text>
                          </div>
                        </div>
                      </DropdownMenuItem>
                      </div>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="outline" onClick={handleShareProfile}>
                  <span className="text-base font-medium">Share Profile</span>
                </Button>
              )}

              {/* Subscriber/Post Stats */}
              <ProfileStats
                subscribersCount={stage?.subscribersCount || 0}
                postsCount={stage?.postsCount || 0}
              />
            </div>
          </div>

          {/* Tabs */}
          <ProfileHeaderTabs slug={slug} />
        </div>
      </div>

      {/* Login Modal */}
      <Login open={loginModalOpen} onOpenChange={setLoginModalOpen} />

      {/* Create Stream Modal */}
      <CreateStreamModal
        isOpen={createStreamModalOpen}
        onClose={() => setCreateStreamModalOpen(false)}
        creatorName={stage?.owner?.name ?? 'Creator'}
        creatorAvatar={getAvatarUrl()}
        onStreamCreated={(data) => {
          console.log('Stream created:', data);
        }}
        stageId={stage?.id ?? ''}
      />
      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={createPostModalOpen}
        onClose={() => setCreatePostModalOpen(false)}
        currentUser={user}
        onSuccess={() => setCreatePostModalOpen(false)}
        stageId={stage?.id ?? ''}
      />
    </SkeletonProvider>
  );
}

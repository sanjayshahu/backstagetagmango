'use client';

import { AvatarComponent } from '@/components/avatar-component';
import { Login } from '@/components/login';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/sonner';
import { Text } from '@/components/ui/text';
import { useSession } from '@/lib/auth-client';
import { useAuthGate } from '@/lib/auth-gate-context';
import { SkeletonProvider } from '@/lib/skeleton-context';
import { useStageAccess } from '@/lib/stage-access-context';
import { cn } from '@/lib/utils';
import {
  BellIcon,
  CompassIcon,
  NewspaperIcon,
  TicketIcon,
  TrophyIcon,
  VideoCameraIcon,
} from '@phosphor-icons/react';
import { ChevronDown, Plus } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import MainLogo from '../../../public/main_logo.svg';
import { CreatePostModal } from '../feed/create-post-modal';
import { CreateStreamModal } from '../streams/modal/create-stream-modal';
import { Image } from '../ui/image';
import { ProfileStats } from './profile-stats';
import UserInfoPopover from './user-info-popover';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import Link from 'next/link';

interface ProfileHeaderProps {
  slug: string;
  progress: number;
}

const MOBILE_BREAKPOINT = 768;

function lerp(start: number, end: number, progress: number): number {
  return start + (end - start) * progress;
}

// Animation constants
const INITIAL = {
  avatarSize: 142,
  nameSize: 42,
  headerHeight: 280,
};

const FINAL = {
  avatar: { size: 32 },
  name: { size: 16 },
  headerHeight: 60,
};

interface InitialPositions {
  avatar: { x: number; y: number };
  name: { x: number; y: number };
  tabs: { x: number; y: number; width: number; height: number };
  header: { height: number; top: number; width: number };
}

const PROFILE_TABS = [
  {
    value: 'backstage',
    icon: <CompassIcon weight="duotone" className="size-5" />,
    activeIcon: <CompassIcon weight="fill" className="size-5" />,
    label: 'Backstage',
    path: 'backstage',
  },
  {
    value: 'streams',
    icon: <VideoCameraIcon weight="duotone" className="size-5" />,
    activeIcon: <VideoCameraIcon weight="fill" className="size-5" />,
    label: 'Streams',
    path: 'streams',
  },
  {
    value: 'passes',
    icon: <TicketIcon weight="duotone" className="size-5" />,
    activeIcon: <TicketIcon weight="fill" className="size-5" />,
    label: 'Passes',
    path: 'passes',
  },
] as const;
type ProfileTabValue = (typeof PROFILE_TABS)[number]['value'];

export function ProfileHeader({ slug, progress }: ProfileHeaderProps) {
  const router = useRouter();
  const { stage, isLoading, role } = useStageAccess();
  const isOwner = role === 'owner';
  const { data: session, isPending: isSessionPending } = useSession();
  const isLoggedIn = !!session?.user;

  const tabsToDisplay = [PROFILE_TABS[0], ...(isLoggedIn && isOwner ? [PROFILE_TABS[1]] : []), PROFILE_TABS[2]];
  const { logout } = useAuthGate();
  const logoutUser = useCallback(() => {
    logout();
    router.push(`/${slug}`);
  }, [logout, router, slug]);

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

  // Refs for animated elements
  const headerRef = useRef<HTMLElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  // State for captured initial positions
  const [initialPositions, setInitialPositions] =
    useState<InitialPositions | null>(null);

  const user = session?.user;

  const currentPath = usePathname();
  const activeTab: ProfileTabValue =
    PROFILE_TABS.find((tab) => currentPath.includes(`/${tab.path}`))?.value ??
    'backstage';

  // Capture initial positions on mount
  useLayoutEffect(() => {
    if (
      !avatarRef.current ||
      !nameRef.current ||
      !tabsRef.current ||
      !headerRef.current
    )
      return;
    if (isLoading) return; // Wait for data to load

    const headerRect = headerRef.current.getBoundingClientRect();
    const avatarRect = avatarRef.current.getBoundingClientRect();
    const nameRect = nameRef.current.getBoundingClientRect();
    const tabsRect = tabsRef.current.getBoundingClientRect();

    setInitialPositions({
      avatar: { x: avatarRect.left, y: avatarRect.top },
      name: { x: nameRect.left, y: nameRect.top },
      tabs: {
        x: tabsRect.left,
        y: tabsRect.top,
        width: tabsRect.width,
        height: tabsRect.height,
      },
      header: {
        height: headerRect.height,
        top: headerRect.top,
        width: headerRect.width,
      },
    });
  }, [isLoading]);

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
      icon: <NewspaperIcon className="text-success-10 size-6" weight="fill" />,
      label: 'Post on Feed',
      dscription: 'Share with everyone in your community',
      onClick: handleCreatePost,
      bgColor: 'bg-success-4',
    },
    {
      icon: <VideoCameraIcon className="text-info-10 size-6" weight="fill" />,
      label: 'Create Stream',
      dscription: 'Create group video call slots',
      onClick: handleOpenCreateStream,
      bgColor: 'bg-info-4',
    },
    {
      icon: <TrophyIcon className="text-orange-10 size-6" weight="fill" />,
      label: 'Create Challenge',
      dscription: 'Create a goal-based challenge for members',
      onClick: () => {
        console.log('create challenge');
      },
      bgColor: 'bg-orange-3',
    },
    {
      icon: <NewspaperIcon className="text-error-10 size-6" weight="fill" />,
      label: 'Create Pass',
      dscription: 'Sell access to exclusive content',
      onClick: () => {
        router.push(`/${slug}/pass`);
      },
      bgColor: 'bg-error-4',
    },
  ];
  // Calculate animated values
  const headerHeight = initialPositions
    ? lerp(initialPositions.header.height, FINAL.headerHeight, progress)
    : INITIAL.headerHeight;

  // Avatar animation: scale from 142px to 32px, translate to top-left
  const avatarScale = lerp(1, FINAL.avatar.size / INITIAL.avatarSize, progress);
  const avatarTranslateX = initialPositions
    ? lerp(0, 24 - initialPositions.avatar.x, progress)
    : 0;
  const avatarTranslateY = initialPositions
    ? lerp(
      0,
      14 - initialPositions.avatar.y + (initialPositions.header.top || 0),
      progress,
    )
    : 0;

  // Name animation: scale from 42px to 16px, translate next to collapsed avatar
  const nameScale = lerp(1, FINAL.name.size / INITIAL.nameSize, progress);
  // Final X position: avatar left (24) + avatar size (32) + gap (12) = 68
  const nameTranslateX = initialPositions
    ? lerp(0, 65 - initialPositions.name.x, progress)
    : 0;
  const nameTranslateY = initialPositions
    ? lerp(
      0,
      18 - initialPositions.name.y + (initialPositions.header.top || 0),
      progress,
    )
    : 0;

  // Tabs animation: use absolute positioning to animate from bottom to center
  // Initial position: relative to header top (tabs.y - header.top)
  // Final position: centered vertically in 60px header, centered horizontally
  const tabsInitialTop = initialPositions
    ? initialPositions.tabs.y - initialPositions.header.top
    : 232; // approximate: top nav (~52px) + profile section (~180px)
  // const tabsInitialLeft = initialPositions ? initialPositions.tabs.x : 208; // matches md:px-[208px] on desktop

  // Final position: vertically centered in 60px header, horizontally centered
  const tabsFinalTop =
    (FINAL.headerHeight - (initialPositions?.tabs.height || 44)) / 2;
  // const tabsFinalLeft = initialPositions
  //   ? (initialPositions.header.width - initialPositions.tabs.width) / 2
  //   : 0;

  // Interpolate positions
  const tabsTop = lerp(tabsInitialTop, tabsFinalTop, progress);
  // const tabsLeft = lerp(tabsInitialLeft, tabsFinalLeft, progress);

  const tabsTranslateX = initialPositions
    ? lerp(
      0, // default → left aligned
      initialPositions.header.width / 2 -
      initialPositions.tabs.width / 3.4 -
      initialPositions.tabs.x,
      progress,
    )
    : 0;

  // Fade out elements (faster fade)
  const fadeOpacity = Math.max(0, 1 - progress * 1.5);
  const faceDescriptionOpacity = Math.max(0, 1 - progress * 5);

  return (
    <SkeletonProvider loading={isLoading}>
      <header
        ref={headerRef}
        className={`sticky top-0 z-50 overflow-hidden border-b border-neutral-6  ${progress < 1 ? 'bg-transparent' : 'bg-background'}`}
        style={{
          height: headerHeight,
          willChange: 'height',
        }}
      >
        <div className="flex items-center justify-between px-6 pt-3.5 pb-4">
          {/* Left: Logo - fades out */}
          <div
            className="flex items-center gap-2.5"
            style={{
              opacity: fadeOpacity,
              willChange: 'opacity',
              pointerEvents: fadeOpacity < 0.3 ? 'none' : 'auto',
            }}
          >
            <Image src={MainLogo} alt="backpass-logo" className="h-6 w-auto" />
          </div>

          {/* Right: User Actions - stays in place */}
          <div className="flex items-center gap-3 relative z-20">
            {isLoggedIn && user && (
              <div className="flex items-center gap-3 ">
                {/*
                NOT IMPLEMENTING FOR NOW
                <div
                  className={cn(
                    'bg-neutral-alpha-3 rounded-full h-8 px-2 flex items-center gap-2',
                    progress < 1 ? 'text-[#fff]' : 'text-neutral-12',
                  )}
                >
                  <FireIcon />
                  <span className="font-medium text-base">30</span>
                </div> */}
                <Button
                  variant="icon"
                  size="icon"
                  className={cn(
                    'size-8',
                    progress < 1
                      ? 'border-[rgba(238,231,255,0.36))]! text-[#fff]'
                      : 'border-neutral-alpha-8 bg-transparent text-neutral-12',
                  )}
                  onClick={() => {
                    console.log('notification clicked');
                  }}
                >
                  <BellIcon className="size-4" />
                </Button>
              </div>
            )}

            {isSessionPending ? (
              <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
            ) : isLoggedIn && user ? (
              <UserInfoPopover user={user} onLogout={logoutUser} />
            ) : (
              <Button
                onClick={handleOpenLoginModal}
                className={cn(
                  'border h-8 hover:bg-transparent  bg-transparent',
                  progress < 1
                    ? 'border-[rgba(245,241,255,0.72)] !text-[#F6E1BC]'
                    : 'border-neutral-alpha-8 bg-transparent text-neutral-12',
                )}
              >
                Log In
              </Button>
            )}
          </div>
        </div>

        <div className=" w-full flex justify-center px-4">
          <div className="flex justify-between w-full gap-10 max-w-262">
            <div className="flex items-center gap-8">
              {/* Avatar - 142px, animates to 32px top-left */}
              <div
                ref={avatarRef}
                style={{
                  transform: `translate(${avatarTranslateX}px, ${avatarTranslateY}px) scale(${avatarScale})`,
                  transformOrigin: 'top left',
                  willChange: 'transform',
                }}
              >
                <AvatarComponent
                  src={stage?.image as string}
                  username={stage?.name}
                  size="size-35.5"
                  className="shadow-xl"
                />
                <div
                  className={`${progress >= 1 ? 'hidden' : ''}`}
                  style={{
                    width: '234px',
                    height: '234px',
                    aspectRatio: '1/1',

                    position: 'absolute',
                    left: '-46px',
                    bottom: '-50px',

                    borderRadius: '234px',
                    opacity: 0.4,
                    // background: 'lightgray 50% / cover no-repeat',
                    filter: 'blur(14px)',
                  }}
                >
                  Stage Avatar
                </div>
              </div>

              {/* Profile Details */}
              <div className="flex flex-col">
                <div
                  ref={nameRef}
                  style={{
                    transform: `translate(${nameTranslateX}px, ${nameTranslateY}px) scale(${nameScale})`,
                    transformOrigin: 'top left',
                    willChange: 'transform',
                  }}
                >
                  <Text
                    as="h2"
                    className="text-[42px] font-semibold text-neutral-12"
                  >
                    {stage?.name}
                  </Text>
                </div>

                {/* Subtitle - fades out */}
                <div
                  style={{
                    opacity: faceDescriptionOpacity,
                    willChange: 'opacity',
                    pointerEvents:
                      faceDescriptionOpacity < 0.3 ? 'none' : 'auto',
                  }}
                  className="flex flex-col"
                >
                  <Text
                    as="h5"
                    className="text-sm font-medium text-neutral-alpha-12 "
                  >
                    {stage?.owner.name}
                  </Text>

                  {/* Stats Badges - from stage description */}
                  <div className="flex items-center mt-4">
                    <Text className="text-base font-medium text-neutral-12">
                      {stage?.description as unknown as string}
                    </Text>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="flex flex-col items-end gap-5 pt-3"
              style={{
                opacity: fadeOpacity,
                willChange: 'opacity',
                pointerEvents: fadeOpacity < 0.3 ? 'none' : 'auto',
              }}
            >
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
        </div>

        <div
          ref={tabsRef}
          className={cn(
            'flex justify-center w-full absolute z-10 bottom-0 left-0 right-0',
            progress < 1 ? 'pb-1.5' : 'pb-0',
          )}
          style={{
            top: tabsTop,
            transform: `translateX(${tabsTranslateX}px)`,
            willChange: 'top, transform',
          }}
        >
          {/* Inner content container – aligns with page grid */}
          <div
            className={cn(
              'w-full max-w-262 flex justify-start items-center px-4',
            )}
          >
            <Tabs value={activeTab}>
              <TabsList className="justify-start gap-4">
                {tabsToDisplay.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    asChild
                    className={cn(
                      `
                        py-4
                        relative
                        bg-transparent
                        ring-offset-transparent
                        rounded-none
                        shadow-none
                        data-[state=active]:[&>a]:after:absolute
                        data-[state=active]:[&>a]:after:left-0
                        data-[state=active]:[&>a]:after:right-0
                        data-[state=active]:[&>a]:after:bottom-0
                        data-[state=active]:[&>a]:after:h-0.5
                        data-[state=active]:[&>a]:after:bg-accent-9
                        data-[state=active]:[&>a]:after:content-[''] 
                        data-[state=active]:[&>a>svg]:text-accent-9
                        `,
                    )}
                    activeClassName="rounded-none shadow-none border-0 bg-transparent"
                  >
                    <Link
                      href={`/${slug}/${tab.path}`}
                      className="flex items-center gap-2 text-neutral-12"
                    >
                      {activeTab === tab.value ? tab.activeIcon : tab.icon}
                      {tab.label}
                    </Link>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </header>

      {/* Login Modal */}
      <Login open={loginModalOpen} onOpenChange={setLoginModalOpen} />

      {/* Create Stream Modal */}
      <CreateStreamModal
        isOpen={createStreamModalOpen}
        onClose={() => setCreateStreamModalOpen(false)}
        creatorName={stage?.owner?.name ?? 'Creator'}
        creatorAvatar={stage?.owner?.image ?? ''}
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

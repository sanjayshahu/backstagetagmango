'use client';

import { Bell, ChevronDown, LogOut, UserRound } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Separator } from '../ui/separator';
import { cn, getCoverImageUrlFromStage } from '@/lib/utils';
import { AvatarComponent } from '../avatar-component';
import Link from 'next/link';
import { ThemeTabsToggle } from '../theme-toggle';
import { PurchasesIcon } from '../icons/purchases';
import { BlurryImageEffect } from './BlurryImageEffect';
import { useStageAccess } from '@/lib/stage-access-context';

interface User {
  name?: string;
  image?: string | object | null;
  email: string;
}

interface Props {
  user: User;
  onLogout: () => void;
}

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  danger?: boolean;
  onClick?: () => void;
}

interface MenuSection {
  group: string;
  items: MenuItem[];
}

const UserInfoPopover: React.FC<Props> = ({ user, onLogout }) => {

  const menuLink: MenuSection[] = [
    {
      group: 'main',
      items: [
        {
          icon: <UserRound className="size-4 text-black" />,
          label: 'Personal Information',
        },
        {
          icon: <PurchasesIcon className="size-4 text-black" />,
          label: 'My purchases',
        },
        {
          icon: <Bell className="size-4 text-black" />,
          label: 'Notification settings',
        },
      ],
    },
    {
      group: 'logout',
      items: [
        {
          icon: <LogOut className="size-4 text-error-9" />,
          label: 'Logout',
          danger: true,
          onClick: onLogout,
        },
      ],
    },
  ];

  const { stage } = useStageAccess();
  const coverImageUrl = getCoverImageUrlFromStage(stage);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className="
      flex gap-1.5 items-center cursor-pointer
      [&[data-state=open]_svg]:rotate-180
    "
        >
          <AvatarComponent
            src={user.image as string}
            username={user.name}
            size="size-8"
          />
          <ChevronDown
            className={cn(
              'size-4 transition-transform duration-200 text-[#EEEEF0]',
              // progress < 1 ? 'text-[#fff]' : 'text-[#000] dark:text-[#fff]',
            )}
          />
        </div>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="dropdown-shadow relative w-72.5 md:w-83.25 rounded-3xl bg-white px-0 pb-0 pt-2 overflow-hidden border-none"
      >
        <div className="absolute w-full h-45.25 top-0 left-0 -z-1">
          <BlurryImageEffect
            src={coverImageUrl}
            blur={50}
            className="w-full h-full"
            lightGradientColor="#fff"
          />
        </div>
        {/* Header */}
        <div className="p-4 ">
          <div className="flex items-center justify-start gap-3">
            <AvatarComponent
              src={user.image as string}
              username={user.name}
              size="size-8"
            />
            <div className="flex flex-col gap-1">
              <h4 className="text-base font-semibold leading-base text-black">
                {user.name}
              </h4>
              <span className="text-xs font-normal text-neutral-alpha-11">
                {user.email}
              </span>
            </div>
          </div>
          <div className=" mt-6">
            <h6 className="font-normal text-sm text-neutral-alpha-11 mb-2">
              Appearance
            </h6>
            <ThemeTabsToggle />
          </div>
        </div>

        <Separator className="bg-neutral-alpha-3 w-full" />

        {/* Menu */}
        {menuLink.map((section, index) => (
          <div key={section.group}>
            <div className="p-4">
              {section.items.map((menu, i) => (
                <div
                  key={i}
                  className="p-3 cursor-pointer hover:bg-neutral-alpha-3 rounded-2xl"
                  onClick={menu.onClick}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      {menu.icon}

                      <span
                        className={cn(
                          'text-base font-medium',
                          menu.danger ? 'text-error-9' : 'text-neutral-12',
                        )}
                      >
                        {menu.label}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {index !== menuLink.length - 1 && (
              <Separator className="bg-neutral-alpha-3" />
            )}
          </div>
        ))}
        <div className="flex items-center gap-2 px-4 pb-4">
          <Link href="/terms" target='_blank' className="font-light text-xs text-neutral-alpha-11">
            Terms and Conditions
          </Link>
          <span className="text-neutral-alpha-11">•</span>
          <Link href="/privacy" target='_blank' className="font-light text-xs text-neutral-alpha-11">
            Privacy Policy
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserInfoPopover;

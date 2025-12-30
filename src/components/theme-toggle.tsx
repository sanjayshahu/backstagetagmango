import { cn } from '@/lib/utils';
import { Theme, useTheme } from '@/stores/useTheme';

import { Sun } from 'lucide-react';
import * as React from 'react';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { MoonStars } from './icons/moon-stars';

// New Theme Tabs Toggle Component
export const ThemeTabsToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const THEME_TABS = [
    {
      value: 'light',
      label: 'Light',
      Icon: <Sun />,
    },
    {
      value: 'dark',
      label: 'Dark',
      Icon: <MoonStars />,
    },
  ];

  const handleThemeChange = (value: string) => {
    setTheme(value as Theme);
  };

  return (
    <Tabs
      value={theme}
      onValueChange={handleThemeChange}
      className="w-full focus:outline:none"
    >
      <TabsList className="grid h-12 w-full grid-cols-2 gap-2 rounded-full bg-neutral-5 p-1">
        {THEME_TABS.map((item, i) => (
          <TabsTrigger
            key={i}
            value={item.value}
            className={cn(
              'flex h-full items-center justify-center cursor-pointer gap-2 text-sm font-normal text-neutral-alpha-11 [&>span]:w-full [&>span]:h-full p-0 ',
              item.value === 'light'
                ? 'data-[state=active]:text-neutral-12'
                : 'data-[state=active]:[&>span]:text-white',
            )}
            activeClassName={cn(
              'rounded-full',
              item.value === 'light' ? 'bg-neutral-1' : 'bg-neutral-12',
            )}
          >
            {item.Icon}
            <span> {item.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

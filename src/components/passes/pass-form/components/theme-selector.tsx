'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  PASS_THEMES,
  type PassTheme,
  PassImage,
} from '../../utils';

interface ThemeSelectorProps {
  selectedTheme: PassTheme;
  onSelect: (theme: PassTheme) => void;
}

export function ThemeSelector({ selectedTheme, onSelect }: ThemeSelectorProps) {
  return (
    <div className="flex w-full flex-col gap-4">
      {/* Theme Preview Image */}
      <PassImage theme={selectedTheme} className='h-[239px] w-full overflow-hidden rounded-3xl' />

      {/* Theme Selector Thumbnails */}
      <div className="flex w-full items-center justify-between">
        {PASS_THEMES.map((theme) => {
          const isSelected = theme === selectedTheme;
          return (
            <Button
              key={theme}
              type="button"
              onClick={() => onSelect(theme)}
              className={cn(
                'relative h-10 w-[72px] overflow-hidden rounded-lg transition-all',
                isSelected
                  ? 'ring-1 ring-neutral-alpha-11 ring-offset-2 ring-offset-black/20'
                  : 'opacity-80 hover:opacity-100'
              )}
            >
              <PassImage
                theme={theme}
                className={`absolute inset-0`} />
            </Button>
          );
        })}
      </div>
    </div>
  );
}

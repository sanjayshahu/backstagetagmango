'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Text, type TextElement } from './text';

export interface ExpandableTextProps {
  content: string;
  maxLines?: number;
  className?: string;
  textClassName?: string;
  showLessButton?: boolean;
  as?: TextElement;
}

function ExpandableText({
  content,
  maxLines = 3,
  className,
  textClassName,
  showLessButton = false,
  as = 'p',
}: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [needsTruncation, setNeedsTruncation] = React.useState(false);
  const textRef = React.useRef<HTMLElement>(null);

  React.useLayoutEffect(() => {
    if (textRef.current) {
      const element = textRef.current;
      // Temporarily remove line-clamp to measure full height
      element.style.webkitLineClamp = 'unset';
      element.style.display = 'block';
      const fullHeight = element.scrollHeight;

      // Apply line-clamp to measure clamped height
      element.style.webkitLineClamp = String(maxLines);
      element.style.display = '-webkit-box';
      const clampedHeight = element.clientHeight;

      setNeedsTruncation(fullHeight > clampedHeight);
    }
  }, [content, maxLines]);

  // Show button logic:
  // - When collapsed and needs truncation: show "Show more"
  // - When expanded and showLessButton is true: show "Show less"
  const showButton = needsTruncation && (!isExpanded || showLessButton);

  return (
    <div className={className}>
      <Text
        as={as}
        ref={textRef}
        className={cn(
          'text-sm leading-5 whitespace-pre-wrap wrap-break-word',
          textClassName
        )}
        style={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: isExpanded ? 'unset' : maxLines,
          overflow: isExpanded ? 'visible' : 'hidden',
        }}
      >
        {content}
      </Text>
      {showButton && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs font-medium text-neutral-alpha-11 hover:text-neutral-12 mt-1 cursor-pointer"
        >
          {isExpanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  );
}

export { ExpandableText };

import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: ReactNode;
    className?: string;
  };
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          {icon}
        </div>
        <Text as="h2" className="text-xl font-semibold text-neutral-12">
          {title}
        </Text>
        <Text className="text-sm text-muted-foreground max-w-md">
          {description}
        </Text>
        {action && (
          <Button onClick={action.onClick} className={action.className ?? 'mt-4'}>
            {action.icon}
            {action.label}
          </Button>
        )}
      </div>
    </div>
  );
}

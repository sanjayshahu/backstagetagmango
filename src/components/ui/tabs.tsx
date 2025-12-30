import * as TabsPrimitive from '@radix-ui/react-tabs';
import { motion } from 'framer-motion';
import * as React from 'react';

import { cn } from '@/lib/utils';

const TabsContext = React.createContext<{
  activeTab?: string;
  setActiveTab: (value: string) => void;
  layoutId: string;
}>({
  setActiveTab: () => {},
  layoutId: 'tabs',
});

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ value, onValueChange, defaultValue, ...props }, ref) => {
  const [internalValue, setInternalValue] = React.useState(
    value || defaultValue,
  );
  const uniqueId = React.useId();
  const layoutId = `tabs-${uniqueId}`;

  const handleValueChange = (newValue: string) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  React.useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  return (
    <TabsContext.Provider
      value={{
        activeTab: value ?? internalValue,
        setActiveTab: handleValueChange,
        layoutId,
      }}
    >
      <TabsPrimitive.Root
        ref={ref}
        value={value}
        defaultValue={defaultValue}
        onValueChange={handleValueChange}
        {...props}
      />
    </TabsContext.Provider>
  );
});
Tabs.displayName = TabsPrimitive.Root.displayName;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    activeClassName?: string;
  }
>(({ className, children, value, activeClassName, ...props }, ref) => {
  const { activeTab, layoutId } = React.useContext(TabsContext);
  const isActive = activeTab === value;

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      value={value}
      className={cn(
        'relative inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground focus:',
        className,
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2 justify-center ">
        {isActive && (
          <motion.div
            layoutId={layoutId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn(
              'absolute inset-0 rounded-sm bg-background shadow-sm -z-1',
              activeClassName,
            )}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
        )}

        {children}
      </span>
    </TabsPrimitive.Trigger>
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };

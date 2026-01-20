## UI Development Plan – BackstagePass

### Component Structure
- Reuse existing FeedPostCard component.
- Create a PageWrapper component to hold header + content.
- Create SubscriberPostCard with confetti header.
- Create Sidebar component with active day indicator.

### UI Approach
- Break UI into reusable components.
- Use Tailwind utility classes for spacing, colors, responsiveness.
- Keep layout flexible using CSS Grid and Flexbox.

### Responsiveness
- Desktop: Sidebar + main content layout.
- Mobile: Sidebar collapses or stacks above content.
- Use Tailwind breakpoints (sm, md, lg).

### Light & Dark Mode
- Use existing theme system.
- Use semantic colors (bg-background, text-foreground).
- Avoid hardcoded colors unless design demands it.

### Focus
- Pixel accuracy from Figma
- Smooth hover states and transitions
- Clean spacing and alignment



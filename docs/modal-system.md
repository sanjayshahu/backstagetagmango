# Modal System Documentation

## Overview

The modal system uses a **stack-based approach** where multiple modals can be open simultaneously, but only the topmost modal is visible. This enables nested modals (e.g., opening a sub-modal from within a parent modal) while maintaining clean state management.

## Architecture

### Modal Stack Context

Located at: `apps/web/src/lib/modal-tracking-context.tsx`

The context maintains a stack (array) of modal IDs. When a modal opens, it registers itself and receives a unique ID. When it closes, it's removed from the stack along with any modals that were opened after it (cascade close).

```typescript
interface ModalTrackingContextValue {
  isModalOpen: boolean;           // true if any modal in stack
  topModalId: string | null;      // ID of the topmost modal
  registerModal: () => string;    // Returns unique modal ID
  unregisterModal: (id: string) => void;
}
```

### Stack Behavior

1. **LIFO (Last In, First Out)**: The most recently opened modal is always on top
2. **Cascade Close**: Closing a modal removes it AND all modals opened after it
3. **Visibility**: Only the top modal (`topModalId`) is visible; others are hidden with `display: none`
4. **State Preservation**: Hidden modals keep their content mounted to preserve form state

## Modal Component

Located at: `apps/web/src/components/modal/index.tsx`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | required | Controls whether the modal is open |
| `onOpenChange` | `(open: boolean) => void` | required | Called when modal should open/close |
| `title` | `string` | - | Modal header title |
| `subtitle` | `string` | - | Modal header subtitle |
| `showCloseButton` | `boolean` | `true` | Show/hide the close button |
| `footer` | `ReactNode` | - | Footer content (separated by border) |
| `className` | `string` | - | Additional classes for dialog/drawer content |
| `wrapperClassName` | `string` | - | Additional classes for content wrapper |
| `fullDrawer` | `boolean` | `false` | Full-height drawer on mobile |
| `alwaysVisible` | `boolean` | `false` | Override stack visibility (always show) |
| `onBack` | `() => void` | - | Back button handler (mobile drawer only) |

### `alwaysVisible` Prop

Use `alwaysVisible={true}` when you need a modal to remain visible even when another modal opens on top. This is useful for:

- Confirmation dialogs that should stay visible
- Progress indicators that shouldn't be hidden
- Special overlay requirements

```tsx
<Modal open={isOpen} onOpenChange={setIsOpen} alwaysVisible>
  <p>This modal stays visible when sub-modals open</p>
</Modal>
```

## Best Practice: Modal Wrapper Inside Component

**Always keep the `<Modal>` wrapper inside the modal component itself, not in the parent component.**

### Why?

1. **Encapsulation**: The modal component owns its presentation logic
2. **Reusability**: Component can be used anywhere without parent needing to know about Modal
3. **Consistency**: Styling and behavior are controlled in one place
4. **Avoid double-wrapping**: Parent wrapping + internal wrapping causes issues

### Correct Pattern

```tsx
// CreatePostModal.tsx - Modal wrapper INSIDE the component
export function CreatePostModal({ isOpen, onClose, ...props }) {
  return (
    <Modal open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <div className="...">
        {/* Modal content */}
      </div>
    </Modal>
  );
}

// Page.tsx - Parent just renders the component
function Page() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Create Post</button>
      <CreatePostModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}
```

### Incorrect Pattern

```tsx
// DON'T DO THIS - wrapping in parent causes double Modal
function Page() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Create Post</button>
      <Modal open={showModal} onOpenChange={setShowModal}>
        <CreatePostModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      </Modal>
    </>
  );
}
```

## Usage Examples

### Single Modal

```tsx
function MyComponent() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Open Modal</button>

      <Modal
        open={showModal}
        onOpenChange={setShowModal}
        title="My Modal"
      >
        <p>Modal content here</p>
      </Modal>
    </>
  );
}
```

### Nested Modals (Parent + Sub-modal)

```tsx
function FeatureWithSubModal() {
  const [showParent, setShowParent] = useState(false);
  const [showChild, setShowChild] = useState(false);

  return (
    <>
      <button onClick={() => setShowParent(true)}>Open Feature</button>

      {/* Parent Modal */}
      <Modal
        open={showParent}
        onOpenChange={setShowParent}
        title="Main Feature"
      >
        <p>Main content</p>
        <button onClick={() => setShowChild(true)}>
          Open Sub-modal
        </button>
      </Modal>

      {/* Child Modal - opens on top of parent */}
      <Modal
        open={showChild}
        onOpenChange={setShowChild}
        title="Sub Feature"
      >
        <p>Sub-modal content</p>
        <button onClick={() => setShowChild(false)}>Done</button>
      </Modal>
    </>
  );
}
```

**Stack behavior:**
1. User opens parent modal -> Stack: `[parent-id]` -> Parent visible
2. User opens child modal -> Stack: `[parent-id, child-id]` -> Child visible, parent hidden
3. User closes child modal -> Stack: `[parent-id]` -> Parent visible again
4. User closes parent modal -> Stack: `[]` -> All closed

### Using `isModalOpen` for Side Effects

```tsx
function ProfileLayout() {
  const { isModalOpen } = useModalTracking();

  // Disable animations when any modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [isModalOpen]);

  return <div>...</div>;
}
```

## ID Generation

Modal IDs are generated using timestamp + random string:

```typescript
const id = `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
// Example: "1703847123456_a1b2c3d"
```

This ensures uniqueness without requiring crypto APIs.

## Migration from Previous System

The previous system used:
- `modalType` union type to identify modals
- `activeModal`, `openModal()`, `closeModal()`, `isModalActive()` API
- Only one modal could be active at a time

**Old pattern:**
```tsx
// OLD - Don't use
const { activeModal, openModal, closeModal } = useModalTracking();
const showSchedule = activeModal === 'schedulePost';

// Open sub-modal
openModal('schedulePost');
// Close sub-modal
closeModal();
```

**New pattern:**
```tsx
// NEW - Use this
const [showSchedule, setShowSchedule] = useState(false);

// Open sub-modal
setShowSchedule(true);
// Close sub-modal
setShowSchedule(false);

// Wrap in Modal component
<Modal open={showSchedule} onOpenChange={setShowSchedule}>
  <ScheduleContent />
</Modal>
```

## Responsive Behavior

The Modal component automatically switches between:
- **Desktop**: Uses `Dialog` from shadcn/ui (centered overlay)
- **Mobile**: Uses `Drawer` from shadcn/ui (bottom sheet)

The `useIsMobile()` hook determines which variant to render.

## Files Reference

| File | Description |
|------|-------------|
| `lib/modal-tracking-context.tsx` | Stack-based modal tracking context |
| `components/modal/index.tsx` | Modal wrapper component |
| `components/feed/create-post-modal.tsx` | Example: Parent modal with sub-modals |
| `components/feed/schedule-post-modal.tsx` | Example: Sub-modal wrapped in Modal |
| `components/feed/visibility-selector.tsx` | Example: Sub-modal wrapped in Modal |
| `components/feed/edit-media-modal.tsx` | Example: Modal with drag-and-drop |
| `components/streams/modal/create-stream-modal.tsx` | Example: Full-featured modal |

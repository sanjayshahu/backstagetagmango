/**
 * Base props that modal content components can implement.
 * These are passed by the parent component when rendering inside a Modal.
 */
export interface BaseModalProps {
  isOpen: boolean;
  onClose: (result?: unknown) => void;
}

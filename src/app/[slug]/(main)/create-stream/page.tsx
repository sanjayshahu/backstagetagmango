'use client';

// ============================================
// Third-party Imports
// ============================================
import { useEffect, useState } from 'react';

// ============================================
// Local/Project Imports
// ============================================
import { useStagePasses } from '@/hooks';
import { useStageAccess } from '@/lib/stage-access-context';
import { CreateStreamModal } from '@/components/streams/modal/create-stream-modal';
import { CreateActionDrawer } from '@/components/create-action-drawer';
import { Button } from '@/components/ui/button';

// ============================================
// Constants
// ============================================
const MOBILE_BREAKPOINT = 768;

// ============================================
// Component
// ============================================
export default function CreateStreamPage() {
  // Mobile detection state
  const [isMobile, setIsMobile] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Check on mount
    checkMobile();

    // Listen for resize
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Get stage details from context
  const { stage, isLoading: isStageLoading } = useStageAccess();

  // Fetch passes using stage ID
  const stageId = stage?.id ?? '';
  const { isLoading: isPassesLoading } = useStagePasses(
    { stageId, visibility: 'all' },
    { enabled: !!stageId },
  );

  const isLoading = isStageLoading || isPassesLoading;

  /* ========================================
     Effect: Open modal/drawer when data is ready
     ======================================== */
  useEffect(() => {
    if (isLoading || !stage || hasOpened) return;

    if (isMobile) {
      // Open drawer on mobile
      setDrawerOpen(true);
    } else {
      // Open modal on desktop
      setModalOpen(true);
    }

    setHasOpened(true);
  }, [isLoading, stage, isMobile, hasOpened]);

  /* ========================================
     Handler: Re-open modal/drawer
     ======================================== */
  const handleOpen = () => {
    if (!stage) return;

    if (isMobile) {
      setDrawerOpen(true);
    } else {
      setModalOpen(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <>
      {/* Mobile drawer - rendered but controlled */}
      <CreateActionDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />

      {/* Desktop modal */}
      <CreateStreamModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        creatorName={stage?.owner?.name ?? 'Creator'}
        creatorAvatar={stage.owner.image || ''}
        onStreamCreated={(data) => {
          console.log('Stream created:', data);
        }}
        stageId={stage?.id ?? ''}
      />

      <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Create Stream
          </h1>
          <p className="text-gray-600 mb-6">
            The Create Stream {isMobile ? 'drawer' : 'modal'} should open
            automatically.
          </p>
          <Button
            onClick={handleOpen}
            className="px-6 py-3 bg-[#C9A227] hover:bg-[#B8921F] text-white rounded-full font-medium transition-colors shadow-md"
          >
            Open {isMobile ? 'Drawer' : 'Modal'} Again
          </Button>
        </div>
      </div>
    </>
  );
}

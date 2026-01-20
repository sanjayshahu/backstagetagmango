'use client';

import GradientBorderCard from '@/components/backstagepass/layout/GradientBorderCard';
import PageWrapper from '@/components/backstagepass/layout/PageWrapper';
import Sidebar from '@/components/backstagepass/layout/SideBar';
import { PostCard } from '@/components/feed/post-card';
import { PassDrawer } from '@/components/pass-drawer';
import { mockPostCard } from '@/lib/mocks/post-card.mock';
import { useState } from 'react';

export default function Page() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedPasses, setSelectedPasses] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  const passes = [
    { id: '1', name: 'VIP Pass', price: { usdCents: 100 } },
    { id: '2', name: 'Regular Pass', price: { usdCents: 50 } },
    { id: '3', name: 'Ground Pass', isGroundPass: true },
  ];

  const themeClasses = darkMode
    ? 'bg-black text-white'
    : 'bg-white text-black';

  return (
    <div
      className={`
        ${themeClasses}
        min-h-screen
        transition-colors duration-300
      `}
    >
      <GradientBorderCard />

      <PageWrapper
        title="Subscriber Feed"
        description="Exclusive posts for subscribers"
        sidebar={<Sidebar darkMode={darkMode} />}
        darkMode={darkMode}
      >
        {/* MAIN CONTENT WRAPPER */}
        <div
          className="
            mx-auto
            w-full
            max-w-3xl
            px-4 sm:px-6 lg:px-0
            space-y-6
          "
        >
          <PostCard
            {...mockPostCard}
            postId="post-2"
            content="Behind the scenes: how we design and build features."
            isPinned
            pinnedAt={new Date().toISOString()}
            darkMode={darkMode}
          />
        </div>

        {/* ACTION BUTTONS */}
        <div
          className="
            mt-8
            px-4 sm:px-6
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:items-center
          "
        >
          <button
            className="
              w-full sm:w-auto
              px-4 py-2
              bg-blue-600
              text-white
              rounded-lg
              transition
              hover:bg-blue-700
            "
            onClick={() => setDrawerOpen(true)}
          >
            Open Pass Drawer
          </button>

          <button
            className="
              w-full sm:w-auto
              px-4 py-2
              bg-gray-800
              text-white
              rounded-lg
              transition
              hover:bg-gray-700
            "
            onClick={() => setDarkMode(!darkMode)}
          >
            Toggle Dark Mode
          </button>
        </div>

        <PassDrawer
          availablePasses={passes}
          selectedPassIds={selectedPasses}
          onSelectionChange={setSelectedPasses}
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          darkMode={darkMode}
        />
      </PageWrapper>
    </div>
  );
}

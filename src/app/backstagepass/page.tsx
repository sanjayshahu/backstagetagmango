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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPasses, setSelectedPasses] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  const passes = [
    { id: '1', name: 'VIP Pass', price: { usdCents: 100 } },
    { id: '2', name: 'Regular Pass', price: { usdCents: 50 } },
    { id: '3', name: 'Ground Pass', isGroundPass: true },
  ];

  const themeClasses = darkMode ? 'bg-black text-white' : 'bg-white text-black';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses}`}>
      <GradientBorderCard />

      {/* Mobile Hamburger Button */}
      <div className="sm:hidden px-4 py-2">
        <button
          className="px-3 py-2 bg-gray-800 text-white rounded-lg"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>
      </div>

      {/* PageWrapper now receives sidebar prop only */}
      <PageWrapper
        title="Subscriber Feed"
        description="Exclusive posts for subscribers"
        sidebar={<Sidebar darkMode={darkMode} />}
        darkMode={darkMode}
      >
        {/* Mobile Sidebar Drawer */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex">
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setSidebarOpen(false)}
            />
            {/* Sidebar Panel */}
            <div className="relative w-64 bg-white dark:bg-black p-4 transition-transform duration-300">
              <Sidebar darkMode={darkMode} />
              <button
                className="mt-4 px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg"
                onClick={() => setSidebarOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* MAIN CONTENT */}
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-0 space-y-6">
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
        <div className="mt-8 px-4 sm:px-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <button
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg transition hover:bg-blue-700"
            onClick={() => setDrawerOpen(true)}
          >
            Open Pass Drawer
          </button>

          <button
            className="w-full sm:w-auto px-4 py-2 bg-gray-800 text-white rounded-lg transition hover:bg-gray-700"
            onClick={() => setDarkMode(!darkMode)}
          >
            Toggle Dark Mode
          </button>
        </div>

        {/* Pass Drawer */}
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

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

  // Conditional Tailwind classes for dark mode
  const themeClasses = darkMode ? 'bg-black text-white' : 'bg-white text-black';

  return (
    <div className={`${themeClasses} min-h-screen transition-colors duration-300`}>
      <GradientBorderCard/>
      <PageWrapper
        title="Subscriber Feed"
        description="Exclusive posts for subscribers"
        sidebar={<Sidebar darkMode={darkMode} />}
        darkMode={darkMode} // pass dark mode to PageWrapper
      >
        <div className="space-y-6">
          {/* <PostCard {...mockPostCard} darkMode={darkMode} /> */}

          <PostCard
            {...mockPostCard}
            postId="post-2"
            content="Behind the scenes: how we design and build features."
            isPinned
            pinnedAt={new Date().toISOString()}
            darkMode={darkMode}
          />
        </div>

        <div className="p-6 space-x-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            onClick={() => setDrawerOpen(true)}
          >
            Open Pass Drawer
          </button>

          <button
            className="px-4 py-2 bg-gray-800 text-white rounded-lg"
            onClick={() => setDarkMode(!darkMode)}
          >
            Toggle Dark Mode
          </button>
        </div>

        <PassDrawer
          availablePasses={passes}
          selectedPassIds={selectedPasses}
          onSelectionChange={(ids) => setSelectedPasses(ids)}
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          darkMode={darkMode} // pass dark mode to drawer
        />
      </PageWrapper>
    </div>
  );
}

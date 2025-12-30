'use client'; // This directive makes the component a Client Component

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
    const pathname = usePathname();

    useEffect(() => {
        // Scroll to the top of the window
        window.scrollTo(0, 0);
    }, [pathname]); // This runs every time the pathname changes (new page navigation)

    return null; // This component doesn't render anything, it just handles the side effect
}
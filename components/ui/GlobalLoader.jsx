'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import PageLoader from '@/components/ui/PageLoader';

export default function GlobalLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Trigger loading on route change
    setLoading(true);

    // Minimum loading time to ensure animation is seen
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5 seconds

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  if (!loading) return null;

  return <PageLoader />;
}

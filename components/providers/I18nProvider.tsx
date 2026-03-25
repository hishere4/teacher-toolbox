"use client";

import { useEffect, useState } from "react";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Dynamically import i18n config on client side only
    import("@/i18n/config").then(() => {
      setMounted(true);
    });
  }, []);

  // Show nothing or loading state until i18n is ready
  if (!mounted) {
    return <>{children}</>;
  }

  return <>{children}</>;
}

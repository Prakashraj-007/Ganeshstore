"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isBusinessAuth") === "true";
    
    if (!isAuthenticated && pathname !== "/portal/login") {
      router.push("/portal/login");
    } else if (isAuthenticated && pathname === "/portal/login") {
      router.push("/portal");
    } else {
      setIsChecking(false);
    }
  }, [pathname, router]);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-primary-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    );
  }

  return <>{children}</>;
}

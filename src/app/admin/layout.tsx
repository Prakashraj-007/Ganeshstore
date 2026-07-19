"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAdminAuth") === "true";
    
    if (!isAuthenticated && pathname !== "/admin/login") {
      router.push("/admin/login");
    } else if (isAuthenticated && pathname === "/admin/login") {
      router.push("/admin");
    } else {
      setIsChecking(false);
    }
  }, [pathname, router]);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return <div className="min-h-screen bg-neutral-950 text-neutral-100">{children}</div>;
}

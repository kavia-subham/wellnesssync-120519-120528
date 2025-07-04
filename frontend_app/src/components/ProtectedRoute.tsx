"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";
import { getSupabaseClient } from "@/lib/supabaseClient";

// PUBLIC_INTERFACE
export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const supabase = getSupabaseClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      // If not authenticated, redirect to login
      setIsAuth(!!session);
      if (!session) router.replace("/login");
    });
  }, [router]);

  if (isAuth === null) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!isAuth) {
    return null; // Redirecting
  }

  return <>{children}</>;
}

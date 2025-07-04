"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabaseClient";

// PUBLIC_INTERFACE
interface SupabaseUser {
  email: string;
  user_metadata?: { full_name?: string };
  id: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const supabase = getSupabaseClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user as SupabaseUser);
      }
    };
    fetchSession();
  }, []);

  return (
    <ProtectedRoute>
      <div className="flex flex-col gap-8">
        <h1 className="text-2xl font-bold mb-1">
          Welcome, <span className="text-[#1976d2]">{user?.user_metadata?.full_name ?? "User"}</span>
        </h1>
        <div className="grid sm:grid-cols-2 gap-8">
          <section className="bg-white dark:bg-[#181a1b] rounded shadow p-6 flex flex-col gap-4">
            <h2 className="font-semibold text-lg">🧑‍⚕️ Personalized Recommendations</h2>
            <ul className="text-sm list-disc ml-5">
              <li>Today: Drink at least 2L water</li>
              <li>Walk 8,000 steps minimum</li>
              <li>Add 15 minutes meditation</li>
            </ul>
          </section>
          <section className="bg-white dark:bg-[#181a1b] rounded shadow p-6 flex flex-col gap-4">
            <h2 className="font-semibold text-lg">Routine & Diet Tracker</h2>
            <div className="text-sm">Manual input & tracker integrations go here.</div>
            <a className="text-[#1976d2] hover:underline" href="/data-entry">Add Data</a>
          </section>
        </div>
        <section className="mt-4">
          <h2 className="font-semibold mb-2">Health Progress Overview</h2>
          <div className="bg-[#f9fafb] dark:bg-[#2b2b2b] rounded shadow p-4">
            <p className="text-[#1976d2]">Your analytics and progress charts coming soon!</p>
          </div>
        </section>
      </div>
    </ProtectedRoute>
  );
}

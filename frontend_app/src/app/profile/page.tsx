"use client";
import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabaseClient";
import ProtectedRoute from "@/components/ProtectedRoute";

interface ProfileInfo {
  email: string;
  name: string;
  id: string;
}

// PUBLIC_INTERFACE
export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const supabase = getSupabaseClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }
      setProfile({
        email: user.email as string,
        name: user.user_metadata?.full_name ?? "",
        id: user.id as string
      });
      setLoading(false);
    };
    fetchProfile();
  }, []);

  if (loading) {
    return <ProtectedRoute><div>Loading...</div></ProtectedRoute>;
  }

  return (
    <ProtectedRoute>
      <div className="max-w-lg">
        <h2 className="text-2xl font-bold mb-4">My Profile</h2>
        <div className="bg-white dark:bg-[#171717] rounded p-6 shadow flex flex-col gap-2">
          <div><span className="font-semibold">Email:</span> {profile?.email}</div>
          <div><span className="font-semibold">Name:</span> {profile?.name}</div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

// PUBLIC_INTERFACE
export default function LoginPage() {
  interface LoginInputForm {
    email: string;
    password: string;
  }
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInputForm>();
  const [errorMsg, setErrorMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: LoginInputForm) => {
    setErrorMsg("");
    setSubmitting(true);
    const supabase = getSupabaseClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password
    });
    setSubmitting(false);
    if (error) {
      setErrorMsg(error.message);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 bg-white dark:bg-[#171717] p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-[#1976d2]">Login to WellnessSync</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <label className="flex flex-col">
          Email
          <input
            className="border rounded p-2 mt-1 bg-inherit"
            type="email"
            {...register("email", { required: true })}
            autoComplete="email"
          />
          {errors.email && <span className="text-red-600 text-xs">Email is required</span>}
        </label>
        <label className="flex flex-col">
          Password
          <input
            className="border rounded p-2 mt-1 bg-inherit"
            type="password"
            {...register("password", { required: true })}
            autoComplete="current-password"
          />
          {errors.password && <span className="text-red-600 text-xs">Password required</span>}
        </label>
        {errorMsg && <div className="text-red-700">{errorMsg}</div>}
        <button type="submit" className="bg-[#1976d2] text-white px-4 py-2 rounded h-11 hover:bg-[#115293]" disabled={submitting}>
          {submitting ? "Authenticating..." : "Login"}
        </button>
        <div className="text-sm mt-2">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-[#1976d2] hover:underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}

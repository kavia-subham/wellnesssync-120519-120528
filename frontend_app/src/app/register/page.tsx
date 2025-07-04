"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { getSupabaseClient } from "@/lib/supabaseClient";
import Link from "next/link";

// PUBLIC_INTERFACE
export default function RegisterPage() {
  interface RegisterInputForm {
    email: string;
    password: string;
    fullName: string;
  }
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInputForm>();
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: RegisterInputForm) => {
    setSubmitting(true);
    setErrorMsg("");
    setSuccess(false);
    const supabase = getSupabaseClient();
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: { data: { full_name: data.fullName } }
    });
    setSubmitting(false);
    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccess(true);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 bg-white dark:bg-[#171717] p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-[#1976d2]">Create an Account</h2>
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
          Full Name
          <input
            className="border rounded p-2 mt-1 bg-inherit"
            type="text"
            {...register("fullName", { required: true })}
            autoComplete="name"
          />
          {errors.fullName && <span className="text-red-600 text-xs">Full name required</span>}
        </label>
        <label className="flex flex-col">
          Password
          <input
            className="border rounded p-2 mt-1 bg-inherit"
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            autoComplete="new-password"
          />
          {errors.password && <span className="text-red-600 text-xs">Min 6 character password</span>}
        </label>
        {errorMsg && <div className="text-red-700">{errorMsg}</div>}
        {success && <div className="text-green-700">Registration successful. Please check your email to confirm!</div>}
        <button type="submit" className="bg-[#1976d2] text-white px-4 py-2 rounded h-11 hover:bg-[#115293]" disabled={submitting}>
          {submitting ? "Registering..." : "Register"}
        </button>
        <div className="text-sm mt-2">
          Already have an account?{" "}
          <Link href="/login" className="text-[#1976d2] hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

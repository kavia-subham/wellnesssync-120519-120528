"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

interface HealthInputForm {
  steps?: number;
  sleep?: number;
  calories?: number;
  notes?: string;
}

// PUBLIC_INTERFACE
export default function DataEntryPage() {
  const { register, handleSubmit, reset } = useForm<HealthInputForm>();
  const [confirmMsg, setConfirmMsg] = useState("");
  const onSubmit: SubmitHandler<HealthInputForm> = async () => {
    setConfirmMsg("Data submitted ✔");
    reset();
  };

  return (
    <ProtectedRoute>
      <div className="max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Manual Health Data Input</h2>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-4">
            <label className="flex-1">
              Steps
              <input
                className="border rounded p-2 w-full mt-1 bg-inherit"
                type="number"
                min={0}
                {...register("steps")}
                placeholder="e.g. 8500"
              />
            </label>
            <label className="flex-1">
              Sleep (hr)
              <input
                className="border rounded p-2 w-full mt-1 bg-inherit"
                type="number"
                step={0.1}
                min={0}
                {...register("sleep")}
                placeholder="7.5"
              />
            </label>
          </div>
          <label>
            Calories Intake
            <input
              className="border rounded p-2 w-full mt-1 bg-inherit"
              type="number"
              min={0}
              {...register("calories")}
              placeholder="e.g. 2100"
            />
          </label>
          <label>
            Notes
            <textarea
              className="border rounded p-2 w-full mt-1 bg-inherit"
              {...register("notes")}
              placeholder="Any remarks..."
            />
          </label>
          <button className="bg-[#1976d2] text-white px-4 py-2 rounded hover:bg-[#115293] w-32 mt-1" type="submit">
            Submit
          </button>
          {confirmMsg && <div className="text-green-600 text-sm">{confirmMsg}</div>}
        </form>
        <div className="mt-8 text-center text-[#1976d2]">
          (Fitness Tracker Integration Coming Soon)
        </div>
      </div>
    </ProtectedRoute>
  );
}

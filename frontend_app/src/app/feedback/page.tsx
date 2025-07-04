"use client";
import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useForm, SubmitHandler } from "react-hook-form";

interface FeedbackForm {
  feedback: string;
}

// PUBLIC_INTERFACE
export default function FeedbackPage() {
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, reset } = useForm<FeedbackForm>();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit: SubmitHandler<FeedbackForm> = async () => {
    setSubmitted(true);
    reset();
    setTimeout(() => {
      setShowModal(false);
      setSubmitted(false);
    }, 1500);
  };

  return (
    <ProtectedRoute>
      <div>
        <h2 className="text-2xl font-bold mb-4">We value your feedback</h2>
        <button
          className="bg-[#1976d2] text-white px-4 py-2 rounded shadow hover:bg-[#115293]"
          onClick={() => setShowModal(true)}
        >
          Leave Feedback
        </button>
        {/* Modal */}
        {showModal && (
          <div className="fixed top-0 left-0 w-screen h-screen bg-black/30 z-40 flex items-center justify-center">
            <div className="bg-white dark:bg-[#181a1b] p-8 rounded shadow-xl w-[90vw] max-w-lg z-50">
              <button className="float-right text-2xl text-[#1976d2]" onClick={() => setShowModal(false)}>×</button>
              <h3 className="text-lg font-semibold mb-3">Submit Feedback</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <textarea
                  className="border rounded p-2 w-full min-h-[80px] bg-inherit"
                  {...register("feedback", { required: true })}
                  placeholder="Share your experience or suggestions..."
                  required
                />
                <button className="bg-[#1976d2] text-white py-2 rounded hover:bg-[#115293]" type="submit">
                  Submit
                </button>
                {submitted && <div className="text-green-700">Thank you for your feedback!</div>}
              </form>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}

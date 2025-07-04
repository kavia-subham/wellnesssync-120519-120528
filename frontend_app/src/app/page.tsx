export default function Home() {
  return (
    <div className="flex flex-col max-w-xl mx-auto mt-36 items-center gap-10 text-center">
      <h1 className="text-4xl font-bold text-[#1976d2]">Welcome to WellnessSync</h1>
      <p className="text-lg text-muted-foreground">
        An AI-powered wellness platform for tailored health insights.<br />
        Register or log in to begin tracking your wellness, visualize progress, and get personalized recommendations.
      </p>
      <div className="flex gap-4">
        <a
          href="/register"
          className="bg-[#1976d2] hover:bg-[#115293] text-white px-6 py-2 rounded shadow transition"
        >Register</a>
        <a
          href="/login"
          className="border border-[#1976d2] text-[#1976d2] hover:bg-[#f8fdff] px-6 py-2 rounded shadow transition"
        >Login</a>
      </div>
    </div>
  );
}

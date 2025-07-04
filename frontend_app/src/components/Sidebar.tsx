import Link from "next/link";
import { ReactNode } from "react";

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/profile", label: "Profile" },
  { href: "/data-entry", label: "Data Input" },
  { href: "/analytics", label: "Analytics" },
  { href: "/feedback", label: "Feedback" }
];

// PUBLIC_INTERFACE
export default function Sidebar({ children }: { children: ReactNode }) {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  return (
    <div className="flex h-screen">
      <aside className="bg-[#f3f4f6] dark:bg-[#171717] text-[#171717] dark:text-[#ededed] w-56 flex flex-col p-5 shadow-lg">
        <div className="font-bold text-xl mb-6 tracking-wider">WellnessSync</div>
        <nav className="flex flex-col gap-3 flex-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} passHref legacyBehavior>
              <a className={`rounded px-3 py-2 transition-colors font-medium ${
                pathname?.startsWith(link.href)
                  ? "bg-[#1976d2] text-white"
                  : "hover:bg-[#d1e9ff] dark:hover:bg-[#222] hover:text-[#1976d2]"
              }`}>
                {link.label}
              </a>
            </Link>
          ))}
          <div className="flex-1" />
        </nav>
      </aside>
      <main className="flex-1 overflow-auto bg-white dark:bg-[#101012] p-8">{children}</main>
    </div>
  );
}

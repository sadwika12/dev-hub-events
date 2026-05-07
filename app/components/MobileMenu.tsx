"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";

type User = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export default function MobileMenu({ user }: { user?: User | null }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/auth/signin" });
  };

  return (
    <>
      {/* Hamburger Button - High Z-Index to stay on top */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col gap-1.5 p-2 rounded-xl hover:bg-white/10 transition-all z-[100] relative cursor-pointer active:scale-90"
        aria-label="Menu"
      >
        <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
        <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* Full Screen Overlay Container */}
      {isOpen && (
        <div className="fixed inset-0 z-[90] flex justify-end items-start p-4 pt-24 sm:p-10 sm:pt-24">
          
          {/* Backdrop - This now sits BEHIND the menu using z-0 */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-default"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu Panel - Higher Z-Index ensures clicks hit the links */}
          <div className="relative w-[280px] bg-zinc-900 border border-white/20 rounded-3xl shadow-2xl overflow-hidden ring-1 ring-white/10 animate-in zoom-in-95 duration-200 z-10">
            
            {/* User Section */}
            {user && (
              <div className="flex items-center gap-3 p-5 border-b border-white/10 bg-white/5">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User"}
                    width={40}
                    height={40}
                    className="rounded-full border border-white/30"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-600/30 border border-blue-500/50 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-white text-sm font-semibold truncate max-w-[160px]">
                    {user.name}
                  </span>
                  <span className="text-white/60 text-[11px] truncate max-w-[160px]">
                    {user.email}
                  </span>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <nav className="py-2 flex flex-col">
              {[
                { label: "Home", href: "/", icon: "🏠" },
                { label: "All Events", href: "/events", icon: "🎪" },
                { label: "Create Event", href: "/events/create", icon: "➕" },
                { label: "My Events", href: "/events/my-events", icon: "📋" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 px-6 py-4 text-white hover:bg-white/10 transition-all cursor-pointer group pointer-events-auto"
                >
                  <span className="text-lg group-hover:scale-110 transition-transform pointer-events-none">{item.icon}</span>
                  <span className="text-sm font-medium pointer-events-none">{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Logout/Auth Button */}
            <div className="p-4 border-t border-white/10 bg-black/40">
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="w-full text-xs font-bold text-white bg-red-600/20 hover:bg-red-600/40 transition-all border border-red-500/50 rounded-2xl py-3 cursor-pointer pointer-events-auto"
                >
                  Sign Out
                </button>
              ) : (
                <Link
                  href="/auth/signin"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-xs text-center font-bold text-black bg-white hover:bg-gray-100 transition-all rounded-2xl py-3 cursor-pointer pointer-events-auto"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
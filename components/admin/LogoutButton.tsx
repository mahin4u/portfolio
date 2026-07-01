"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }
  return (
    <button
      onClick={logout}
      className="rounded-lg border border-midnight/15 px-3 py-1.5 text-sm font-medium text-midnight/70 transition-colors hover:border-electric/50 hover:text-electric"
    >
      Log out
    </button>
  );
}

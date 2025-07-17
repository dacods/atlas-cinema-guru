"use client";

import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-teal-300 text-black px-4 py-2 flex justify-between items-center">
      <div className="flex items-center gap-2 font-bold text-lg">
        <Image src="/cinema.png" alt="Cinema Guru Logo" width={24} height={24} />
        Cinema Guru
      </div>
      <div className="flex gap-4 items-center">
        {session?.user?.email && <span>Welcome, {session.user.email}</span>}
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="hover:underline"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

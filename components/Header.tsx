import { auth, signOut } from "@/auth";
import Image from "next/image";

export default async function Header() {
  const session = await auth();

  return (
    <header className="bg-teal-300 text-black px-4 py-2 flex justify-between items-center">
      <div className="flex items-center gap-2 font-bold text-lg">
        <Image src="/icon.png" alt="Cinema Guru Logo" width={24} height={24} />
        Cinema Guru
      </div>
      <div className="flex gap-4 items-center">
        {session?.user?.email && <span>Welcome, {session.user.email}</span>}
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button className="hover:underline">Logout</button>
        </form>
      </div>
    </header>
  );
}

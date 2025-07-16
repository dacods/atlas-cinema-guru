import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import Filters from "@/components/Filters";
import { fetchGenres } from "@/lib/data";
import PaginationList from "@/components/PaginationList";

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/");

  const userEmail = session.user?.email!;
  const minYear = 1900;
  const maxYear = new Date().getFullYear();
  const allGenres = await fetchGenres();

  return (
    <>
      <Header />
      <main className="p-6">
        <Filters />
        <PaginationList
          userEmail={userEmail}
          minYear={minYear}
          maxYear={maxYear}
          allGenres={allGenres}
        />
      </main>
    </>
  );
}

"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Filters from "@/components/Filters";
import PaginationList from "@/components/PaginationList";
import Sidebar from "@/components/Sidebar";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  const [query, setQuery] = useState("");
  const [minYear, setMinYear] = useState("1900");
  const [maxYear, setMaxYear] = useState(new Date().getFullYear().toString());
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  return (
    <>
      <Header />
      <div className="flex h-[calc(100vh-56px)]">
        <Sidebar userEmail={session?.user?.email ?? ""} />
        <main className="flex-1 p-6 overflow-y-auto ml-16 transition-all duration-300 group-hover:ml-64">
          <Filters
            query={query}
            setQuery={setQuery}
            minYear={minYear}
            setMinYear={setMinYear}
            maxYear={maxYear}
            setMaxYear={setMaxYear}
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
          />
          <PaginationList
            userEmail={session?.user?.email ?? ""}
            query={query}
            minYear={+minYear}
            maxYear={+maxYear}
            genres={selectedGenres}
          />
        </main>
      </div>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";

type Props = {
  userEmail: string;
  query: string;
  minYear: number;
  maxYear: number;
  genres: string[];
};

export default function PaginationList({
  userEmail,
  query,
  minYear,
  maxYear,
  genres,
}: Props) {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const params = new URLSearchParams({
        page: page.toString(),
        minYear: minYear.toString(),
        maxYear: maxYear.toString(),
        query,
        genres: genres.join(","),
      });

      const url = `/api/titles?${params.toString()}`;
      console.log("Fetching:", url);

      try {
        const res = await fetch(url, { credentials: "include" });
        console.log("Response status:", res.status);

        if (!res.ok) {
          throw new Error(`Failed to fetch titles: ${res.status}`);
        }

        const data = await res.json();
        console.log("Fetched movies:", data.title);

        setMovies(data.title || []);
      } catch (err) {
        console.error("Fetch error:", err);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [page, userEmail, query, minYear, maxYear, genres]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          <p className="col-span-full text-center">Loading...</p>
        ) : movies.length === 0 ? (
          <p className="col-span-full text-center">No results found.</p>
        ) : (
          movies.map((movie) => {
            return <MovieCard key={movie.id} movie={movie} />;
          })
        )}
      </div>
      <Pagination
        currentPage={page}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => p + 1)}
        disablePrev={page === 1}
        disableNext={movies.length < 6}
      />
    </>
  );
}

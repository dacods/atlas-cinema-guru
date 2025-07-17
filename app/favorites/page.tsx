"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard";
import Pagination from "@/components/Pagination";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function FavoritesPage() {
  const { data: session } = useSession();
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/favorites?page=${page}`, {
          credentials: "include",
        });
        const data = await res.json();
        setFavorites(data.favorites || []);
      } catch (err) {
        console.error("Error fetching favorites:", err);
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.email) {
      loadFavorites();
    }
  }, [page, session?.user?.email]);

  return (
    <>
      <Header />
      <div className="flex group h-screen">
        <Sidebar userEmail={session?.user?.email ?? ""} />
        <main className="transition-all duration-300 ml-16 group-hover:ml-64 flex-1 p-6">
          <h1 className="text-3xl font-bold text-center mb-6">Favorites</h1>
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : favorites.length === 0 ? (
            <p className="text-center">You have no favorite movies yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {favorites.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
          <Pagination
            currentPage={page}
            onPrev={() => setPage((p) => Math.max(1, p - 1))}
            onNext={() => setPage((p) => p + 1)}
            disablePrev={page === 1}
            disableNext={favorites.length < 6}
          />
        </main>
      </div>
    </>
  );
}

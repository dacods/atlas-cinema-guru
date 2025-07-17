"use client";

import Image from "next/image";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar, faClock as solidClock } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar, faClock as regularClock } from "@fortawesome/free-regular-svg-icons";

export default function MovieCard({ movie }: { movie: any }) {
  const [isFavorited, setIsFavorited] = useState<boolean>(movie.favorited);
  const [isWatchLater, setIsWatchLater] = useState<boolean>(movie.watchLater);
  const [hovered, setHovered] = useState(false);

  const toggleFavorite = async () => {
    const method = isFavorited ? "DELETE" : "POST";
    await fetch(`/api/favorites/${movie.id}`, {
      method,
      credentials: "include",
    });
    setIsFavorited(!isFavorited);
  };

  const toggleWatchLater = async () => {
    const method = isWatchLater ? "DELETE" : "POST";
    await fetch(`/api/watch-later/${movie.id}`, {
      method,
      credentials: "include",
    });
    setIsWatchLater(!isWatchLater);
  };

  return (
    <div
      className="relative group rounded-xl border border-white overflow-hidden shadow-lg bg-[#001]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={movie.image}
        alt={movie.title}
        width={400}
        height={600}
        unoptimized
        className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]"
      />

      <div
        className={`absolute top-2 right-2 z-10 flex gap-2 transition-opacity duration-300 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={toggleFavorite}
          className="text-white drop-shadow"
        >
          <FontAwesomeIcon icon={isFavorited ? solidStar : regularStar} />
        </button>
        <button
          onClick={toggleWatchLater}
          className="text-white drop-shadow"
        >
          <FontAwesomeIcon icon={isWatchLater ? solidClock : regularClock} />
        </button>
      </div>

      <div
        className={`absolute bottom-0 left-0 right-0 transition-all duration-300 bg-[#00135a] text-white px-4 py-4 ${
          hovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <h3 className="text-base font-semibold leading-tight">
          {movie.title} ({movie.released})
        </h3>

        {movie.synopsis && (
          <p className="text-sm mt-1 leading-snug line-clamp-3">
            {movie.synopsis}
          </p>
        )}

        {movie.genre && (
          <div className="mt-2 inline-block bg-teal-300 text-black text-xs font-semibold px-3 py-1 rounded-full">
            {Array.isArray(movie.genre) ? movie.genre.join(", ") : movie.genre}
          </div>
        )}
      </div>
    </div>
  );
}

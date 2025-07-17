"use client";

const genresList = [
  "Romance", "Horror", "Drama", "Action", "Mystery",
  "Fantasy", "Thriller", "Western", "Sci-Fi", "Adventure",
];

type FiltersProps = {
  query: string;
  setQuery: (val: string) => void;
  minYear: string;
  setMinYear: (val: string) => void;
  maxYear: string;
  setMaxYear: (val: string) => void;
  selectedGenres: string[];
  setSelectedGenres: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function Filters({
  query,
  setQuery,
  minYear,
  setMinYear,
  maxYear,
  setMaxYear,
  selectedGenres,
  setSelectedGenres,
}: FiltersProps) {
  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev: string[]) =>
      prev.includes(genre)
        ? prev.filter((g: string) => g !== genre)
        : [...prev, genre]
    );
  };

  return (
    <section className="bg-[#00135a] p-6 rounded-xl mb-6 text-white">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div className="flex flex-col gap-4 max-w-[500px] w-full">
          <div>
            <label className="block text-sm mb-1">Search</label>
            <input
              type="text"
              placeholder="Search Movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-full border border-cyan-400 px-4 py-2 bg-transparent text-white placeholder-cyan-300"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm mb-1">Min Year</label>
              <input
                type="number"
                value={minYear}
                onChange={(e) => setMinYear(e.target.value)}
                className="w-full rounded-full border border-cyan-400 px-4 py-2 bg-transparent text-white placeholder-cyan-300"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-1">Max Year</label>
              <input
                type="number"
                value={maxYear}
                onChange={(e) => setMaxYear(e.target.value)}
                className="w-full rounded-full border border-cyan-400 px-4 py-2 bg-transparent text-white placeholder-cyan-300"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col max-w-[480px] w-full items-start">
          <label className="block text-sm mb-2">Genres</label>
          <div className="flex flex-wrap gap-2">
            {genresList.map((genre) => (
              <button
                key={genre}
                onClick={() => toggleGenre(genre)}
                className={`px-3 py-1 rounded-full border ${
                  selectedGenres.includes(genre)
                    ? "bg-teal-300 text-black font-bold"
                    : "border-cyan-300 text-cyan-300"
                } transition`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

type Props = {
  currentPage: number;
  onPrev: () => void;
  onNext: () => void;
  disablePrev?: boolean;
  disableNext?: boolean;
};

export default function Pagination({
  currentPage,
  onPrev,
  onNext,
  disablePrev,
  disableNext,
}: Props) {
  return (
    <div className="flex justify-center mt-8">
      <div className="flex rounded-full overflow-hidden border border-black bg-[#00135a]">
        <button
          onClick={onPrev}
          disabled={disablePrev}
          className="bg-teal-300 px-6 py-2 text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed rounded-l-full"
        >
          Previous
        </button>
        <div className="w-px bg-black" />
        <button
          onClick={onNext}
          disabled={disableNext}
          className="bg-teal-300 px-6 py-2 text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed rounded-r-full"
        >
          Next
        </button>
      </div>
    </div>
  );
}

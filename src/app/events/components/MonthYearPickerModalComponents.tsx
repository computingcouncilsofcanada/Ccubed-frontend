interface YearSelectorProps {
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  years: number[];
}

interface FooterButtonsProps {
  handleGoToToday: () => void;
  handleConfirm: () => void;
}

interface MonthGridProps {
  MONTHS: string[];
  selectedMonth: number;
  setSelectedMonth: (month: number) => void;
  thisMonth: number;
  thisYear: number;
  selectedYear: number;
}

export function YearSelector({
  selectedYear,
  setSelectedYear,
  years,
}: YearSelectorProps) {
  return (
    <div className="mb-6">
      <label className="block text-sm text-white/80 mb-2 font-medium font-roboto">
        Year
      </label>
      <div className="relative">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white appearance-none cursor-pointer hover:bg-white/15 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 font-roboto"
        >
          {years.map((year) => (
            <option key={year} value={year} className="bg-[#0B1820] text-white">
              {year}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            className="w-4 h-4 text-white/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function FooterButtons({
  handleGoToToday,
  handleConfirm,
}: FooterButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <button
        onClick={handleGoToToday}
        type="button"
        className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-white/10 hover:bg-white/15 transition-colors border border-white/20 font-roboto"
      >
        Go to Today
      </button>
      <button
        onClick={handleConfirm}
        type="button"
        className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-[#0B1820] bg-[#FAA336] hover:bg-[#e8922a] transition-colors border border-[#FAA336] font-roboto"
      >
        Confirm
      </button>
    </div>
  );
}

export function MonthGrid({
  MONTHS,
  selectedMonth,
  setSelectedMonth,
  thisMonth,
  thisYear,
  selectedYear,
}: MonthGridProps) {
  return (
    <div className="mb-6">
      <label className="block text-sm text-white/80 mb-2 font-medium font-roboto">
        Month
      </label>
      <div className="grid grid-cols-3 gap-2">
        {MONTHS.map((month, idx) => {
          const isSelected = idx === selectedMonth;
          const isCurrent = idx === thisMonth && selectedYear === thisYear;

          return (
            <button
              key={month}
              type="button"
              onClick={() => setSelectedMonth(idx)}
              className={`
                px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 font-roboto
                ${
                  isSelected
                    ? "bg-[#FAA336] text-[#0B1820]"
                    : "bg-white/10 text-white hover:bg-white/15 hover:text-white"
                }
                ${isCurrent && !isSelected ? "ring-1 ring-[#FAA336]" : ""}
              `}
            >
              {month.slice(0, 3)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

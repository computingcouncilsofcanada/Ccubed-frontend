"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  FooterButtons,
  MonthGrid,
  YearSelector,
  MONTHS,
} from "./MonthYearPickerModalComponents";

type MonthYearPickerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  currentMonth: number;
  currentYear: number;
  onSelect: (month: number, year: number) => void;
};

export function MonthYearPickerModal({
  isOpen,
  onClose,
  currentMonth,
  currentYear,
  onSelect,
}: MonthYearPickerModalProps) {
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const today = new Date();
  const thisMonth = today.getMonth();
  const thisYear = today.getFullYear();

  const years = useMemo(() => {
    const result: number[] = [];
    const startYear = 2022;
    const endYear = thisYear + 3;
    for (let y = startYear; y <= endYear; y++) {
      result.push(y);
    }
    return result;
  }, [thisYear]);

  useEffect(() => {
    if (isOpen) {
      setSelectedMonth(currentMonth);
      setSelectedYear(currentYear);
    }
  }, [isOpen, currentMonth, currentYear]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleConfirm = () => {
    onSelect(selectedMonth, selectedYear);
    onClose();
  };

  const handleGoToToday = () => {
    onSelect(thisMonth, thisYear);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="month-year-picker-title"
    >
      <div
        className="bg-[#D4D4D4]/10 md:rounded-2xl max-w-sm w-full mx-4 p-6 relative text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 md:w-10 md:h-10 rounded-full border border-white/20 hover:border-white hover:bg-white/10 text-white text-xl transition-all duration-200"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="mb-2">
          <h2
            id="month-year-picker-title"
            className="text-2xl font-bold font-roboto"
            style={{
              background: "linear-gradient(90deg, #fff 0%, #5181F0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Select Month & Year
          </h2>
        </div>

        <YearSelector
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          years={years}
        />

        <MonthGrid
          MONTHS={MONTHS}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          thisMonth={thisMonth}
          thisYear={thisYear}
          selectedYear={selectedYear}
        />

        <FooterButtons
          handleGoToToday={handleGoToToday}
          handleConfirm={handleConfirm}
        />
      </div>
    </div>
  );
}

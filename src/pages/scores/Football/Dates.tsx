import React from "react";

import { cn } from "@/lib/cn";

interface DatesProps {
  date: string;
  isSelected: boolean;
  onClick: (date: string) => void;
}

const Dates: React.FC<DatesProps> = ({ date, onClick, isSelected }) => {
  const input = new Date(date);

  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  // const dayOfWeek = input.getDay();
  const monthIdx = input.getMonth();

  // const weekDay = daysOfWeek[dayOfWeek];

  const myArray = date.split("-");
  const month = months[monthIdx];

  return (
    <div
      className={cn(
        "cursor-pointer",
        isSelected ? "font-bold bg-slate-500 rounded-md" : ""
      )}
      onClick={() => onClick(date)}
    >
      <div className="flex whitespace-nowrap m-2">
        <div className="py-1">
          {myArray[2]} {month}
        </div>
      </div>
    </div>
  );
};

export default Dates;

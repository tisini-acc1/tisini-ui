import { BingoItem } from "./BingoPage";
import React, { forwardRef } from "react";
import tisiniLogo from "@/assets/img/tisini.png";
import { CheckCircle2Icon, TrophyIcon } from "lucide-react";

type CompletedBingoProps = {
  data: BingoItem[];
  completedCount: number;
  bingoLines: number;
};

export const CompletedBingo = forwardRef<HTMLElement, CompletedBingoProps>(
  ({ data, completedCount, bingoLines }, ref) => {
    const FREE_SPACE_INDEX = 12;

    const achievements = {
      hasBlackout: completedCount === 25,
      hasFiveInRow: bingoLines > 0,
      hasHalfway: completedCount >= 13,
      hasFirstLine: bingoLines >= 1,
    };

    return (
      <main
        ref={ref}
        className="max-w-6xl mx-auto p-2 sm:p-3 md:p-4 my-4 sm:my-6 md:my-12 rounded-lg relative overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.15) 0, rgba(255,255,255,0.15) 6%, transparent 6%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.12) 0, rgba(255,255,255,0.12) 7%, transparent 7%), radial-gradient(circle at 30% 80%, rgba(255,255,255,0.1) 0, rgba(255,255,255,0.1) 8%, transparent 8%), linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #1d4ed8 100%)",
        }}
      >
        {/* subtle diagonal overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(255,255,255,0.2) 0, rgba(255,255,255,0.2) 2px, transparent 2px, transparent 14px)",
          }}
        />

        <header className="grid grid-cols-3 items-center justify-between gap-2 sm:gap-3 md:gap-4 px-2 sm:px-3 md:px-4 lg:px-6 py-3 sm:py-4">
          {/* Left: Year/Football Text */}
          <div className="text-lg md:text-2xl lg:text-3xl text-left font-extrabold text-white leading-tight drop-shadow-sm">
            <h1>2025</h1>
            <h1>Kenyan</h1>
            <h1>Football</h1>
          </div>

          {/* Center: BINGO Title */}
          <div className="relative text-center">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-wider text-yellow-300"
              style={{
                textShadow: "2px 2px 6px rgba(0,0,0,0.45)",
                fontFamily: "'Impact', sans-serif",
                lineHeight: "1.1",
              }}
            >
              BINGO
            </h2>
            <div className="absolute left-1/2 transform -translate-x-1/2 w-3/4 sm:w-4/5 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-yellow-300 to-transparent bottom-1 sm:bottom-2" />
          </div>

          {/* Right: Logo */}
          <div className="flex justify-end">
            <img
              src={tisiniLogo}
              alt="TISINI"
              className="h-14 sm:h-16 md:h-20 lg:h-24 w-auto drop-shadow-lg"
            />
          </div>
        </header>

        {/* scores section */}
        <section>
          <p className="text-center text-white text-sm sm:text-base md:text-lg font-bold px-2 mb-3 sm:mb-4">
            You are a true Kenyan football fan!
          </p>
          <div className="bg-black/30 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 mb-4 sm:mb-6 md:mb-8 border border-green-700/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400">
                  {completedCount}/25
                </div>
                <div className="text-[10px] sm:text-xs md:text-sm text-gray-300">
                  Squares Marked
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-400">
                  {bingoLines}
                </div>
                <div className="text-[10px] sm:text-xs md:text-sm text-gray-300">
                  Bingo Lines
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-400">
                  {Math.round((completedCount / 25) * 100)}%
                </div>
                <div className="text-[10px] sm:text-xs md:text-sm text-gray-300">
                  Completion
                </div>
              </div>
              <div className="text-center">
                <TrophyIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mx-auto text-yellow-500" />
                <div className="text-[10px] sm:text-xs md:text-sm text-gray-300">
                  Level:{" "}
                  {completedCount >= 20
                    ? "Legend"
                    : completedCount >= 15
                    ? "Pro"
                    : "Fan"}
                </div>
              </div>
            </div>

            {/* Achievement Badges */}
            <div className="mt-4 sm:mt-5 md:mt-6 flex flex-wrap justify-center gap-2 sm:gap-3">
              {achievements.hasFiveInRow && (
                <span
                  className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium"
                  style={{ margin: "0 3px" }}
                >
                  🎯 5 in a Row
                </span>
              )}
              {achievements.hasBlackout && (
                <span
                  className="bg-gradient-to-r from-yellow-600 to-red-600 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium"
                  style={{ margin: "0 3px" }}
                >
                  ⭐ Full Blackout
                </span>
              )}
              {achievements.hasHalfway && (
                <span
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium"
                  style={{ margin: "0 3px" }}
                >
                  🏁 Halfway There
                </span>
              )}
              {achievements.hasFirstLine && (
                <span
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium"
                  style={{ margin: "0 3px" }}
                >
                  🥇 First Bingo
                </span>
              )}
            </div>
          </div>
        </section>

        {/* bingo items section */}
        <div className="grid grid-cols-5 gap-1 sm:gap-1.5 md:gap-2 lg:gap-3 mb-4 sm:mb-6 md:mb-8">
          {data.map((item, index) => (
            <div
              key={item.id}
              className="p-1 sm:p-1.5 md:p-2 lg:p-3 rounded-md sm:rounded-lg md:rounded-xl border-2 flex flex-col items-center justify-center relative overflow-hidden"
              style={{
                minHeight: "50px",
                backgroundColor:
                  index === FREE_SPACE_INDEX
                    ? "rgba(251, 191, 36, 0.15)"
                    : item.selected
                    ? "rgba(34, 197, 94, 0.25)"
                    : "rgba(0, 0, 0, 0.4)",
                borderColor:
                  index === FREE_SPACE_INDEX
                    ? "rgba(251, 191, 36, 0.6)"
                    : item.selected
                    ? "rgba(34, 197, 94, 0.8)"
                    : "rgba(34, 197, 94, 0.3)",
                borderStyle: index === FREE_SPACE_INDEX ? "dashed" : "solid",
                borderWidth: "1.5px",
              }}
            >
              {/* Free Space Badge */}
              {index === FREE_SPACE_INDEX && (
                <div
                  className="absolute text-white font-bold rounded-full"
                  style={{
                    top: "4px",
                    right: "4px",
                    padding: "2px 6px",
                    fontSize: "8px",
                    background:
                      "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  FREE
                </div>
              )}

              {/* Checkmark for Selected Items */}
              {item.selected && index !== FREE_SPACE_INDEX && (
                <div className="absolute" style={{ top: "4px", left: "4px" }}>
                  <CheckCircle2Icon
                    className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5"
                    style={{
                      color: "#22c55e",
                      filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.5))",
                    }}
                  />
                </div>
              )}

              {/* Item Text */}
              <div className="text-center" style={{ padding: "2px 1px" }}>
                <span
                  className="font-medium leading-tight block text-[7px] sm:text-[8px] md:text-[9px]"
                  style={{
                    color:
                      index === FREE_SPACE_INDEX
                        ? "#fef3c7"
                        : item.selected
                        ? "#ffffff"
                        : "#d1d5db",
                    textShadow:
                      item.selected || index === FREE_SPACE_INDEX
                        ? "0 1px 2px rgba(0, 0, 0, 0.5)"
                        : "none",
                    fontWeight: item.selected ? "600" : "500",
                  }}
                >
                  {item.text}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* footer with social icons */}
        <div className="mt-4 sm:mt-6 md:mt-8 pt-3 sm:pt-4 border-t border-green-700/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 px-2">
            {/* Left: Branding & URL */}
            <div className="text-center md:text-left order-2 md:order-1">
              <p className="text-xs sm:text-sm md:text-base font-medium text-gray-200">
                Play at{" "}
                <span className="font-bold text-yellow-400">
                  tisini.co.ke/bingo
                </span>
              </p>
            </div>

            {/* Center: Social Icons */}
            <div className="flex flex-col items-center justify-center gap-1.5 sm:gap-2 order-1 md:order-2">
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                {[
                  { bg: "bg-blue-600", text: "f", label: "Facebook" },
                  {
                    bg: "bg-gradient-to-r from-purple-600 to-pink-600",
                    text: "📷",
                    label: "Instagram",
                  },
                  { bg: "bg-black", text: "𝕏", label: "X/Twitter" },
                  { bg: "bg-black", text: "♪", label: "TikTok" },
                  { bg: "bg-blue-700", text: "in", label: "LinkedIn" },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="group relative"
                    title={social.label}
                  >
                    <div
                      className={`
              w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ${social.bg} rounded-full flex items-center justify-center 
              text-white font-bold text-xs sm:text-sm shadow-md hover:scale-110 transition-transform
            `}
                    >
                      {social.text}
                    </div>
                  </a>
                ))}
              </div>

              <p className="text-base sm:text-lg md:text-xl font-bold text-yellow-400 mt-0.5 sm:mt-1">
                @TisiniTech
              </p>
            </div>

            {/* Right: Date */}
            <div className="text-center md:text-right order-3">
              <p className="text-[10px] sm:text-xs md:text-sm text-gray-400">
                {new Date().toLocaleDateString("en-KE", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }
);

CompletedBingo.displayName = "CompletedBingo";

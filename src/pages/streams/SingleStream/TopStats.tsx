import React from "react";
import tisiniLogo from "@/assets/img/tisini-logo.png";

const TopStats = () => {
  return (
    <main className="p-10 relative h-screen">
      <section className="absolute bottom-24 left-20 mb-1">
        <div className="bg-blue-800 p-2 border border-black text-white flex gap-2 items-center ">
          <img src={tisiniLogo} alt="tisini" className="w-13 h-7" />

          <h4 className="font-bold capitalize">Top point scorers</h4>
        </div>

        <div className="grid grid-cols-12 border-b-2 border-black bg-gray-100 font-semibold text-xs p-1">
          <div className="col-span-1">1</div>
          <div className="col-span-9">Player playerone</div>
          <div className="col-span-2 text-end">24</div>
        </div>
      </section>
    </main>
  );
};

export default TopStats;

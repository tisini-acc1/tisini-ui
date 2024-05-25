import { Outlet } from "react-router-dom";
import MainFooter from "@/components/MainFooter";
import ScoresHeader from "@/components/scores/ScoresHeader";

const ScoresLayout = () => {
  return (
    <main className="bg-white ">
      <div className="max-w-5xl m-auto">
        <ScoresHeader />
        <div className="min-h-screen m-3 bg-slate-100 border border-black-lighter rounded-lg">
          <Outlet />
        </div>
        <MainFooter />
      </div>
    </main>
  );
};

export default ScoresLayout;

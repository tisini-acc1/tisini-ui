import { Outlet } from "react-router-dom";
import MainFooter from "@/components/MainFooter";
import ScoresHeader from "@/components/scores/ScoresHeader";
// import { Standings } from "@/pages/scores/standings/Standings";

// const ScoresLayout = () => {
//   return (
//     <main className="bg-white ">
//       <div className="max-w-7xl mx-auto">
//         <ScoresHeader />

//         <div className="m-3 grid md:grid-cols-12 grid-cols-1 gap-3 md:px-4">
//           <div className="md:col-span-8 col-span-12 bg-slate-100 rounded-lg">
//             <Outlet />
//           </div>
//           <div className="md:col-span-4 col-span-12 bg-slate-100 rounded-lg">
//             <Standings />
//           </div>
//         </div>

//         <MainFooter />
//       </div>
//     </main>
//   );
// };

const ScoresLayout = () => {
  return (
    <main className="bg-white ">
      <div className="max-w-5xl m-auto">
        <ScoresHeader />
        <div className="min-h-screen m-3 bg-slate-100 rounded-lg">
          <Outlet />
        </div>
        <MainFooter />
      </div>
    </main>
  );
};

export default ScoresLayout;

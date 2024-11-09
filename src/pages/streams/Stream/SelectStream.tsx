import { Link } from "react-router-dom";

import MainFooter from "@/components/MainFooter";
import MainHeader from "@/components/MainHeader";

export const SelectStream = () => {
  return (
    <main>
      <MainHeader />

      <div className="h-screen p-36 flex flex-col space-y-8 font-bold text-4xl">
        <button className="bg-blue-600 rounded-lg hover:bg-green-600 p-4">
          <Link to={"/streams/live"}>Live</Link>
        </button>

        <button className="bg-blue-600 rounded-lg hover:bg-green-600 p-4">
          <Link to={"/streams/elgon"}>Elgon Cup</Link>
        </button>

        <button className="bg-blue-600 rounded-lg hover:bg-green-600 p-4">
          <Link to={"/streams/legends"}>Legends Cup</Link>
        </button>

        <button className="bg-blue-600 rounded-lg hover:bg-green-600 p-4">
          <Link to={"/streams/evansbet"}>Evans bet</Link>
        </button>

        <button className="bg-blue-600 rounded-lg hover:bg-green-600 p-4">
          <Link to={"/streams/kawowo"}>Kawowo</Link>
        </button>
      </div>

      <MainFooter />
    </main>
  );
};

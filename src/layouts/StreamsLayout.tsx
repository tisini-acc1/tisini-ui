import { Outlet } from "react-router-dom";

export const StreamsLayout = () => {
  return (
    <main className="bg-green-600 ">
      <div className="min-h-screen">
        <Outlet />
      </div>
    </main>
  );
};

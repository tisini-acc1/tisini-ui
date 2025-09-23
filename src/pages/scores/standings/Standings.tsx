import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import homeImg from "@/assets/homeLogo.png";
import { Standing } from "@/lib/types/scores";
import Spinner from "@/components/spinner/Spinner";
import FetchStandings from "@/lib/data/FetchStandings";

export const Standings = () => {
  const { data, isLoading } = useQuery(["standings"], () => FetchStandings());

  const { leagueId } = useParams();
  const tournId = leagueId?.split("-").pop();

  if (isLoading) {
    return <Spinner />;
  }

  const standings = data?.find((t) => t.tournament_id === tournId)?.series[0]
    .standings;

  if (!standings) {
    return (
      <div className="flex h-96 items-center justify-center text-muted-foreground">
        No standings yet!
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Table Header */}
      <div className="grid grid-cols-12 px-4 py-3 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-700 uppercase tracking-wider">
        <div className="col-span-6 flex items-center">
          <span className="w-6 text-center">#</span>
          <span>Team</span>
        </div>
        <div className="col-span-1 text-center">MP</div>
        <div className="col-span-1 text-center">W</div>
        <div className="col-span-1 text-center">D</div>
        <div className="col-span-1 text-center">L</div>
        <div className="col-span-1 text-center">GD</div>
        <div className="col-span-1 text-center font-medium text-blue-600">
          PTS
        </div>
      </div>

      {/* Table Rows */}
      <div className="divide-y divide-gray-100">
        {standings?.map((item, idx) => (
          <StandingsRow key={idx} item={item} idx={idx} />
        ))}
      </div>

      {/* Legend Section */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <div className="flex items-center space-x-2">
            <span className="w-5 h-5 bg-green-600 text-white text-xs flex items-center justify-center rounded font-medium">
              1
            </span>
            <span className="text-sm text-gray-700">CAF Champions League</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-5 h-5 bg-yellow-500 text-white text-xs flex items-center justify-center rounded font-medium">
              16
            </span>
            <span className="text-sm text-gray-700">Relegation Play-offs</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-5 h-5 bg-red-600 text-white text-xs flex items-center justify-center rounded font-medium">
              17
            </span>
            <span className="text-sm text-gray-700">Relegated</span>
          </div>
        </div>

        <div className="text-xs text-gray-500 italic pt-2 border-t border-gray-200">
          If teams finish on equal points at the end of the season, goal
          difference will be the tie-breaker.
        </div>
      </div>
    </div>
  );
};

const StandingsRow = ({ item, idx }: { item: Standing; idx: number }) => {
  // Determine row styling based on position for visual hierarchy
  const getRowStyle = (position: number) => {
    if (position === 0) return "bg-green-50 border-l-4 border-l-green-500";
    if (position >= 15) return "bg-red-50 border-l-4 border-l-red-500";
    if (position >= 13) return "bg-yellow-50 border-l-4 border-l-yellow-500";
    return "hover:bg-gray-50 transition-colors duration-150";
  };

  return (
    <div
      className={`grid grid-cols-12 px-4 py-3 items-center ${getRowStyle(idx)}`}
    >
      <div className="col-span-6 flex items-center space-x-3">
        <span
          className={`w-6 h-6 flex items-center justify-center text-sm font-medium rounded-full ${
            idx === 0
              ? "bg-green-600 text-white"
              : idx >= 15
              ? "bg-red-600 text-white"
              : idx >= 13
              ? "bg-yellow-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {idx + 1}
        </span>
        <img src={homeImg} alt={item.team} className="w-6 h-6 rounded-full" />
        <span className="font-medium text-gray-900 truncate">{item.team}</span>
      </div>
      <div className="col-span-1 text-center text-sm text-gray-600">
        {item.P}
      </div>
      <div className="col-span-1 text-center text-sm text-gray-600">
        {item.W}
      </div>
      <div className="col-span-1 text-center text-sm text-gray-600">
        {item.D}
      </div>
      <div className="col-span-1 text-center text-sm text-gray-600">
        {item.L}
      </div>
      <div className="col-span-1 text-center text-sm font-medium text-gray-700">
        {item.GD}
      </div>
      <div className="col-span-1 text-center text-sm font-bold text-blue-700">
        {item.Pts}
      </div>
    </div>
  );
};

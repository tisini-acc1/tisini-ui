import { MdOutlineSportsSoccer } from "react-icons/md";

import { FixtureDetails, GameHighlights } from "@/lib/types/scores";

type OverviewProps = {
  teams: FixtureDetails;
  highlights: GameHighlights[];
};

const FixtureOverview = ({ teams, highlights }: OverviewProps) => {
  if (highlights === null) {
    return (
      <div className="h-[400px] flex items-center justify-center text-2xl">
        No Data!
      </div>
    );
  }

  const penalties = highlights?.filter(
    (highlight) => highlight.event_name === "PM Penalties"
  );

  return (
    <div className="space-y-2">
      <div className="flex justify-center items-center bg-gray-300 h-10 text-base md:text-2xl font-bold">
        {"First Half"}
      </div>
      {highlights.map((highlight, index) => (
        <div key={index}>
          {highlight.game_moment === "firsthalf" &&
            highlight.event_name !== "Goal Conceded" && (
              <HighlightsCard highlight={highlight} teams={teams} />
            )}
        </div>
      ))}

      <div className="flex justify-center items-center bg-gray-300 h-10 text-base md:text-2xl font-bold">
        {"Second Half"}
      </div>
      {highlights.map((highlight, index) => (
        <div key={index}>
          {highlight.game_moment === "secondhalf" &&
            highlight.event_name !== "Goal Conceded" &&
            highlight.event_name !== "PM Penalties" && (
              <HighlightsCard highlight={highlight} teams={teams} />
            )}
        </div>
      ))}

      {penalties.length > 0 && (
        <>
          <div className="flex justify-center items-center bg-gray-300 h-10 text-base md:text-2xl font-bold">
            {"Penalties"}
          </div>

          {penalties.map((penalty, index) => (
            <HighlightsCard highlight={penalty} teams={teams} key={index} />
          ))}
        </>
      )}
    </div>
  );
};

export default FixtureOverview;

const HighlightsCard = ({
  highlight,
  teams,
}: {
  highlight: GameHighlights;
  teams: FixtureDetails;
}) => {
  const homeId = teams.team1_id;

  const icon =
    highlight.subeventName === "Red"
      ? "🟥"
      : highlight.event_name === "Card"
      ? "🟨"
      : highlight.event_name === "Goal" ||
        highlight.event_name === "PM Penalties"
      ? "⚽"
      : highlight.event_name === "Score" &&
        (highlight.subeventName === "Try" ||
          highlight.subeventName === "Penalty Try")
      ? "🏉"
      : highlight.event_name === "Score" &&
        (highlight.subeventName === "Successful Conversion" ||
          highlight.subeventName === "Conversion" ||
          highlight.subeventName === "Missed Conversion")
      ? "↔️"
      : highlight.event_name === "Score" &&
        (highlight.subeventName === "Successful Penalty" ||
          highlight.subeventName === "Missed Penalty")
      ? "⚡"
      : highlight.event_name === "Score" &&
        (highlight.subeventName === "Successful Drop Goal" ||
          highlight.subeventName === "Missed Drop Goal")
      ? "🎯"
      : "";

  return (
    <div className="p-2 font-semibold">
      {highlight.team === homeId ? (
        highlight.event_name === "Substitute" ? (
          <div className="flex items-center gap-1">
            {highlight.game_minute}'
            <div>
              <div className="text-red-500 capitalize">
                {"⬇️"} {highlight.pname}
              </div>
              <div className="text-green-600 capitalize">
                {"⬆️"} {highlight.subplayer_name}
              </div>
            </div>
          </div>
        ) : highlight.event_name === "PM Penalties" ? (
          <div
            className={`${
              highlight.subeventName === "Scored"
                ? "text-green-600"
                : "text-red-500"
            } capitalize flex items-center gap-1`}
          >
            {highlight.game_minute}' <MdOutlineSportsSoccer /> {highlight.pname}
          </div>
        ) : highlight.event_name === "Score" &&
          (highlight.subeventName === "Missed Conversion" ||
            highlight.subeventName === "Missed Penalty" ||
            highlight.subeventName === "Missed Drop Goal") ? (
          <div className="capitalize text-red-500">
            {highlight.game_minute}' {icon} {highlight.pname}
          </div>
        ) : highlight.event_name === "Score" &&
          (highlight.subeventName === "Successful Conversion" ||
            highlight.subeventName === "Successful Penalty" ||
            highlight.subeventName === "Successful Drop Goal" ||
            highlight.subeventName === "Try" ||
            highlight.subeventName === "Penalty Try" ||
            highlight.subeventName === "Conversion") ? (
          <div className="capitalize text-green-600">
            {highlight.game_minute}' {icon} {highlight.pname}
          </div>
        ) : (
          <div className="capitalize">
            {highlight.game_minute}' {icon} {highlight.pname}
          </div>
        )
      ) : highlight.event_name === "Substitute" ? (
        <div className="flex items-center justify-end gap-1">
          <div>
            <div className="text-red-500 text-end capitalize">
              {highlight.pname} {"⬇️"}
            </div>
            <div className="text-green-600 text-end capitalize">
              {highlight.subplayer_name} {"⬆️"}
            </div>
          </div>
          {highlight.game_minute}'
        </div>
      ) : highlight.event_name === "PM Penalties" ? (
        <div
          className={`${
            highlight.subeventName === "Scored"
              ? "text-green-600"
              : "text-red-500"
          } capitalize flex items-center justify-end gap-1`}
        >
          {highlight.pname} <MdOutlineSportsSoccer /> {highlight.game_minute}'
        </div>
      ) : highlight.event_name === "Score" &&
        (highlight.subeventName === "Missed Conversion" ||
          highlight.subeventName === "Missed Penalty" ||
          highlight.subeventName === "Missed Drop Goal") ? (
        <div className="flex justify-end capitalize text-red-500">
          {highlight.pname} {icon} {highlight.game_minute}'
        </div>
      ) : highlight.event_name === "Score" &&
        (highlight.subeventName === "Successful Conversion" ||
          highlight.subeventName === "Successful Penalty" ||
          highlight.subeventName === "Successful Drop Goal" ||
          highlight.subeventName === "Try" ||
          highlight.subeventName === "Penalty Try" ||
          highlight.subeventName === "Conversion") ? (
        <div className="flex justify-end capitalize text-green-600">
          {highlight.pname} {icon} {highlight.game_minute}'
        </div>
      ) : (
        <div className="flex justify-end capitalize">
          {highlight.pname} {icon} {highlight.game_minute}'
        </div>
      )}
    </div>
  );
};

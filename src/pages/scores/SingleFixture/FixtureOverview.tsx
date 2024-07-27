import { FixtureDetails, GameHighlights } from "@/lib/types/scores";

type OverviewProps = {
  teams: FixtureDetails;
  highlights: GameHighlights[];
};

const FixtureOverview = ({ teams, highlights }: OverviewProps) => {
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
            highlight.event_name !== "Goal Conceded" && (
              <HighlightsCard highlight={highlight} teams={teams} />
            )}
        </div>
      ))}
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
    highlight.event_name === "Card"
      ? "🟨"
      : highlight.event_name === "Goal"
      ? "⚽"
      : highlight.event_name === "Conversion"
      ? "↔️"
      : highlight.event_name === "Score"
      ? "🏉"
      : "🟥";

  return (
    <div className="p-2 ">
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
      ) : (
        <div className="flex justify-end capitalize">
          {highlight.pname} {icon} {highlight.game_minute}'
        </div>
      )}
    </div>
  );
};

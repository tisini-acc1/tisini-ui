/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { QsetPlayer, QuizSetLeaderBoardSummaryPayload } from "@/lib/types";

import Loader from "@/components/Loader/Loader";
import React from "react";
import { privateAxios } from "@/lib/api";
import { useParams } from "react-router-dom";

export default function QuestionsetLeaderboard() {
  const { questionSetId } = useParams() as { questionSetId: string };
  const getQuestionSetLeaderBoards = async () => {
    const response = (
      await privateAxios.get(`/quiz/quiz_leaderboard/${questionSetId}`)
    ).data;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response;
  };
  const baseGravatar =
    "https://gravatar.com/avatar/cc8cbfcbd5bc4908182252d212020d52?d=mp";

  const [leaderBoard, setLeaderBoard] =
    React.useState<QuizSetLeaderBoardSummaryPayload>(
      {} as QuizSetLeaderBoardSummaryPayload
    );
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const computeScore = (player: QsetPlayer) => {
    if (!player || !player.points || !player.timer) {
      return 0;
    }
    const points = player.points;
    const timer = player.timer;
    const score = points - timer;

    return score;
  };

  const loadLeaderBoard = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getQuestionSetLeaderBoards();
      const leaderboard = data as QuizSetLeaderBoardSummaryPayload;
      if (leaderboard.question_players && leaderboard.question_players.length === 0) {
        setLeaderBoard(leaderboard);
        setIsLoading(false);
        return;
      }
      leaderboard.question_players =
        leaderboard.question_players && Array.isArray(leaderboard.question_players)
          ? leaderboard.question_players.map((player) => {
              player.score = computeScore(player);
              player.q_player.profile_pic =
                player.q_player.profile_pic ?? baseGravatar;
              return player;
            })
          : [];
      leaderboard.question_players.sort((a, b) => {
        return b.score! - a.score!;
      });

      setLeaderBoard(leaderboard);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      //   addToast("Something went wrong", { appearance: 'error', autoDismiss: true, placement: 'top-right' });
    }
  }, [questionSetId]);

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    Promise.allSettled([loadLeaderBoard()]).catch(() => {});
  }, []);

  const participantsLength = leaderBoard.question_players
    ? leaderBoard.question_players.length
    : 0;

  return (
    <main>
      <Loader isLoading={isLoading} />
      {participantsLength > 0 ? (
        <div className="border p-4 my-2 rounded-2 shadow">
          <div className="flex p-4">
            <h1 className="text-primary uppercase font-bold">
              {leaderBoard.category_name}
            </h1>
          </div>
          <table className="min-w-full divide-y divide-gray-200 border border-collapse">
            <tr className="border">
              <th
                scope="col"
                className="border px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
              >
                #
              </th>
              <th
                scope="col"
                className="border px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
              >
                Player
              </th>
              <th
                scope="col"
                className="border px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
              >
                Points
              </th>
              <th
                scope="col"
                className="border px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
              >
                Avg time
              </th>
            </tr>
            {leaderBoard.question_players.map((player, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap border">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border">
                  <div>
                    <div className="flex items-center">
                      <div className="ml-4 flex gap-1">
                        <div className="text-sm font-medium text-gray-900">
                          {player.q_player.first_name}
                          {player.q_player.last_name}
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border">
                  {player.points}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border">
                  {player.timer}
                </td>
              </tr>
            ))}
          </table>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[40vh]">
          {/* Rest of the JSX when there are no participants */}
          {/* Code omitted for brevity */}
        </div>
      )}
    </main>
  );
}

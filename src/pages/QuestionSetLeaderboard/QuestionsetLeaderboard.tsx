/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { Link, useParams } from "react-router-dom";
import { QsetPlayer, QuizSetLeaderBoardSummaryPayload } from "@/lib/types";

import Loader from "@/components/Loader/Loader";
import React from "react";
import { privateAxios } from "@/lib/api";

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
    if (!player || !player.points_earned || !player.time_used) {
      return 0;
    }
    const points = player.points_earned;
    const timer = player.time_used;
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
console.log({leaderboard});

      setLeaderBoard(leaderboard);
    } catch (err) {
      setIsLoading(false);
      //   addToast("Something went wrong", { appearance: 'error', autoDismiss: true, placement: 'top-right' });
    }
    finally{
      setIsLoading(false);
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
    <main className="overflow-auto min-h-[50vh]">
      <Loader isLoading={isLoading} />
      {participantsLength > 0 ? (
        <div className="border p-4 my-2 rounded-2 shadow">
          <div className="flex p-4">
            <h1 className="text-primary uppercase font-medium">
              {leaderBoard.category_name}
            </h1>
          </div>
          <table className="min-w-full divide-y divide-gray-200 border border-collapse">
            <tr className="border">
              <th
                scope="col"
                className="border px-2 py-1 text-left font-medium text-gray-500 uppercase tracking-wider"
              >
                #
              </th>
              <th
                scope="col"
                className="border px-2 py-1 text-left font-medium text-gray-500 uppercase tracking-wider"
              >
                Nickname
              </th><th
                scope="col"
                className="border px-2 py-1 text-left font-medium text-gray-500 uppercase tracking-wider"
              >
                First name
              </th><th
                scope="col"
                className="border px-2 py-1 text-left font-medium text-gray-500 uppercase tracking-wider"
              >
                Last name
              </th>
              <th
                scope="col"
                className="border px-2 py-1 text-left font-medium text-gray-500 uppercase tracking-wider"
              >
                Points
              </th>
              <th
                scope="col"
                className="border px-2 py-1 text-left font-medium text-gray-500 uppercase tracking-wider"
              >
                Avg time
              </th>
            </tr>
            {leaderBoard.question_players.map((player, index) => (
              <tr key={index}>
                <td className="px-2 py-1 whitespace-nowrap border">
                  {index + 1}
                </td>
                <td className="px-2 py-1 whitespace-nowrap border">
                  <Link to={'#'} 
                  className="text-blue-500 hover:text-primary-dark"
                  >@{player.q_player.nickname}</Link>
                </td>
                <td className="px-2 py-1 whitespace-nowrap border">
                  {player.q_player.first_name}
                </td> <td className="px-2 py-1 whitespace-nowrap border">
                  {player.q_player.last_name}
                </td>
             
                <td className="px-2 py-1 whitespace-nowrap border">
                  {player.points_earned}
                </td>
                <td className="px-2 py-1 whitespace-nowrap border">
                  {player.time_used}
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

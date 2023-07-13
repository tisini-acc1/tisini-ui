"use client";

import { QsetPlayer, QuizSetLeaderBoardSummaryPayload } from "@/types";
import React, { useEffect, useState } from "react";

import { useParams } from "next/navigation";

const getQuestionSetLeaderBoards = async (qsetId: string) => {
  const response = await fetch(`/api/v1/quizsets/${qsetId}/leaderboard`);
  const data = await response.json();
  return data;
};
export default function LeaderBoard() {
  const { qsetId } = useParams() as { qsetId: string };
  const baseGravatar =
    "https://gravatar.com/avatar/cc8cbfcbd5bc4908182252d212020d52?d=mp";

  const [leaderBoard, setLeaderBoard] =
    useState<QuizSetLeaderBoardSummaryPayload>(
      {} as QuizSetLeaderBoardSummaryPayload
    );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const computeScore = (player: QsetPlayer) => {
    if (!player || !player.points || !player.timer) {
      return 0;
    }
    const points = player.points;
    const timer = player.timer;
    const score = points - timer;

    return score;
  };

  const loadLeaderBoard = async () => {
    setIsLoading(true);
    try {
      const data = await getQuestionSetLeaderBoards(qsetId);
      const lboard = data as QuizSetLeaderBoardSummaryPayload;
      if (lboard.question_players && lboard.question_players.length === 0) {
        setLeaderBoard(lboard);
        setIsLoading(false);
        return;
      }
      lboard.question_players =
        lboard.question_players && Array.isArray(lboard.question_players)
          ? lboard.question_players.map((player) => {
              player.score = computeScore(player);
              player.q_player.profile_pic =
                player.q_player.profile_pic ?? baseGravatar;
              return player;
            })
          : [];
      lboard.question_players.sort((a, b) => {
        return b.score! - a.score!;
      });

      setLeaderBoard(lboard);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      //   addToast("Something went wrong", { appearance: 'error', autoDismiss: true, placement: 'top-right' });
    }
  };

  useEffect(() => {
    loadLeaderBoard();
  }, [qsetId]);

  const participantsLength = leaderBoard.question_players
    ? leaderBoard.question_players.length
    : 0;

  return (
    <main>
      {participantsLength === 0 && !isLoading ? (
        <div
          className="border p-4 my-2 rounded-2 shadow"
          v-if="participantsLength > 0"
        >
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
              {/* <th
            scope="col"
            className="border px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
          >
            Image
          </th>   */}
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
              {/* <th
            scope="col"
            className="border px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
          >
            Score
          </th>  */}
            </tr>
            {leaderBoard.question_players.map((player, index) => (
              <tr v-for="(player, index) of " key={index}>
                <td className="px-6 py-4 whitespace-nowrap border">
                  {index + 1}
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap border">
           <div className="flex items-center justify-center">
            <img
              src={player.question_players.q_player.profile_pic!}
              className="w-10 h-10 rounded-full"
            />
           </div>
          </td> */}
                <td className="px-6 py-4 whitespace-nowrap border">
                  <div>
                    <div className="flex items-center">
                      {/*  <div className="flex-shrink-0 h-8 w-8">
                  <img
                    src={player.question_players.q_player.profile_pic!
                    }
                    className="h-8 w-8 rounded-full"
                  />
                </div>  */}
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
                {/*  <td className="px-6 py-4 whitespace-nowrap border">
            {{ player.score }}
          </td>  */}
              </tr>
            ))}
          </table>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center">
              <svg
                className="w-16 h-16 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 3a1 1 0 011 1v7h5a1 1 0 110 2h-6v3a1 1 0 11-2 0V6a1 1 0 011-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No participants yet
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {/* <!-- Invite your friends to join the quiz --> */}
            </p>
            <div className="mt-6 flex gap-2">
              {/* <!-- <button
            @click="router.push(`/quiz/${qsetId}/invite`)"
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Invite
          </button> --> */}
              {/* <!-- Go back --> */}
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Go back
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */

import {
  GenericLeaderBoardData,
  NormalLeaderBoard,
  PredictiveLeaderBoard,
} from "@/lib/types";
import {
  convertLeaderBoardData,
  processPredictiveLeaderboard,
} from "@/lib/leaderboard-util";

import Loader from "@/components/Loader/Loader";
import React from "react";
import { privateAxios } from "@/lib/api";
import { useParams } from "react-router-dom";

// import useTisiniCookies from "@/hooks/useTisiniCookies";

export default function QuestionsetLeaderboard() {
  const [leaderBoardType, setLeaderBoardType] = React.useState<"NR" | "PR">(
    "NR"
  );
  const { questionSetId } = useParams() as { questionSetId: string };
  const getQuestionSetLeaderBoards = async () => {
    const response = (
      await privateAxios.get(`/quiz/quiz_leaderboard/${questionSetId}`)
    ).data;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    if (response.quiz_type === "PR") {
      setLeaderBoardType("PR");
      return convertLeaderBoardData<"PR">(
        response as PredictiveLeaderBoard,
        "PR"
      );
    } else {
      setLeaderBoardType("NR");
      return convertLeaderBoardData<"NR">(response as NormalLeaderBoard, "NR");
    }
    // return response;
  };
  const baseGravatar =
    "https://gravatar.com/avatar/cc8cbfcbd5bc4908182252d212020d52?d=mp";
  //  Normal Leaderboard
  const [normalLeaderBoard, setNormalLeaderBoard] = React.useState<
    GenericLeaderBoardData<"NR">
  >({} as GenericLeaderBoardData<"NR">);
  // Predictive Leaderboard
  const [predictiveLeaderBoard, setPredictiveLeaderBoard] = React.useState<
    ReturnType<typeof processPredictiveLeaderboard>
  >({} as ReturnType<typeof processPredictiveLeaderboard>);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const loadLeaderBoard = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const { data: payload, type: dataType } =
        await getQuestionSetLeaderBoards();
      if (dataType === "Normal") {
        const leaderboard = payload as NormalLeaderBoard;
        if (
          leaderboard.question_players &&
          leaderboard.question_players.length === 0
        ) {
          setNormalLeaderBoard(leaderboard);
          setIsLoading(false);
          return;
        }
        leaderboard.question_players =
          leaderboard.question_players &&
          Array.isArray(leaderboard.question_players)
            ? leaderboard.question_players.map((player) => {
                player.score = ((player) => {
                  if (!player || !player.points_earned || !player.time_used) {
                    return 0;
                  }
                  const points = player.points_earned;
                  const timer = player.time_used;
                  const score = points - timer;

                  return score;
                })(player);
                player.q_player.profile_pic =
                  player.q_player.profile_pic ?? baseGravatar;
                return player;
              })
            : [];
        leaderboard.question_players.sort((a, b) => {
          return b.score! - a.score!;
        });
        // console.log({leaderboard});

        setNormalLeaderBoard(leaderboard);
      } else {
        const board = payload as PredictiveLeaderBoard;

        const tableData = processPredictiveLeaderboard(board);
        setPredictiveLeaderBoard(tableData);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setIsLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.log({ e: err.stack });

      //   addToast("Something went wrong", { appearance: 'error', autoDismiss: true, placement: 'top-right' });
    } finally {
      setIsLoading(false);
    }
  }, [questionSetId]);

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    Promise.allSettled([loadLeaderBoard()]).catch(() => {});
  }, []);

  const normalLeaderBoardPlayersSize = React.useMemo(() => {
    return Array.isArray(normalLeaderBoard.question_players)
      ? normalLeaderBoard.question_players.length
      : 0;
  }, [normalLeaderBoard.question_players]);

  const leaderBoard = React.useMemo(() => {
    if (leaderBoardType === "NR") {
      return normalLeaderBoard;
    } else {
      return predictiveLeaderBoard;
    }
  }, [leaderBoardType, normalLeaderBoard, predictiveLeaderBoard]);
  // const cookies = useTisiniCookies();

  // console.log({ predictiveLeaderBoard, normalLeaderBoard, leaderBoardType });
  const bargeColorGenerator = () => ({
    ["green"]: "bg-green-200 text-green-800 rounded-md",
    ["yellow"]: "bg-yellow-200 text-yellow-800 rounded-md",
    ["red"]: "bg-red-200 text-red-800 rounded-md",
    ["blue"]: "bg-blue-200 text-blue-800 rounded-md",
    ["purple"]: "bg-purple-200 text-purple-800 rounded-md",
    ["pink"]: "bg-pink-200 text-pink-800 rounded-md",
    ["indigo"]: "bg-indigo-200 text-800 rounded-md",
  });

  return (
    <main className="overflow-auto min-h-[50vh] flex flex-col gap-2 max-w-7xl mx-auto">
      <Loader isLoading={isLoading} />
      {normalLeaderBoardPlayersSize > 0 && leaderBoardType === "NR" ? (
        <div className="p-4 my-2 rounded-2 w-full overflow-auto">
          <div className="flex p-4">
            <h1 className="text-primary uppercase font-medium">
              {normalLeaderBoard.category_name}
            </h1>
          </div>
          <table className="  divide-y divide-gray-200 border border-collapse table-auto">
            <thead className="bg-gray-50">
              <tr className="border">
                <th
                  scope="col"
                  className="border px-2 py-1 text-left text-gray-500 whitespace-nowrap"
                >
                  #
                </th>
                <th
                  scope="col"
                  className="border px-2 py-1 text-left text-gray-500 whitespace-nowrap"
                >
                  Nickname
                </th>
                {/* <th
                  scope="col"
                  className="border px-2 py-1 text-left text-gray-500 whitespace-nowrap"
                >
                  First name
                </th>
                <th
                  scope="col"
                  className="border px-2 py-1 text-left text-gray-500 whitespace-nowrap"
                >
                  Last name
                </th> */}
                <th
                  scope="col"
                  className="border px-2 py-1 text-left text-gray-500 whitespace-nowrap"
                >
                  Points
                </th>
                <th
                  scope="col"
                  className="border px-2 py-1 text-left text-gray-500 whitespace-nowrap"
                >
                  Avg time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {(leaderBoard as NormalLeaderBoard).question_players.map(
                (player, index) => (
                  <tr
                    key={player.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100`}
                  >
                    <td className="px-2 py-1 whitespace-nowrap border">
                      {index + 1}
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap border">
                      {player.q_player.nickname}
                    </td>
                    {/* <td className="px-2 py-1 whitespace-nowrap border">
                    {player.q_player.first_name}
                  </td>{" "}
                  <td className="px-2 py-1 whitespace-nowrap border">
                    {player.q_player.last_name}
                  </td> */}
                    <td className="px-2 py-1 whitespace-nowrap border">
                      {player.points_earned}
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap border">
                      {typeof player.time_used === "number"
                        ? player.time_used.toFixed(2)
                        : player.time_used}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      ) : leaderBoardType === "PR" &&
        predictiveLeaderBoard[0]?.answers.length ? (
        <div>
          {/* Table */}
          <table className="min-w-full divide-y divide-gray-200 border border-collapse table-auto">
            <thead className="bg-gray-50">
              <tr className="border">
                <th
                  scope="col"
                  className="border px-2 py-1 text-left text-gray-500 whitespace-nowrap"
                >
                  #
                </th>
                <th
                  scope="col"
                  className="border px-2 py-1 text-left text-gray-500 whitespace-nowrap"
                >
                  Nickname
                </th>
                {predictiveLeaderBoard[0]?.answers.map((column) => (
                  <th
                    scope="col"
                    className="border px-2 py-1 text-left text-gray-500 whitespace-nowrap"
                  >
                    {column.question}
                  </th>
                ))}
                <th
                  scope="col"
                  className="border px-2 py-1 text-left text-gray-500 whitespace-nowrap"
                >
                  Score
                </th>
                <th
                  scope="col"
                  className="border px-2 py-1 text-left text-gray-500 whitespace-nowrap"
                >
                  Avg time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {predictiveLeaderBoard &&
                Array.isArray(predictiveLeaderBoard) &&
                predictiveLeaderBoard
                  .sort((a, b) =>
                    a.score && b.score
                      ? a.score - b.score
                      : a.time_used - b.time_used
                  )
                  .map((cols, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-gray-100`}
                    >
                      <td className="px-2 py-1 whitespace-nowrap border">
                        {index + 1}
                      </td>
                      <td className="px-2 py-1 whitespace-nowrap border">
                        {cols.nickname}
                      </td>
                      {cols.answers.map((col) => (
                        <td className="px-2 py-1 whitespace-nowrap border">
                          {col.status === "c" ? (
                            <span className={`px-2 py-1`}>
                              <span>
                                {col.answer}{" "}
                                <span className="text-xs">({col.status})</span>
                              </span>
                            </span>
                          ) : col.status === "w" ? (
                            <span
                              className={`px-2 py-1 ${
                                bargeColorGenerator()["red"]
                              }`}
                            >
                              <span className={``}>
                                <span>
                                  {col.answer}{" "}
                                  <span className="text-xs">
                                    S: {col.status}
                                    <br />
                                    C: {col.answer}
                                  </span>
                                </span>
                              </span>
                            </span>
                          ) : (
                            <span className={`px-2 py-1`}>
                              <span className={``}>
                                <span>
                                  {col.answer}{" "}
                                  <span
                                    className={`text-xs p-1 rounded-full ${
                                      bargeColorGenerator().yellow
                                    }`}
                                  >
                                    {col.status}
                                  </span>
                                </span>
                              </span>
                            </span>
                          )}
                        </td>
                      ))}
                      <td className="px-2 py-1 whitespace-nowrap border text-xs">
                        {cols.score ? (
                          <span
                            className={`px-2 py-1 ${
                              bargeColorGenerator()["green"]
                            } `}
                          >
                            {cols.score}
                          </span>
                        ) : (
                          <span
                            className={`px-2 py-1 ${
                              bargeColorGenerator()["yellow"]
                            } `}
                          >
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="px-2 py-1 whitespace-nowrap border">
                        {cols.time_used}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[40vh]">
          {/* Rest of the JSX when there are no participants */}
          {/* Code omitted for brevity */}
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-semibold text-gray-700">
              No participants yet
            </h1>
            <p className="text-gray-500">
              Participants will appear here once they start playing
            </p>
          </div>
        </div>
      )}
    </main>
  );
}

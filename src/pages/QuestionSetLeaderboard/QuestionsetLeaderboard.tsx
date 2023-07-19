/* eslint-disable @typescript-eslint/no-floating-promises */



export default function QuestionsetLeaderboard() {
    // const getQuestionSetLeaderBoards = async (qsetId: string) => {
    //     const response = (await privateAxios.get(`/quizsets/${qsetId}/leaderboard`)).data
    //     // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    //     return response;
    //   };
    // const { qsetId } = useParams() as { qsetId: string };
    // const baseGravatar =
    //   "https://gravatar.com/avatar/cc8cbfcbd5bc4908182252d212020d52?d=mp";
  
    // const [leaderBoard, setLeaderBoard] =
    //   React.useState<QuizSetLeaderBoardSummaryPayload>(
    //     {} as QuizSetLeaderBoardSummaryPayload
    //   );
    // const [isLoading, setIsLoading] = React.useState<boolean>(false);
  
    // const computeScore = (player: QsetPlayer) => {
    //   if (!player || !player.points || !player.timer) {
    //     return 0;
    //   }
    //   const points = player.points;
    //   const timer = player.timer;
    //   const score = points - timer;
  
    //   return score;
    // };
  
    // const loadLeaderBoard = async () => {
    //   setIsLoading(true);
    //   try {
    //     const data = await getQuestionSetLeaderBoards(qsetId);
    //     const lboard = data as QuizSetLeaderBoardSummaryPayload;
    //     if (lboard.question_players && lboard.question_players.length === 0) {
    //       setLeaderBoard(lboard);
    //       setIsLoading(false);
    //       return;
    //     }
    //     lboard.question_players =
    //       lboard.question_players && Array.isArray(lboard.question_players)
    //         ? lboard.question_players.map((player) => {
    //             player.score = computeScore(player);
    //             player.q_player.profile_pic =
    //               player.q_player.profile_pic ?? baseGravatar;
    //             return player;
    //           })
    //         : [];
    //     lboard.question_players.sort((a, b) => {
    //       return b.score! - a.score!;
    //     });
  
    //     setLeaderBoard(lboard);
    //     setIsLoading(false);
    //   } catch (err) {
    //     setIsLoading(false);
    //     //   addToast("Something went wrong", { appearance: 'error', autoDismiss: true, placement: 'top-right' });
    //   }
    // };
  
    // React.useEffect(() => {
    //   loadLeaderBoard();
    // }, [qsetId]);
  
    // const participantsLength = leaderBoard.question_players
    //   ? leaderBoard.question_players.length
    //   : 0;
  
  return (
    <div>QuestionsetLeaderboard</div>
  )
}

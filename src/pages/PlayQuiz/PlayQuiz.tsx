/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { useEffect, useRef, useState } from "react";

export default function PlayQuiz() {
  const [answer, setAnswer] = useState<string>("");
  const [questionTimer, setQuestionTimer] = useState<number>(getCurrentQuestion?.timer ?? 0);
  const [timeDelay, setTimeDelay] = useState<number>(1000);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const timerId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerId.current) clearInterval(timerId.current);
    };
  }, []);

  useEffect(() => {
    if (getCurrentQuestion) {
      setQuestionTimer(getCurrentQuestion.timer ?? 0);
      startTimer();
    }
  }, [getCurrentQuestion]);

  useEffect(() => {
    if (answer) {
      answerQuestion(
        getCurrentQuestion?.answers.filter((ans) => ans.answer === answer)[0],
        questionTimer
      );
      if (timerId.current) clearInterval(timerId.current);
    }
  }, [answer]);

  const nextQuestion = () => {
    if (
      currentQuestionIndex <
      getCurrentQuestionSet?.questions?.length - 1
    ) {
      moveTonextQuestion();
    } else {
      console.log("end of questions");
    }
  };

  const startTimer = () => {
    if (timerId.current) clearInterval(timerId.current);

    timerId.current = setInterval(() => {
      if (questionTimer <= 0) {
        setQuestionTimer(0);
      } else {
        setQuestionTimer((prevState) => prevState - 1);
      }
      syncCurrentQuestionDuration(
        getCurrentQuestion?.timer - questionTimer
      );
      if (questionTimer === 0 && !getCurrentQuestion?.is_answered) {
        if (timerId.current) clearInterval(timerId.current);
        timeoutQuestion();
        // nextQuestion();
      }
      if (questionTimer === 0 || getCurrentQuestion?.is_answered) {
        if (timerId.current) clearInterval(timerId.current);
        // moveTonextQuestion();
      }
    }, timeDelay as number);
  };

  return (
    <div>PlayQuiz</div>
  )
}

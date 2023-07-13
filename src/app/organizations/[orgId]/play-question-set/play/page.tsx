import { useEffect, useRef, useState } from "react";

const QuizComponent = () => {
  const history = useHistory();
  const quizStore = useQuizStore();
  const [answer, setAnswer] = useState("");
  const [timerId, setTimerId] = useState(null);
  const [questionTimer, setQuestionTimer] = useState(
    quizStore.getCurrentQuestion?.timer ?? 0
  );
  const [timeDelay] = useState(1000);
  const prevAnswer = usePrevious(answer);

  useEffect(() => {
    if (prevAnswer !== answer) {
      const filteredAnswers = quizStore.getCurrentQuestion?.answers.filter(
        (ans) => ans.answer === answer
      );
      const selectedAnswer = filteredAnswers && filteredAnswers[0];
      quizStore.answerQuestion(selectedAnswer, questionTimer);
      clearInterval(timerId);
    }
  }, [answer]);

  useEffect(() => {
    setQuestionTimer(quizStore.getCurrentQuestion?.timer ?? 0);
    startTimer();
  }, [quizStore.getCurrentQuestion]);

  const startTimer = () => {
    let timerId = setInterval(() => {
      let nextTime = questionTimer <= 0 ? 0 : questionTimer - 1;
      setQuestionTimer(nextTime);
      quizStore.syncCurrentQuestionDuration(
        quizStore.getCurrentQuestion?.timer - nextTime
      );
      if (nextTime === 0 && !quizStore.getCurrentQuestion?.is_answered) {
        clearInterval(timerId);
        quizStore.timeoutQuestion();
      }
      if (nextTime === 0 || quizStore.getCurrentQuestion?.is_answered) {
        clearInterval(timerId);
      }
    }, timeDelay);
    setTimerId(timerId);
  };

  const nextQuestion = () => {
    if (
      quizStore.currentQuestionIndex <
      quizStore.getCurrentQuestionSet?.questions.length - 1
    ) {
      quizStore.moveTonextQuestion();
    } else {
      console.log("end of questions");
    }
  };

  const submitQuiz = async () => {
    await quizStore.finishQuiz();
    history.push({
      pathname: "/completed-quiz",
      state: {
        orgId: quizStore.currentOrganization?.uid,
        qsetId: quizStore.currentQuestionSet?.uid,
      },
    });
  };
  return (
    <div className="p-4 border my-4 rounded flex flex-col gap-2">
      <div className="flex justify-between">
        <h1 className="font-bold text-2xl text-blue-700">
          {quizStore.getCurrentQuestionSet?.category_name}
        </h1>
        <div className="flex justify-center items-center">
          <span className="font-bold text-2xl text-blue-700">
            {questionTimer}
          </span>
          <span className="font-bold text-2xl text-blue-700">s</span>
        </div>
        <div>
          <span className="border rounded p-2">
            {quizStore.currentQuestionIndex + 1} of
            {quizStore.getCurrentQuestionSet?.questions?.length} Question
            {quizStore.getCurrentQuestionSet?.questions?.length > 1 ? "s" : ""}
          </span>
        </div>
      </div>
      <hr />
      <h1 className="font-medium text-xl">
        {quizStore.getCurrentQuestion?.question}
      </h1>
      {quizStore.getCurrentQuestion?.image && (
        <div className="w-full h-64 bg-cover bg-center">
          <img
            src={quizStore.getCurrentQuestion?.image}
            className="aspect-auto h-64 bg-cover bg-center"
          />
        </div>
      )}
      {quizStore.getCurrentAnswers &&
        quizStore.getCurrentAnswers.map((option) => (
          <label
            className="flex flex-col gap-2"
            htmlFor="answer"
            key={option.uid}
          >
            <p
              className={`flex gap-2 items-center p-2 rounded ${
                option.is_answer &&
                quizStore.getCurrentQuestion?.is_answered &&
                quizStore.getCurrentQuestion.selected_answer?.answer ===
                  option.answer
                  ? "bg-green-500 text-white"
                  : !option.is_answer &&
                    quizStore.getCurrentQuestion?.is_answered &&
                    quizStore.getCurrentQuestion.selected_answer?.answer ===
                      option.answer
                  ? "bg-red-500 text-white"
                  : ""
              }`}
            >
              <input
                className="border p-2 rounded"
                type="radio"
                name="answer"
                disabled={quizStore.getCurrentQuestion?.is_answered}
                onChange={(e) => setAnswer(e.target.value)}
                value={option.answer}
              />
              {option.answer}
            </p>
          </label>
        ))}
      <div>
        {quizStore.currentQuestionIndex <
        (quizStore.getCurrentQuestionSet?.questions?.length || 0) - 1 ? (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={nextQuestion}
          >
            Next
          </button>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={submitQuiz}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );

  export default QuizComponent;

  // Custom hook to keep track of the previous state
  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
};
{ndaReviewStatus:{$exists:false}}
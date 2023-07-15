import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { QuestionSetInterface } from "@/lib/types";
import moment from "moment";
import { qSetStatus } from "@/lib/qset-status";

type QsetComponentProps = {
  qset: QuestionSetInterface;
  orgId: string;
};

export default function QuestionSetTimerCard({
  qset,
  orgId,
}: QsetComponentProps) {
  const [targetTime, setTargetTime] = useState(moment());
  const [remainingTime, setRemainingTime] = useState(
    moment.duration(targetTime.diff(moment()))
  );

  useEffect(() => {
    setTargetTime(moment(qset.start_datetime));
    const interval = setInterval(() => {
      setRemainingTime(moment.duration(targetTime.diff(moment())));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const progressTime = (type: "start" | "end") => {
    const startTime = moment(qSetStatus.getStartDate(qset));
    const endTime = moment(qSetStatus.getEndDate(qset));
    const rt = moment.duration(
      type === "start" ? startTime.diff(moment()) : endTime.diff(moment())
    );

    const timeLeft = {
      days: Math.floor(Math.abs(rt.days())).toString().padStart(2, "0"),
      hours: Math.floor(Math.abs(rt.hours())).toString().padStart(2, "0"),
      minutes: Math.abs(rt.minutes()).toString().padStart(2, "0"),
      seconds: Math.abs(rt.seconds()).toString().padStart(2, "0"),
    };

    return timeLeft;
  };
  // console.log({orgId, qset: qset.uid});
  

  return (
    <li className="flex flex-col gap-1 p-2">
      <div className="flex justify-between border-b py-2">
        <h1 className="font-bold">{qset.category_name}</h1>
        <div className="whitespace-nowrap">
          {qSetStatus.getStatus(qset) === "not-started" && (
            <span
              className={`${qSetStatus.getBadgeColor(qset)} whitespace-nowrap`}
            >
              {"Not started"}
            </span>
          )}
          {qSetStatus.getStatus(qset) === "in-progress" && (
            <span className={qSetStatus.getBadgeColor(qset)}>
              {"In progress"}
            </span>
          )}
          {qSetStatus.getStatus(qset) === "closed" && <span>{"Closed"}</span>}
        </div>
      </div>

      {qSetStatus.getStatus(qset) === "not-started" && (
        <div className="flex flex-col gap-1">
          <div className="text-center">
            <span className=""> Will open in</span>
            <h1 className="tracking-wider font-mono font-bold text-lg">
              {`${
                Number(progressTime("start").days) > 0 &&
                progressTime("start").days+" days "
              }${progressTime("start").hours}:${
                progressTime("start").minutes
              }:${progressTime("start").seconds}`}
            </h1>
          </div>
        </div>
      )}

      {qSetStatus.getStatus(qset) === "in-progress" && (
        <div className="flex flex-col gap-1">
          <p className="text-center">
            <span className=""> Will close in</span>
            <h1 className="tracking-wider font-mono font-bold text-lg">
              {`${progressTime("end").hours}:${progressTime("end").minutes}:${
                progressTime("end").seconds
              }`}
            </h1>
          </p>
          <div className="flex">
            <Link
              className="text-white bg-green-800 font-medium uppercase w-full text-center px-2 py-1 rounded border"
              to={`/organizations/${orgId}/question-sets/${qset.uid}?`}
            >
              Start Quiz
            </Link>
          </div>
        </div>
      )}

      {qSetStatus.getStatus(qset) === "closed" && (
        <div className="flex flex-col gap-1">
          <h1 className="text-red-500 font-bold text-center py-4 uppercase">
            Quiz Closed
          </h1>
        </div>
      )}

      <div className="w-full flex">
        <Link
          className="text-white bg-primary font-medium capitalize w-full text-center px-2 py-1 rounded border "
          to={`/quizset-leaderboard/${qset.uid}`}
        >
          leaderboard
        </Link>
      </div>
    </li>
  );
}

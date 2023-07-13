"use client";

import React, { useEffect, useState } from "react";

import { OrganizationInterface } from "@/types";
import { qSetStatus } from "@/lib/question-set-status";
import { useOrganizationSelector } from "@/app/storage/stores/organizationStore";
import { useParams } from "next/navigation";

const QuizInformation = () => {
  const quizStore = useOrganizationSelector((state) => state.organizations);
  const { qsetId, orgId } = useParams() as { qsetId: string; orgId: string };

  const [qsetCurrentStatus, setQsetCurrentStatus] = useState<
    ReturnType<typeof qSetStatus.getStatus>
  >({} as ReturnType<typeof qSetStatus.getStatus>);


  useEffect(() => {
    if (quizStore.organizations.length === 0) {

    }

    const currentOrg = quizStore.organizations.find((org) => {
      return org.uid === orgId;
    });

    quizStore.setCurrentOrganization(currentOrg!);
    const currentQset = currentOrg?.question_sets.find(
      (qset) => qset.uid === qsetId
    );
    quizStore.setCurrentQuerySet(currentQset!);
  }, [orgId, qsetId]);

  useEffect(() => {
    const status = qSetStatus.getStatus(quizStore.currentQuestionSet!);
    switch (status) {
      case "not-started":
        setQsetCurrentStatus({ text: "Yet to start", status });
        break;
      case "in-progress":
        setQsetCurrentStatus({ text: "In progress", status });
        break;
      case "closed":
        setQsetCurrentStatus({ text: "Ended", status });
        break;
      default:
        setQsetCurrentStatus({ text: "Yet to start", status: "not-started" });
    }
  }, [quizStore.currentQuestionSet]);

  const startQuiz = () => {
    const questionsToPlay = quizStore.currentQuestionSet?.questions;
    quizStore.loadQuestions(shuffleItems(questionsToPlay!));
    quizStore.setCurreQuestionIndex(0);
    quizStore.syncState();

    history.push({
      pathname: "/play-quiz",
      search: `?orgId=${orgId}&qsetId=${qsetId}`,
      state: { qsetId, orgId },
    });
  };

  const currentQSet = quizStore.currentQuestionSet;

  return (
    <div className="flex flex-col items-center justify-start pt-8 min-h-screen">
      <div
        className="bg-white border p-6 rounded-lg shadow-lg w-1/2"
        v-if={currentQSet}
      >
        <h2 className="text-2xl font-bold mb-4">Quiz Information</h2>
        <div className="mb-4 flex items-center gap-2">
          <label className="font-bold">Title:</label>
          <p className="font-medium text-lg">{currentQSet.category_name}</p>
        </div>
        {/* Additional fields go here... */}
        <div className="mb-4">
          <button
            onClick={startQuiz}
            type="button"
            href="#"
            className="bg-primary text-light px-4 py-2 rounded hover:bg-primary"
            disabled={qsetCurrentStatus.status !== "in-progress"}
            className={
              qsetCurrentStatus.status !== "in-progress"
                ? "opacity-50 cursor-not-allowed"
                : ""
            }
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizInformation;

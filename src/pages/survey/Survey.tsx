// components/SurveyPage.tsx
import React, { useState, useEffect } from "react";
import { surveySchema } from "./surveyData";
import { Question, SurveyAnswer } from "@/lib/types/survey";

const SurveyPage: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [errors, setErrors] = useState<Record<number, string>>({});
  const [currentSection, setCurrentSection] = useState(0);
  const [progress, setProgress] = useState(0);
  const [otherInputs, setOtherInputs] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const questionsMap = new Map(surveySchema.questions.map((q) => [q.id, q]));

  const getQuestionsForSection = (sectionId: string): Question[] => {
    const section = surveySchema.sections.find((s) => s.id === sectionId);
    if (!section) return [];
    return section.questions
      .map((id) => questionsMap.get(id))
      .filter((q): q is Question => q !== undefined);
  };

  const currentSectionData = surveySchema.sections[currentSection];
  const currentQuestions = getQuestionsForSection(currentSectionData.id);

  useEffect(() => {
    const totalQuestions = surveySchema.questions.length;
    const answeredQuestions = Object.keys(answers).length;
    setProgress((answeredQuestions / totalQuestions) * 100);
  }, [answers]);

  const handleAnswerChange = (questionId: number, value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));

    // Clear error for this question
    if (errors[questionId]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[questionId];
        return newErrors;
      });
    }
  };

  const handleOtherInputChange = (questionId: number, value: string) => {
    setOtherInputs((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const validateQuestion = (question: Question, answer: any): boolean => {
    if (question.required) {
      if (answer === undefined || answer === null || answer === "") {
        setErrors((prev) => ({
          ...prev,
          [question.id]: "This question is required",
        }));
        return false;
      }

      if (Array.isArray(answer) && answer.length === 0) {
        setErrors((prev) => ({
          ...prev,
          [question.id]: "Please select at least one option",
        }));
        return false;
      }
    }
    return true;
  };

  const validateSection = (questions: Question[]): boolean => {
    let isValid = true;
    questions.forEach((question) => {
      if (shouldShowQuestion(question)) {
        const answer = answers[question.id];
        if (!validateQuestion(question, answer)) {
          isValid = false;
        }
      }
    });
    return isValid;
  };

  const shouldShowQuestion = (question: Question): boolean => {
    if (question.conditional) {
      const dependentAnswer = answers[question.conditional.dependsOn];
      return question.conditional.condition(dependentAnswer);
    }
    return true;
  };

  const handleNext = () => {
    if (validateSection(currentQuestions)) {
      if (currentSection < surveySchema.sections.length - 1) {
        setCurrentSection(currentSection + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Validate all visible questions
    let isValid = true;
    surveySchema.questions.forEach((question) => {
      if (shouldShowQuestion(question)) {
        if (!validateQuestion(question, answers[question.id])) {
          isValid = false;
        }
      }
    });

    if (!isValid) {
      setIsSubmitting(false);
      return;
    }

    try {
      // Format answers for submission
      const formattedAnswers: SurveyAnswer[] = Object.entries(answers).map(
        ([questionId, value]) => ({
          questionId: parseInt(questionId),
          value: value,
        }),
      );

      // Merge "Other" text inputs into the corresponding answer
      Object.entries(otherInputs).forEach(([questionId, value]) => {
        const id = parseInt(questionId);
        const answer = answers[id];
        if (Array.isArray(answer) && answer.includes("Other")) {
          const entry = formattedAnswers.find((a) => a.questionId === id);
          if (entry) {
            entry.value = { selected: answer, other: value };
          } else {
            formattedAnswers.push({
              questionId: id,
              value: { selected: answer, other: value },
            });
          }
        }
      });

      console.log("Submitting answers:", formattedAnswers);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting survey:", error);
      setErrors((prev) => ({
        ...prev,
        submit: "Failed to submit survey. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderQuestion = (question: Question) => {
    if (!shouldShowQuestion(question)) return null;

    switch (question.type) {
      case "text":
        return renderTextQuestion(question);
      case "number":
        return renderNumberQuestion(question);
      case "choice":
        return renderChoiceQuestion(question);
      case "contact":
        return renderContactQuestion(question);
      default:
        return null;
    }
  };

  const renderTextQuestion = (question: Question) => (
    <div className="space-y-2">
      {question.multiline ? (
        <textarea
          value={answers[question.id] || ""}
          onChange={(e) => handleAnswerChange(question.id, e.target.value)}
          placeholder={question.placeholder}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      ) : (
        <input
          type="text"
          value={answers[question.id] || ""}
          onChange={(e) => handleAnswerChange(question.id, e.target.value)}
          placeholder={question.placeholder}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      )}
    </div>
  );

  const renderNumberQuestion = (question: Question) => (
    <div className="space-y-2">
      <input
        type="number"
        value={answers[question.id] || ""}
        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
        placeholder={question.placeholder}
        min="0"
        max="120"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );

  const renderChoiceQuestion = (question: Question) => {
    const selectedValues =
      answers[question.id] || (question.multiple ? [] : "");

    const handleChoiceChange = (option: string) => {
      if (question.multiple) {
        const newSelection = selectedValues.includes(option)
          ? selectedValues.filter((v: string) => v !== option)
          : [...selectedValues, option];

        // Handle "None" selection
        if (option === "None" && !selectedValues.includes("None")) {
          handleAnswerChange(question.id, ["None"]);
        } else if (option !== "None" && selectedValues.includes("None")) {
          handleAnswerChange(question.id, [option]);
        } else {
          handleAnswerChange(question.id, newSelection);
        }
      } else {
        handleAnswerChange(question.id, option);
      }
    };

    const getLayoutClasses = () => {
      switch (question.layout) {
        case "horizontal":
          return "flex flex-wrap gap-4";
        case "grid":
          return "grid grid-cols-2 md:grid-cols-3 gap-3";
        default:
          return "space-y-2";
      }
    };

    return (
      <div className="space-y-3">
        <div className={getLayoutClasses()}>
          {question.options?.map((option) => (
            <label
              key={option}
              className={`
                flex items-center p-3 border rounded-lg cursor-pointer transition-colors
                ${
                  question.multiple
                    ? selectedValues.includes(option)
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:bg-gray-50"
                    : selectedValues === option
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:bg-gray-50"
                }
              `}
            >
              <input
                type={question.multiple ? "checkbox" : "radio"}
                name={`question-${question.id}`}
                value={option}
                checked={
                  question.multiple
                    ? selectedValues.includes(option)
                    : selectedValues === option
                }
                onChange={() => handleChoiceChange(option)}
                className={`
                  ${question.multiple ? "rounded" : "rounded-full"}
                  w-4 h-4 text-blue-600 focus:ring-blue-500
                `}
              />
              <span className="ml-2 text-gray-700">{option}</span>
            </label>
          ))}
        </div>

        {question.other && selectedValues.includes("Other") && (
          <div className="mt-2">
            <input
              type="text"
              placeholder="Please specify..."
              value={otherInputs[question.id] || ""}
              onChange={(e) =>
                handleOtherInputChange(question.id, e.target.value)
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}
      </div>
    );
  };

  const renderContactQuestion = (question: Question) => (
    <div className="space-y-4">
      {question.fields?.map((field) => (
        <div key={field.name} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
          </label>
          <input
            type={field.type}
            value={answers[question.id]?.[field.name] || ""}
            onChange={(e) => {
              const currentContact = answers[question.id] || {};
              handleAnswerChange(question.id, {
                ...currentContact,
                [field.name]: e.target.value,
              });
            }}
            placeholder={field.placeholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      ))}
    </div>
  );

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
          <p className="text-gray-600 mb-4">
            Your feedback has been submitted successfully. We appreciate your
            time and input!
          </p>

          {/* Quiz Invitation */}
          <div className="mt-6 p-5 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-blue-100">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              🎯 Want to test your rugby knowledge?
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Take our exciting rugby quiz and compete with other fans!
            </p>
            <a
              href="https://www.tisini.co.ke/quiz/RGeUh24Kiz2d"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-md"
            >
              <span>Play Quiz Now</span>
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
            >
              Submit Another Response
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header (sticky) */}
        <div className="sticky top-0 z-10 bg-white rounded-t-xl shadow-sm">
          <div className="px-4 py-3 border-b">
            {/* KRU | Survey Title | Tisini — single row */}
            <div className="flex items-center justify-between gap-4">
              {/* Kenya Rugby Union */}
              <div className="flex items-center space-x-2 shrink-0">
                <div className="w-9 h-9 bg-red-600 rounded-lg flex items-center justify-center shadow-sm">
                  <span className="text-white font-bold text-sm">KRU</span>
                </div>
                <div>
                  <h2 className="text-sm font-bold text-gray-900">
                    Kenya Rugby Union
                  </h2>
                  <p className="text-xs text-gray-500">Event Feedback System</p>
                </div>
              </div>

              {/* Survey Title — centered between KRU and Tisini */}
              <div className="flex flex-col items-center justify-center text-center min-w-0 flex-1 px-2">
                <h1 className="text-lg font-bold text-gray-900 leading-tight">
                  {surveySchema.metadata.title}
                </h1>
                <p className="mt-0.5 text-xs text-gray-600">
                  {surveySchema.metadata.description}
                </p>
              </div>

              {/* Powered by Tisini */}
              <div className="flex items-center space-x-2 shrink-0">
                <span className="text-xs text-gray-400">Powered by</span>
                <div className="flex items-center bg-gray-50 px-2 py-1 rounded-md">
                  <span className="font-bold text-sm text-blue-600">Tisini</span>
                  <span className="ml-1 text-xs text-gray-600">Survey</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress + Section Navigation */}
          <div className="px-4 py-2 border-b space-y-2">
            <div className="flex justify-between items-center text-xs text-gray-600">
              <span className="font-medium">Progress</span>
              <span className="text-red-600 font-semibold">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-red-600 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex space-x-2 overflow-x-auto pt-1">
              {surveySchema.sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => setCurrentSection(index)}
                  className={`
                    px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors
                    ${
                      currentSection === index
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-500 hover:bg-gray-100"
                    }
                  `}
                >
                  {section.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Current Section */}
        <div className="bg-white shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {currentSectionData.title}
          </h2>

          <div className="space-y-8">
            {currentQuestions.map(
              (question) =>
                question &&
                shouldShowQuestion(question) && (
                  <div key={question.id} className="space-y-2">
                    <div className="flex items-start">
                      <label className="block text-sm font-medium text-gray-700">
                        {question.question}
                        {question.required && (
                          <span className="ml-1 text-red-500">*</span>
                        )}
                      </label>
                    </div>

                    {renderQuestion(question)}

                    {errors[question.id] && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors[question.id]}
                      </p>
                    )}
                  </div>
                ),
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentSection === 0}
              className={`
                px-6 py-2 rounded-lg font-medium transition-colors
                ${
                  currentSection === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              `}
            >
              Previous
            </button>

            {currentSection === surveySchema.sections.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Submit Survey"
                )}
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Next Section
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>Version {surveySchema.metadata.version}</p>
        </div>
      </div>
    </div>
  );
};

export default SurveyPage;

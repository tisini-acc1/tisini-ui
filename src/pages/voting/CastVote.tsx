import React, { useState } from "react";
import { ConfirmationModal } from "./modal";
import { Participant, VotingCause } from "@/lib/types/voting";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { castVote } from "@/lib/data/FetchVoting";
import { mergeCastVoteResult } from "@/lib/voting/mergeCastVoteResult";
import useStore from "@/store/store";

type CastVoteProps = {
  votingCause: VotingCause;
  hasVoted: boolean;
  votingActive: boolean;
  canVote: boolean;
  setHasVoted: (hasVoted: boolean) => void;
  votingSessionId: string;
};

export const CastVote = ({
  votingCause,
  hasVoted,
  votingActive,
  canVote,
  setHasVoted,
  votingSessionId,
}: CastVoteProps) => {
  const setVotingCause = useStore((s) => s.setVotingCause);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedParticipant, setSelectedParticipant] =
    useState<Participant | null>(null);

  type CastVoteVars = {
    session: string;
    participant_id: string;
    voting_cause_id: string;
  };

  const { mutate: castVoteMutation, isLoading } = useMutation(
    (vars: CastVoteVars) =>
      castVote(vars.session, vars.participant_id, vars.voting_cause_id),
    {
      onSuccess: (data: unknown) => {
        const current = useStore.getState().votingCause;
        if (!current) return;
        const next = mergeCastVoteResult(current, data, votingSessionId);
        setVotingCause(next);
        toast.success("Vote cast successfully!");
        setHasVoted(true);
        setShowModal(false);
        setSelectedParticipant(null);
      },
      onError: (error: unknown) => {
        console.log("error", error);
        toast.error("Failed to cast vote. Please try again.");
        setShowModal(false);
      },
    },
  );

  const handleVoteClick = (participant: Participant) => {
    if (!canVote) return;
    setSelectedParticipant(participant);
    setShowModal(true);
  };

  const handleConfirmVote = () => {
    if (!selectedParticipant || !votingCause) return;

    castVoteMutation({
      session: votingSessionId,
      participant_id: selectedParticipant.id.toString(),
      voting_cause_id: votingCause.id.toString(),
    });
  };

  const handleCancelVote = () => {
    setShowModal(false);
    setSelectedParticipant(null);
  };

  return (
    <section>
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          {votingCause.reason}
        </h1>
        <p className="text-gray-600">
          Voting Period: {new Date(votingCause.date_from).toLocaleString()} -{" "}
          {new Date(votingCause.date_to).toLocaleString()}
        </p>
        {!votingActive && (
          <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
            {new Date() < new Date(votingCause.date_from)
              ? "Voting Not Started Yet"
              : "Voting Has Ended"}
          </div>
        )}
        {hasVoted && (
          <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            ✓ You have already cast your vote
          </div>
        )}
      </div>

      {/* Participants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {votingCause.participants.map((participant) => {
          const voteCount =
            votingCause.totalVotes.find((v) => v.id === participant.id)
              ?.votes || 0;

          return (
            <div
              key={participant.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-200 hover:shadow-xl flex flex-col"
            >
              {/* Participant Image Placeholder */}
              <div className="h-48 bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center">
                {participant.image_url ? (
                  <img
                    src={participant.image_url}
                    alt={participant.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center text-white">
                    <svg
                      className="w-20 h-20 mx-auto opacity-50"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                    <span className="mt-2 text-sm">No Image</span>
                  </div>
                )}
              </div>

              {/* Participant Info */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800 capitalize">
                    {participant.name.toLowerCase()}
                  </h3>
                  <div className="bg-gray-100 rounded-full px-3 py-1 text-sm font-medium text-gray-700">
                    {voteCount} vote{voteCount !== 1 ? "s" : ""}
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4 flex-1">
                  {participant.description || "No description provided"}
                </p>

                {/* Vote Button */}
                <button
                  onClick={() => handleVoteClick(participant)}
                  disabled={!canVote}
                  className={`
                      w-full py-2.5 rounded-lg font-semibold transition-all duration-200 mt-2
                      ${
                        canVote
                          ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg cursor-pointer"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }
                    `}
                >
                  {hasVoted
                    ? "Already Voted"
                    : `Vote for ${participant.name.split(" ")[0]}`}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showModal}
        participantName={selectedParticipant?.name || ""}
        onConfirm={handleConfirmVote}
        onCancel={handleCancelVote}
        isLoading={isLoading}
      />
    </section>
  );
};

import React from "react";

import type { VotingCause } from "@/lib/types/voting";
import useStore from "@/store/store";

import { getOrCreateVotingSessionId } from "./voteSession";

type CastedVotesProps = {
  /** Optional: pass cause directly; otherwise read from store (after mutation). */
  votingCause?: VotingCause | null;
};

export const CastedVotes = ({
  votingCause: votingCauseProp,
}: CastedVotesProps) => {
  const { votingCause: fromStore } = useStore() as {
    votingCause: VotingCause | null;
  };

  const votingCause = votingCauseProp ?? fromStore;
  const sessionId = getOrCreateVotingSessionId();
  const userParticipated =
    Boolean(votingCause?.vote_owner) && votingCause!.vote_owner === sessionId;

  if (!votingCause) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <p className="text-gray-600">No voting data to display.</p>
      </div>
    );
  }

  const totalBallots = votingCause.totalVotes.reduce(
    (sum, v) => sum + v.votes,
    0,
  );

  const rows = votingCause.participants
    .map((p) => {
      const votes =
        votingCause.totalVotes.find((tv) => tv.id === p.id)?.votes ?? 0;
      const pct =
        totalBallots > 0 ? Math.round((votes / totalBallots) * 1000) / 10 : 0;
      return { participant: p, votes, pct };
    })
    .sort((a, b) => b.votes - a.votes);

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col items-center px-2 sm:px-4">
      <div className="mb-8 w-full text-center">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {votingCause.reason}
        </h1>
        <p className="mt-2 text-sm text-gray-600 sm:text-base">
          {userParticipated
            ? "Thanks for voting. Results are sorted by vote count."
            : "Results sorted by vote count (highest first)."}
        </p>
        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
          {totalBallots} total vote{totalBallots !== 1 ? "s" : ""} recorded
        </p>
      </div>

      <div className="w-full overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-md ring-1 ring-black/5">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[min(100%,520px)] table-fixed border-collapse text-left text-sm">
            <colgroup>
              <col className="w-10 sm:w-12" />
              <col />
              <col className="w-[min(40%,12rem)] sm:w-44" />
              <col className="w-24 sm:w-28" />
            </colgroup>
            <thead>
              <tr className="border-b border-gray-200 bg-gradient-to-r from-slate-50 to-gray-50">
                <th
                  scope="col"
                  className="w-10 px-1.5 py-2.5 text-center text-xs font-semibold text-gray-700 sm:w-12 sm:px-2"
                >
                  #
                </th>
                <th
                  scope="col"
                  className="px-2 py-2.5 font-semibold text-gray-700 sm:px-3"
                >
                  Participant
                </th>
                <th
                  scope="col"
                  className="px-2 py-2.5 font-semibold text-gray-700 sm:px-3"
                >
                  Share
                </th>
                <th
                  scope="col"
                  className="px-3 py-2.5 text-right text-xs font-semibold text-gray-700 sm:px-4"
                >
                  Results
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ participant, votes, pct }, index) => (
                <tr
                  key={participant.id}
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50/80"
                >
                  <td className="w-10 whitespace-nowrap px-1.5 py-2.5 align-middle text-center text-gray-500 sm:w-12 sm:px-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-[10px] font-semibold text-gray-700 sm:h-7 sm:w-7 sm:text-xs">
                      {index + 1}
                    </span>
                  </td>
                  <td className="px-2 py-2.5 align-middle sm:px-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-slate-200 to-slate-300 ring-2 ring-white">
                        {participant.image_url ? (
                          <img
                            src={participant.image_url}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[10px] font-medium text-gray-500">
                            —
                          </div>
                        )}
                      </div>
                      <span className="font-medium capitalize text-gray-900">
                        {participant.name.toLowerCase()}
                      </span>
                    </div>
                  </td>
                  <td className="max-w-[12rem] px-2 py-2.5 align-middle sm:max-w-none sm:px-3">
                    <div className="flex w-full max-w-[11rem] items-center gap-2 sm:max-w-[13rem]">
                      <div className="h-2.5 min-w-0 flex-1 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-blue-600"
                          style={{ width: `${Math.min(pct, 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2.5 text-right align-middle tabular-nums sm:px-4">
                    <span className="font-semibold text-gray-900">{votes}</span>
                    <span className="text-gray-500"> · </span>
                    <span className="text-gray-600">{pct}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

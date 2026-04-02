import type { VotingCause } from "@/lib/types/voting";

/**
 * Normalizes the castvote API response into a full VotingCause.
 * If the API returns a complete cause object, use it; otherwise merge
 * partial fields and set vote_owner to the current session.
 */
export function mergeCastVoteResult(
  previous: VotingCause,
  data: unknown,
  sessionId: string,
): VotingCause {
  if (data && typeof data === "object" && !Array.isArray(data)) {
    const d = data as Record<string, unknown>;
    if (
      typeof d.id === "number" &&
      Array.isArray(d.participants) &&
      Array.isArray(d.totalVotes)
    ) {
      return data as VotingCause;
    }

    return {
      ...previous,
      ...(data as Partial<VotingCause>),
      vote_owner: sessionId,
    };
  }

  return {
    ...previous,
    vote_owner: sessionId,
  };
}

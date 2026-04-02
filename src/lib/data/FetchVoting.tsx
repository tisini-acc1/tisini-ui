import axios from "axios";
import { VotingCause } from "../types/voting";

export const fetchVotingCauses = async () => {
  const url = import.meta.env.VITE_API_SCORES_URL;
  const token = import.meta.env.VITE_API_TOKEN;

  try {
    const res = await axios.post<VotingCause[]>(`${url}?gettoken=${token}`, {
      action: "activevotes",
    });

    return res.data;
  } catch (error: any) {
    throw new Error(`Failed to fetch league scorers, ${error.message}`);
  }
};

export const castVote = async (
  session: string,
  participant_id: string,
  voting_cause_id: string,
) => {
  const url = import.meta.env.VITE_API_SCORES_URL;
  const token = import.meta.env.VITE_API_TOKEN;

  try {
    const res = await axios.post(`${url}?gettoken=${token}`, {
      action: "castvote",
      session: session,
      participant_id: participant_id,
      voting_cause_id: voting_cause_id,
      comments: "",
    });

    return res.data;
  } catch (error: any) {
    throw new Error(`Failed to post vote, ${error.message}`);
  }
};

import axios from "axios";
import { SurveyAnswer } from "../types/survey";

export const submitSurvey = async (data: SurveyAnswer[]): Promise<any> => {
  const url = import.meta.env.VITE_API_SCORES_URL;
  const token = import.meta.env.VITE_API_TOKEN;

  try {
    console.log({
      action: "savesurvey",
      input: data,
    });
    const res = await axios.post(`${url}?gettoken=${token}`, {
      action: "savesurvey",
      input: data,
    });

    // console.log(res);
    return res.data;
  } catch (error: any) {
    throw new Error(`Failed to submit survey, ${error.message}`);
  }
};

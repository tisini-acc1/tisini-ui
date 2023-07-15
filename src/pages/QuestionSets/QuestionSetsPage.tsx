/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { useNavigate, useParams } from "react-router-dom";

import OrganizationQuestionSets from "@/components/OrganizationQuestionSets";
import React from "react";
import { defaultPagination } from "@/lib/constants";
import { privateAxios } from "@/lib/api";
import useAppState from "@/hooks/useAppState";

export default function QuestionSetsPage() {
  const organizationId = useParams<{ organizationId: string }>().organizationId;
  const {
    dispatch,
    questionsets: { questionsets },
  } = useAppState();
  const fetchQuestionsets = async () => {
    dispatch({ type: "question-sets/LOAD_START" });
    try {
      const data = (
        await privateAxios.get(
          `/quiz/organizations/${organizationId}/questionsets/`
        )
      ).data;
      // console.log('QuestionSetsPage.tsx: data: ', data);
      
      dispatch({
        type: "question-sets/LOAD_SUCCESS",
        payload: {
          pagination: { ...defaultPagination },
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          results: data,
        },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "question-sets/LOAD_FAILURE",
        payload: JSON.stringify(error),
      });
    }
  }

  // const orgInfo = React.useMemo(() => {
  //   return organizations.find((org) => org.uid === organizationId);

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    Promise.allSettled([fetchQuestionsets()]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizationId]);
  // console.log({ organization, organizationId });
  const navigate = useNavigate();

  return (
    <div className="">
      <div className=" max-w-7xl mx-auto">
        {/* Header with back button and org image */}
        <div className="flex flex-row justify-between items-center h-fit p-2 my-1">
          <div className="flex flex-row gap-4 items-center">
            <button
              onClick={() => navigate(-1)}
              className="bg-primary text-white rounded-md px-4 text-center"
            >
              Back
            </button>
            <h1 className="text-2xl font-bold">
              {/* {organization?.organization_name} */}
            </h1>
          </div>
          <div>
            {/* <img
              src={organization?.org_logo!}
              alt={organization?.uid}
              width={500}
              height={500}
              className="object-cover h-10 w-full"
            /> */}
          </div>
        </div>
        {/* Organization questionsets */}
        <OrganizationQuestionSets questionSets={questionsets.results} />
      </div>
    </div>
  );
}

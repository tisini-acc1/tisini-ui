/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import * as data from "@/lib/data/organizations";

import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { OrganizationInterface } from "@/lib/types";
import OrganizationQuestionSets from "@/components/OrganizationQuestionSets";
import React from "react";

export default function QuestionSetsPage() {
  const organizationId = useParams<{ organizationId: string }>().organizationId;
  const [organization, setOrganization] =
    React.useState<OrganizationInterface | null>(null);
  // const organization = organizations.find((organization) => organization.uid === organizationId);
  React.useEffect(() => {
    const org = data.default.find((org) => org.uid === organizationId);
    setOrganization(org || null);
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
              {organization?.organization_name}
            </h1>
          </div>
          <div>
            <img
              src={organization?.org_logo!}
              alt={organization?.uid}
              width={500}
              height={500}
              className="object-cover h-10 w-full"
            />
          </div>
        </div>
        {/* Organization questionsets */}
        <OrganizationQuestionSets questionSets={organization?.question_sets!} />
      </div>
    </div>
  );
}

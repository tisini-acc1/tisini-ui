/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  organizationsLoadFailure,
  organizationsLoadStart,
  organizationsLoadSuccess,
} from "@/store/slices/organizations.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import OrganizationCard from "@/components/OrganizationCard";
import React from "react";
import { privateAxios } from "@/lib/api";

export default function Organizationspage() {
  const { organizations } = useAppSelector((state) => state.organizations);
  const dispatch = useAppDispatch();
  const fetchOrganizations = async () => {
    dispatch({ type: "organizations/LOAD_START" });
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      dispatch(organizationsLoadStart());
      const data = (await privateAxios.get("/quiz/organizations/")).data;
      // console.log(data);

      // dispatch({ type: "organizations/LOAD_SUCCESS", payload: data });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      dispatch(organizationsLoadSuccess(data));
    } catch (error: any) {
      console.log(error);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      // dispatch({ type: "organizations/LOAD_FAILURE", payload: error.message });
      dispatch(organizationsLoadFailure(JSON.stringify(error)));
    }
  };
  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    Promise.allSettled([fetchOrganizations()]);
  }, []);
  return (
    <main className="min-h-[50vh]">
      <div className="max-w-7xl mx-auto p-4 w-full">
        {organizations.results.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {organizations.results.map((org) => (
              <OrganizationCard key={org.uid} organization={org} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-4">
              <h1 className="text-2xl font-bold">No organization found</h1>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

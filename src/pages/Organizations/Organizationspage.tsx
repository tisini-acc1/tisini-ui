import OrganizationCard from "@/components/OrganizationCard";
import React from "react";
import  orgsData from "@/lib/data/organizations";
import useAppState from "@/hooks/useAppState";

export default function Organizationspage() {
  const {
    organizations: { organizations, loading, error },
    dispatch,
  } = useAppState();
  const fetchOrganizations = () => {
    dispatch({ type: "organizations/LOAD_START" });
    try {
      dispatch({ type: "organizations/LOAD_SUCCESS", payload: orgsData });
    } catch (error:any) {
      console.log(error);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      dispatch({ type: "organizations/LOAD_FAILURE", payload: error.message });
    }
  };
  React.useEffect(() => {
    fetchOrganizations();
  }, []);
  return (
    <main className="min-h-[50vh]">
      <div className="max-w-7xl mx-auto p-4 w-full">
        {organizations.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {organizations.map((org) => (
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

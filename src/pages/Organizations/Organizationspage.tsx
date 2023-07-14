import * as orgsData from "@/lib/data/organizations";

import OrganizationCard from "@/components/OrganizationCard";
import { OrganizationInterface } from "@/lib/types";
import React from "react";

export default function Organizationspage() {
  const [organizations, setOrganizations] = React.useState<
    OrganizationInterface[]
  >([]);
  React.useEffect(() => {
    setOrganizations(orgsData.default);
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

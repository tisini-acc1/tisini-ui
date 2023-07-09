// "use client";
import { TisiniOrganizationInterface } from "../api/models/organization/organization.interface";
import OrganizationCard from "@/components/OrganizationCard";
import { useSearchParams } from "next/navigation";
import { ApiResult } from "../api/utils/paginator";
import { BASE_URL } from "@/utils/api-service";

type GetOrgProps = {
  page: number;
  limit: number;
};
const getOrganizations = async ({
  limit = 20,
  page = 1,
}: GetOrgProps): Promise<ApiResult<TisiniOrganizationInterface>> => {
  const response = await fetch(
    `${BASE_URL}/organizations?limit=${limit}&page=${page}`
  );
  const data = await response.json();
  return data;
};

export default async function OrganizationsPage() {
  const organizations = await getOrganizations({ limit: 20, page: 1 });
  //   const searchParams = useSearchParams().getAll('name')

  return (
    <main className="min-h-[50vh]">
      <div className="max-w-7xl mx-auto p-4 w-full">
        {organizations.data.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {organizations.data.map(
              (organization: TisiniOrganizationInterface) => (
                <OrganizationCard
                  key={organization.organization_name}
                  organization={organization}
                />
              )
            )}
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

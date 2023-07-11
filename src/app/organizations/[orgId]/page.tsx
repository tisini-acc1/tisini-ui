"use client";
import { OrganizationInterface } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import data from "@/app/data/organizations.data";
import OrganizationQuestionSets from "@/components/OrganizationQuestionSets";

type QuestionSetProps = {
  params: {
    orgId: string;
  };
};
export default function Page({ params }: QuestionSetProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const orgId = params.orgId;

  const organization = data.find((organization) => organization.uid === orgId);
  return (
    <div className="">
      <div className=" max-w-7xl mx-auto">
        {/* Header with back button and org image */}
        <div className="flex flex-row justify-between items-center h-fit p-2 my-1">
          <div className="flex flex-row gap-4 items-center">
            <button
              onClick={() => router.back()}
              className="bg-primary text-white rounded-md px-4 text-center"
            >
              Back
            </button>
            <h1 className="text-2xl font-bold">
              {organization?.organization_name}
            </h1>
          </div>
          <div>
            <Image
              src={organization?.org_logo!}
              alt={organization!.uid}
              width={500}
              height={500}
              className="object-cover h-10 w-full"
            />
          </div>
        </div>
        {/* Organization questionsets */}
        <OrganizationQuestionSets questionSets={organization?.question_sets! as any} />
      </div>
    </div>
  );
}

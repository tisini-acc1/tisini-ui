"use client";
import { TisiniOrganizationInterface } from "@/app/api/models/organization/organization.interface";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type QuestionSetProps = {
  params: {
    orgId: string;
  };
};
export default function Page({params}:QuestionSetProps) {
  const router = useRouter();
  const searchParams = useSearchParams()
  const pathName = usePathname()
  return (
    <div className="border">
      <h1>Question Sets {JSON.stringify(searchParams.getAll('name'))}</h1>
      <h1>Question Sets {JSON.stringify(params)}</h1>
    </div>
  );
}

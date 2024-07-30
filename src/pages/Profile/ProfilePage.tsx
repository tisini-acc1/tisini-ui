import { privateAxios } from "@/lib/api";
import { type UserProfileType } from "@/lib/types/profile";
import React from "react";
import { FluentEmojiHighContrastTelephone } from "@/components/icons";
import { LucideChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface Transaction {
  BusinessShortCode: string;
  FirstName: string;
  MSISDN: string;
  TimeStamp: string;
  TransAmount: string;
  TransID: string;
  TransactionType: string;
  used: string;
}

function ProfilePage() {
  const navigate = useNavigate();
  const joinNonNull = (...args: any[]) => args.filter((str) => !!str).join(" ");
  // const { auth } = useAppSelector((state) => state.persist);
  const [profile, setProfile] = React.useState<UserProfileType>(
    {} as UserProfileType
  );
  const [userTransactions, setUserTransactions] = React.useState<Transaction[]>(
    []
  );

  const fetchUserProfile = React.useCallback(async () => {
    const u_profile = await privateAxios.get(`/users/me`);
    setProfile((prev) => ({
      ...prev,
      ...(u_profile.data as unknown as UserProfileType[])[0],
    }));
  }, []);
  const fetchTransactions = React.useCallback(async () => {
    const trans = await privateAxios.get(`/users/payment_history/`);
    setUserTransactions(trans.data as Transaction[]);
  }, []);

  React.useEffect(() => {
    Promise.all([fetchUserProfile(), fetchTransactions()])
      .then(() => {
        console.log("Success");
      })
      .catch((_) => {
        console.log("Error");
      });
  }, []);
  const image =
    "https://images.unsplash.com/photo-1560785477-d43d2b34e0df?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="grid gap-4 p-4 max-w-7xl mx-auto">
      <div>
        <button
          className="flex items-center hover:underline"
          onClick={() => navigate(-1)}
        >
          <LucideChevronLeft /> Go back
        </button>
      </div>
      <div className="border shadow-sm">
        <div
          className="h-32 bg-cover relative bg-slate-600 bg-blend-overlay bg-center mb-8"
          style={{ backgroundImage: `url(${image})` }}
        >
          {" "}
          <img
            src="https://avatar.iran.liara.run/public"
            className="border-4 border-white w-20 h-20 rounded-full absolute -bottom-10 left-5"
            alt=""
          />
        </div>

        <div className="p-4">
          <h1 className="text-blue-500 hover:underline cursor-pointer">
            @{profile.nickname}
          </h1>
          <div>{joinNonNull(profile.first_name, profile.last_name)}</div>
          <div className="flex items-center gap-2">
            <FluentEmojiHighContrastTelephone scale={3} />
            <span>{profile.phone_number}</span>
          </div>
        </div>
      </div>
      <div className="border shadow-sm p-4">
        <div className="">
          <h1>Transaction history</h1>
        </div>
        <div className="my-2">
          <div className="overflow-x-auto">
            <table className=" bg-white border border-gray-200">
              <thead className="whitespace-nowrap">
                <tr>
                  {/* <th className="px-4 py-2 border-b">Business Short Code</th> */}
                  <th className="px-4 py-2 border-b">First Name</th>
                  <th className="px-4 py-2 border-b">MSISDN</th>
                  <th className="px-4 py-2 border-b">TimeStamp</th>
                  <th className="px-4 py-2 border-b">Trans Amount</th>
                  <th className="px-4 py-2 border-b">Trans ID</th>
                  {/* <th className="px-4 py-2 border-b">Transaction Type</th> */}
                  <th className="px-4 py-2 border-b">Used</th>
                </tr>
              </thead>
              <tbody>
                {userTransactions.map((transaction) => (
                  <tr key={transaction.TransID} className="hover:bg-gray-100 ">
                    {/* <td className="px-4 py-2 border-b">{transaction.BusinessShortCode}</td> */}
                    <td className="px-4 py-2 border-b whitespace-nowrap">
                      {transaction.FirstName}
                    </td>
                    <td className="px-4 py-2 border-b whitespace-nowrap">
                      {transaction.MSISDN}
                    </td>
                    <td className="px-4 py-2 border-b whitespace-nowrap">
                      {transaction.TimeStamp}
                    </td>
                    <td className="px-4 py-2 border-b whitespace-nowrap">
                      {transaction.TransAmount}
                    </td>
                    <td className="px-4 py-2 border-b whitespace-nowrap">
                      {transaction.TransID}
                    </td>
                    {/* <td className="px-4 py-2 border-b whitespace-nowrap">{transaction.TransactionType}</td> */}
                    <td className="px-4 py-2 border-b whitespace-nowrap">
                      {transaction.used}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

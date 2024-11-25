import { cn } from "@/lib/cn";
import React, { useState } from "react";
import { privateAxios } from "@/lib/api";
import { useAppSelector } from "@/store/hooks";
import { ToastContainer } from "react-toastify";
import MainFooter from "@/components/MainFooter";
import MainHeader from "@/components/MainHeader";
import { Transaction } from "../Profile/ProfilePage";

import DepositDialog from "./DepositDialog";
import WithdrawDialog from "./WithdrawDialog";

type CreditScoreType = {
  id: number;
  quiz_player: number;
  credit_rating_weighted_sum: number;
  credit_amount_weighted_sum: string;
  recommendations: string[];
  last_updated: string;
};

export default function WalletPage() {
  const walletOpts = [
    "Account",
    // "Deposit",
    // "Withdraw",
    "Transactions",
  ] as const;
  const [selectedTab, setActiveTab] =
    useState<(typeof walletOpts)[number]>("Account");
  const auth = useAppSelector((state) => state.persist.auth);
  const [balance, setBalance] = useState(0);

  const [isWithDrawOpen, setIsWithdrawOpen] = useState(false);
  const [creditRate, setCreditRate] = useState<CreditScoreType>(
    {} as CreditScoreType
  );
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const fetchBalance = React.useCallback(async () => {
    const feedback = await privateAxios.get<{
      accountbalance: number | string;
    }>("/users/account_balance/");
    setBalance(Number(feedback.data?.accountbalance || 0));
  }, []);
  const fetchCredit = React.useCallback(async () => {
    const feedback = await privateAxios.get<{ results: CreditScoreType[] }>(
      "/users/credit_rate/"
    );
    setCreditRate(feedback.data.results[0]);
  }, []);
  const [userTransactions, setUserTransactions] = React.useState<Transaction[]>(
    []
  );
  const fetchTransactions = React.useCallback(async () => {
    const trans = await privateAxios.get(`/users/payment_history/`);
    setUserTransactions(trans.data as Transaction[]);
  }, []);

  // const flatten =
  React.useEffect(() => {
    fetchBalance();
    fetchTransactions();
    fetchCredit();
  }, []);
  return (
    <div
      className="min-h-screen  bg-cover bg-center bg-no-repeat w-screen bg-primary bg-blend-lighten flex flex-col"
      style={{
        backgroundImage: `url('https://img.freepik.com/free-vector/gradient-smooth-background_23-2148973716.jpg?w=1380&t=st=1722530631~exp=1722531231~hmac=a0202518144745c48c77ff5f51730842143f9e4a461b16d36caca01486816dff')`,
      }}
    >
      <MainHeader />
      <ToastContainer />
      <div className="w-full max-w-7xl mx-auto my-4 p-4">
        <div className="py-5 text-xl px-4 font-catamaran">
          <h1>
            Hi,{" "}
            <span className="text-3xl text-primary">{auth.user?.nickname}</span>{" "}
            welcome back!
          </h1>
        </div>
        <div className="grid gap-2">
          <div>
            <div className="flex gap-4 p-4">
              {walletOpts.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setActiveTab(opt)}
                  className={cn(
                    "border-b border-primary p-4 rounded-xl transition-all ease-linear duration-300",
                    {
                      "bg-lue-600 text-blue-600 border": selectedTab === opt,
                    }
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
            <div>
              {selectedTab === "Account" && (
                <div className="min-h-[60vh] bg-white py-10 px-4 flex flex-col gap-8 shadow-sm rounded bg-opacity-50">
                  <h2 className="text-4xl">
                    KSh.{" "}
                    <span className="text-7xl mt-4">{balance.toFixed(2)}</span>
                  </h2>

                  <div className="py-4 space-x-4">
                    <button
                      onClick={() => setIsDepositOpen(true)}
                      className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Deposit
                    </button>
                    <button
                      onClick={() => setIsWithdrawOpen(true)}
                      className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                      Withdraw
                    </button>
                  </div>
                  {Object.keys(creditRate).length > 0 && (
                    <div className="py-4 border p-4">
                      <h1 className="text-xl font-bold  uppercase mb-4">
                        Tano bora Credit Rating
                      </h1>
                      <div className="grid max-w-xl gap-2 lg:gap-4 grid-cols-1 md:grid-cols-2">
                        <div className="p-4 bg-white border rounded">
                          <h2 className="">Credit rate</h2>

                          <strong className="text-xl font-bold">
                            {creditRate.credit_rating_weighted_sum}
                          </strong>
                        </div>
                        <div className="p-4 bg-white border rounded">
                          <h2 className="">Credit amount</h2>
                          <strong className="font-bold text-xl">
                            {" "}
                            {creditRate.credit_amount_weighted_sum}
                          </strong>
                        </div>
                      </div>
                      {Array.isArray(creditRate.recommendations) && (
                        <div>
                          <h2 className="text-xl font-bold underline uppercase my-2">
                            Recommendations
                          </h2>
                          <ol className="list-disc px-4">
                            {creditRate.recommendations.map((recom) => (
                              <li key={recom}>{recom}</li>
                            ))}
                          </ol>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {selectedTab === "Transactions" && (
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
                            <tr
                              key={transaction.TransID}
                              className="hover:bg-gray-100 "
                            >
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
              )}
            </div>
          </div>

          <WithdrawDialog
            isWithDrawOpen={isWithDrawOpen}
            setIsWithdrawOpen={setIsWithdrawOpen}
          />

          <DepositDialog
            isDepositOpen={isDepositOpen}
            setIsDepositOpen={setIsDepositOpen}
            amnt={0}
          />
        </div>
      </div>
      <MainFooter />
    </div>
  );
}

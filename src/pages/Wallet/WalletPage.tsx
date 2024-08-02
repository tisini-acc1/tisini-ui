import MainFooter from "@/components/MainFooter";
import MainHeader from "@/components/MainHeader";
import { privateAxios } from "@/lib/api";
import { cn } from "@/lib/cn";
import { useAppSelector } from "@/store/hooks";
import React, { Fragment, useState } from "react";
import { Transaction } from "../Profile/ProfilePage";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";

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
  const [, setBalance] = useState(0);

  const [isWithDrawOpen, setIsWithdrawOpen] = useState(false);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const fetchBalance = React.useCallback(async () => {
    const feedback = await privateAxios.get("/users/account_balance/");
    setBalance(feedback.data);
  }, []);
  const [userTransactions, setUserTransactions] = React.useState<Transaction[]>(
    []
  );
  const fetchTransactions = React.useCallback(async () => {
    const trans = await privateAxios.get(`/users/payment_history/`);
    setUserTransactions(trans.data as Transaction[]);
  }, []);

  React.useEffect(() => {
    fetchBalance();
    fetchTransactions();
  }, []);
  return (
    <div
      className="min-h-screen  bg-cover bg-center bg-no-repeat w-screen bg-primary bg-blend-lighten flex flex-col"
      style={{
        backgroundImage: `url('https://img.freepik.com/free-vector/gradient-smooth-background_23-2148973716.jpg?w=1380&t=st=1722530631~exp=1722531231~hmac=a0202518144745c48c77ff5f51730842143f9e4a461b16d36caca01486816dff')`,
      }}
    >
      <MainHeader />
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
                    <span className="text-7xl mt-4">{(330).toFixed(2)}</span>
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
          <Transition appear show={isWithDrawOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-[600000]"
              onClose={() => setIsWithdrawOpen(false)}
            >
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
              </TransitionChild>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-full p-4 text-center">
                  <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <DialogPanel className="w-full min-h-[20rem] max-w-xl p-4 md:p-10 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                      <DialogTitle
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Withdraw amount
                      </DialogTitle>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Your description goes here.
                        </p>
                      </div>

                      <div className="mt-4">
                        <button
                          type="button"
                          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={() => setIsWithdrawOpen(false)}
                        >
                          Close
                        </button>
                      </div>
                    </DialogPanel>
                  </TransitionChild>
                </div>
              </div>
            </Dialog>
          </Transition>
          <Transition appear show={isDepositOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-[600000]"
              onClose={() => setIsDepositOpen(false)}
            >
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
              </TransitionChild>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-full p-4 text-center">
                  <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <DialogPanel className="w-full min-h-[20rem] max-w-xl p-4 md:p-10 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                      <DialogTitle
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Deposit
                      </DialogTitle>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          This action will deposit money to your tisini wallet
                        </p>
                      </div>

                      <div className="mt-4">
                        <button
                          type="button"
                          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={() => setIsDepositOpen(false)}
                        >
                          Close
                        </button>
                      </div>
                    </DialogPanel>
                  </TransitionChild>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      </div>
      <MainFooter />
    </div>
  );
}

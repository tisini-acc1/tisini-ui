import * as yup from "yup";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";

import { cn } from "@/lib/cn";
import { privateAxios } from "@/lib/api";
import { useAppSelector } from "@/store/hooks";
import MainFooter from "@/components/MainFooter";
import MainHeader from "@/components/MainHeader";
import React, { Fragment, useState } from "react";
import { Transaction } from "../Profile/ProfilePage";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";

type CreditScoreType = {
  id: number;
  quiz_player: number;
  credit_rating_weighted_sum: number;
  credit_amount_weighted_sum: string;
  recommendations: string[];
  last_updated: string;
};

const schema = yup
  .object({
    amount: yup
      .string()
      .required("Amount is required")
      .min(1, "Amount must be at least KES 1"),
  })
  .required();

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await (
        await privateAxios.post("/users/withdraw_account/", {
          withdraw_amount: data.amount,
        })
      ).data;

      if (response.code === "1") {
        toast.success(response.details);
        reset({ amount: "" });
      } else {
        toast.error(response.details);
      }

      // console.log(response);
    } catch (error: any) {
      if (error instanceof AxiosError) {
        // eslint-disable-next-line no-unsafe-optional-chaining, @typescript-eslint/no-unsafe-member-access
        toast.error((error.response?.data).detail);
      }
    } finally {
      // setIsLoading(false);
      setIsWithdrawOpen(false);
    }
  });

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
                          Enter amount you wish to Withdraw.
                        </p>
                      </div>

                      <div className="flex flex-col">
                        {/* <label htmlFor="">amount</label> */}
                        <input
                          type="number"
                          id="amount"
                          placeholder="Enter Amount"
                          aria-invalid={errors.amount ? "true" : "false"}
                          autoComplete="tel-national"
                          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-0 focus:ring-primary
                  "
                          {...register("amount", { required: true })}
                        />
                        {errors.amount && (
                          <p className="text-red-500 text-sm">
                            {errors.amount.message}
                          </p>
                        )}
                      </div>

                      <div className="mt-4 flex gap-4">
                        <button
                          type="button"
                          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={() => setIsWithdrawOpen(false)}
                        >
                          Close
                        </button>

                        <button
                          type="button"
                          className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={() => onSubmit()}
                        >
                          Withdraw
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

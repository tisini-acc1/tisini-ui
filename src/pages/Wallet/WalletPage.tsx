import MainFooter from "@/components/MainFooter";
import MainHeader from "@/components/MainHeader";
import { cn } from "@/lib/cn";
import { useAppSelector } from "@/store/hooks";
import React, { useState } from "react";

export default function WalletPage() {
  const walletOpts = [
    "Account",
    "Deposit",
    "Transafer",
    "Transactions",
  ] as const;
  const [selectedTab, setActiveTab] =
    useState<(typeof walletOpts)[number]>("Account");
  const auth = useAppSelector((state) => state.persist.auth);
  return (
    <div
      className="min-h-screen  bg-cover bg-center bg-no-repeat w-screen bg-primary bg-blend-lighten flex flex-col"
      style={{
        backgroundImage: `url('https://img.freepik.com/free-vector/gradient-smooth-background_23-2148973716.jpg?w=1380&t=st=1722530631~exp=1722531231~hmac=a0202518144745c48c77ff5f51730842143f9e4a461b16d36caca01486816dff')`,
      }}
    >
      <MainHeader/>
      <div className="w-full max-w-7xl mx-auto my-4">
        <div className="py-5 text-lg">
          <h1>
            Hi,{" "}
            <span className="text-3xl text-primary">{auth.user?.nickname}</span>{" "}
            welcome back!
          </h1>
        </div>
        <div className="grid lg:grid-cols-2 gap-2">
          <div>
            <div className="flex gap-4 p-4">
              {walletOpts.map((opt) => (
                <button
                  onClick={() => setActiveTab(opt)}
                  className={cn("border border-primary p-4 rounded-xl", {
                    "bg-blue-600 text-white": selectedTab === opt,
                  })}
                >
                  {opt}
                </button>
              ))}
            </div>
            <div>
              {selectedTab === "Account" && (
                <div className="min-h-[60vh] bg-white p-3 shadow-sm rounded bg-opacity-50">
                  <h2 className="text-4xl">
                    KSh. <span className="text-7xl mt-4">330</span>
                  </h2>
                </div>
              )}
              {selectedTab === "Deposit" && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Deposit Funds</h2>
                  <form className="space-y-4">
                    <div>
                      <label className="block mb-1">Amount</label>
                      <input
                        type="number"
                        className="w-full p-2 border rounded-md"
                        placeholder="Enter amount"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                      Deposit
                    </button>
                  </form>
                </div>
              )}
              {selectedTab === "Transafer" && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Transfer Funds</h2>
                  <form className="space-y-4">
                    <div>
                      <label className="block mb-1">Recipient</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        placeholder="Enter recipient"
                      />
                    </div>
                    <div>
                      <label className="block mb-1">Amount</label>
                      <input
                        type="number"
                        className="w-full p-2 border rounded-md"
                        placeholder="Enter amount"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                      Transfer
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
          <div className=" p-4 shadow-sm rounded ">
            <p>Account activity</p>
            <div className="flex flex-col gap-2">
              {Array.from({ length: 5 }).map(() => (
                <div className="flex gap-2 items-center">
                  <div className="border h-8 w-8 rounded-full bg-white"></div>
                  <div>
                    Withdraw -500 for transaction YY
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <MainFooter/>
    </div>
  );
}

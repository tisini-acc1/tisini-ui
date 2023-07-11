"use client";
import { Provider } from "react-redux";
import baseStore from "../stores";

type Props = {
  children: React.ReactNode;
};

export default function BaseProvider({ children }: Props) {
  return <Provider store={baseStore}>{children}</Provider>;
}

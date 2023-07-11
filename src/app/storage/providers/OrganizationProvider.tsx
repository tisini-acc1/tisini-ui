"use client";
import { Provider } from "react-redux";
import organizationStore from "../stores/organizationStore";

type Props = {
  children: React.ReactNode;
};

export default function BaseProvider({ children }: Props) {
  return <Provider store={organizationStore}>{children}</Provider>;
}

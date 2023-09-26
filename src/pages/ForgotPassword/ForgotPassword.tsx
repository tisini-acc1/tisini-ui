/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import * as yup from "yup";



import { AxiosError } from "axios";
import Loader from "@/components/Loader/Loader";
import { NavLink } from "react-router-dom";
import React from "react";
import { SignInUserInterface } from "@/lib/types";
import TisiniValidator from "@/lib/validators/tisini";
import { loginSuccess } from "@/store/slices/auth.slice";
import { Cookie } from "@/lib/services";
import { tisiniAxios } from "@/lib/api";
import { useAppDispatch } from "@/store/hooks";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { GetOtp } from "./GetOtp";
import SubmitPassword from "./SubmitPassword";

const schema = yup
  .object({
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    // email: yup.string().email("Please provide valid email").required(),
    phone_number: yup
      .string()
      .required("Phone number is required")
      .min(10, "Phone number must be at least 10 characters")
      .max(10, "Phone number must be at most 10 characters")
      .matches(TisiniValidator.phoneRegex, {
        message: "Phone number  format is invalid (0(7|1)xxxxxxxx)",
        excludeEmptyString: true,
      }),

    confirm_password: yup
      .string()
      .required("Confirm Password is required")
      .min(6, "Confirm Password must be at least 6 characters")
      .oneOf([yup.ref("password"), ""], "Passwords must match"),
  })
  .required();

// type Props = {
//   setTabs: React.Dispatch<React.SetStateAction<"login" | "register">>;
// };
export default function ForgotPassword() {
  const [currentTab, setCurrentTab] = React.useState<"OTP" | "PASSWORD">("OTP");
  return (
      currentTab === "OTP" ? (
          <GetOtp setCurrentTab={setCurrentTab} />
      ) : (
          <SubmitPassword setCurrentTab={setCurrentTab} />
      )
  );
}

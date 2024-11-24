import * as yup from "yup";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { privateAxios } from "@/lib/api";

type WithdrawProps = {
  setIsWithdrawOpen: (x: boolean) => void;
};

const schema = yup
  .object({
    amount: yup
      .string()
      .required("Amount is required")
      .min(1, "Amount must be at least KES 1"),
  })
  .required();

const WithdrawForm = ({ setIsWithdrawOpen }: WithdrawProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
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

  return (
    <form>
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
          <p className="text-red-500 text-sm">{errors.amount.message}</p>
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
          disabled={isSubmitting}
        >
          {isSubmitting ? "loading..." : "Withdraw"}
        </button>
      </div>
    </form>
  );
};

export default WithdrawForm;

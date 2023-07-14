import { AppStateContext } from "@/store";
import React from "react";

// cb is a callback function that takes in the state and returns a value
// that is used to determine if the state has changed


const useAppState = () => {
  const {
    state: {
      persist: { auth },
      ...props
    },
    dispatch,
  } = React.useContext(AppStateContext);
  return {
    auth,
    dispatch,
    ...props,
  };
};

export default useAppState;

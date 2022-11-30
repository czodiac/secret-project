import axios from "axios";

import { ErrorRes } from "../common/types";

export const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return alert((error.response.data as ErrorRes).detail);
    } else {
      return alert(error.message);
    }
  }
};

export const logAndAlertError = (funcName:string, extraMessage: string | undefined, err: any) => {
  let errMsg = 'Unknown error';
  if (err) {
    errMsg = err;
    if (err.message) {
      errMsg = err.message;
    }
  }
  
  console.log('Error from ' + funcName + ': ' + errMsg);

  if (extraMessage) {
    alert(extraMessage + ' ' + errMsg);
  } else {
    alert(errMsg);
  }
}

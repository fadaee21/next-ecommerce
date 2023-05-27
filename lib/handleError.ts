import { AxiosError } from "axios";
import { ErrorResponse } from "type";

const handleError = (err: AxiosError<ErrorResponse>): string => {
  if (err.response) {
    console.log("Error Response", err.response.data);
    //!below comment show you how to handle specific error
    // if (err.response?.status === 422) {
    //   const errors: string[] = [];
    //   Object.keys(err.response.data?.message).map((key) => {
    //     err.response?.data?.message[key].map((e) => {
    //       errors.push(e);
    //     });
    //   });
    //   return errors.join();
    // }
    const errors: string[] = [];
    Object.keys(err.response.data?.message).map((key) => {
      err.response?.data?.message[key].map((e) => {
        errors.push(e);
      });
    });
    return errors.join();
  } else if (err.request) {
    console.log("Error Request", err.request);
    return err.message;
  } else {
    console.log("Error", err.message);
    return "خطای سرور،دوباره تلاش کنید";
  }
};

export { handleError };

import { AxiosResponse, isAxiosError } from "axios";
import { toast } from "react-toastify";
export default function useAysncRequest() {
  const request = async ({
    promisedRequest,
    errorMessage = "",
    successMessage = "",
  }: {
    promisedRequest: Promise<AxiosResponse<any, any>>;
    errorMessage?: string;
    successMessage?: string;
  }) => {
    try {
      const { data } = await promisedRequest;
      if (successMessage) {
        toast.success(successMessage);
      }
      return data;
    } catch (error) {
      const err = isAxiosError(error)
        ? error.response?.data.message
        : errorMessage || "Some error occured";
      toast.error(err);
      Promise.reject(err);
    }
  };
  return { request };
}

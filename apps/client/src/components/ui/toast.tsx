import { toast } from "react-toastify";

export const errorToast = (message: string) => {
  toast.error(message, { theme: "colored", position: "bottom-left" });
};

export const successToast = (message: string) => {
  toast.success(message, { theme: "colored", position: "bottom-left" });
};

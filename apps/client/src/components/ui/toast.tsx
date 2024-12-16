import { toast } from "react-toastify";

export const errorToast = (message: string) => {
  toast.error(message, { theme: "colored", position: "bottom-left" });
};

export const infoToast = (message: string) => {
  toast.info(message, { theme: "colored", position: "bottom-left" });
};

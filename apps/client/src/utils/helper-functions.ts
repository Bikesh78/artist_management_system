import { errorToast } from "src/components/ui";
import { axiosInstance } from "src/libs/axios-client";

export const handleDownload = async (downloadUrl: string, fileName: string) => {
  try {
    const response = await axiosInstance.get(downloadUrl, {
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(response.data);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    if (err instanceof Error) {
      errorToast(err?.message);
    }
  }
};

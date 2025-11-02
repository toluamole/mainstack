import { createToaster } from "@chakra-ui/react";

const toaster = createToaster({
  placement: "top-end",
});

export const useToast = () => {
  const showError = (message: string, title?: string) => {
    toaster.create({
      title: title || "Error",
      description: message,
      type: "error",
      duration: 5000,
    });
  };

  return {
    showError,
    toaster
  };
};
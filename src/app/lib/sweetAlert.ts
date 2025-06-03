import Swal from "sweetalert2";
import { Messages } from "./config";

const velouraSwal = Swal.mixin({
  background: "#1a1a1a",
  color: "#f5f5dc",
  iconColor: "#d4af37",
  customClass: {
    popup: "veloura-popup",
    title: "veloura-title",
    confirmButton: "veloura-confirm-button",
  },
});

export const sweetErrorHandling = async (err: any) => {
  const error = err.response?.data ?? err;
  const message = error?.message ?? Messages.error1;
  await velouraSwal.fire({
    icon: "error",
    text: message,
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
  });
};

export const sweetTopSuccessAlert = async (
  msg: string,
  duration: number = 2000
) => {
  await velouraSwal.fire({
    position: "center",
    icon: "success",
    title: msg,
    showConfirmButton: false,
    timer: duration,
    timerProgressBar: true,
  });
};

export const sweetTopSmallSuccessAlert = async (
  msg: string,
  duration: number = 2000
) => {
  const Toast = velouraSwal.mixin({
    toast: true,
    position: "center",
    showConfirmButton: false,
    timer: duration,
    timerProgressBar: true,
  });
  Toast.fire({
    icon: "success",
    title: msg,
  });
};

export const sweetFailureProvider = (
  msg: string,
  show_button: boolean = false,
  forward_url: string = ""
) => {
  velouraSwal
    .fire({
      icon: "error",
      title: msg,
      showConfirmButton: show_button,
      confirmButtonText: "OK",
    })
    .then(() => {
      if (forward_url !== "") {
        window.location.replace(forward_url);
      }
    });
};

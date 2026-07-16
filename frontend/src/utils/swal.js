import Swal from "sweetalert2";

const LuxeSwal = Swal.mixin({
  background: "#1d1d1d",
  color: "#ffffff",
  confirmButtonColor: "#D4AF37",
  cancelButtonColor: "#444444",
  customClass: {
    popup: "luxe-swal-popup",
    title: "luxe-swal-title",
    htmlContainer: "luxe-swal-text",
  },
});

export const showAlert = (title, text, icon = "info") => {
  return LuxeSwal.fire({
    title,
    text,
    icon,
    fontFamily: "Georgia, serif",
  });
};

export const showConfirm = async (title, text) => {
  const result = await LuxeSwal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "Cancel",
    fontFamily: "Georgia, serif",
  });
  return result.isConfirmed;
};

export const showToast = (title, icon = "success") => {
  return LuxeSwal.fire({
    title,
    icon,
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
};
export default LuxeSwal;

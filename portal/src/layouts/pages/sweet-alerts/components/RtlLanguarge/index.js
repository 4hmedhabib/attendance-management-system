/**
=========================================================
* Argon Dashboard 2 PRO MUI - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-mui
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// sweetalert2 components
import Swal from "sweetalert2";

// Sweet Alerts page components
import Template from "layouts/pages/sweet-alerts/components/Template";

function RtlLanguarge() {
  const showAlert = () => {
    const newSwal = Swal.mixin({
      customClass: {
        confirmButton: "button button-success",
        cancelButton: "button button-error",
      },
      buttonsStyling: false,
    });

    newSwal.fire({
      title: "هل تريد الاستمرار؟",
      icon: "question",
      iconHtml: "؟",
      confirmButtonText: "نعم",
      cancelButtonText: "لا",
      showCancelButton: true,
      showCloseButton: true,
    });
  };

  return (
    <Template
      title="Right-to-left support for Arabic, Persian, Hebrew, and other RTL languages"
      action={showAlert}
    />
  );
}

export default RtlLanguarge;

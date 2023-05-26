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

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

function OrderSummary() {
  return (
    <>
      <ArgonBox mb={2}>
        <ArgonTypography variant="h6" fontWeight="medium">
          Order Summary
        </ArgonTypography>
      </ArgonBox>
      <ArgonBox display="flex" justifyContent="space-between" mb={0.5}>
        <ArgonTypography variant="button" fontWeight="regular" color="text">
          Product Price:
        </ArgonTypography>
        <ArgonBox ml={1}>
          <ArgonTypography variant="body2" fontWeight="medium">
            $90
          </ArgonTypography>
        </ArgonBox>
      </ArgonBox>
      <ArgonBox display="flex" justifyContent="space-between" mb={0.5}>
        <ArgonTypography variant="button" fontWeight="regular" color="text">
          Delivery:
        </ArgonTypography>
        <ArgonBox ml={1}>
          <ArgonTypography variant="body2" fontWeight="medium">
            $14
          </ArgonTypography>
        </ArgonBox>
      </ArgonBox>
      <ArgonBox display="flex" justifyContent="space-between" mb={0.5}>
        <ArgonTypography variant="button" fontWeight="regular" color="text">
          Taxes:
        </ArgonTypography>
        <ArgonBox ml={1}>
          <ArgonTypography variant="body2" fontWeight="medium">
            $1.95
          </ArgonTypography>
        </ArgonBox>
      </ArgonBox>
      <ArgonBox display="flex" justifyContent="space-between" mt={3}>
        <ArgonTypography variant="body1" fontWeight="light" color="text">
          Total:
        </ArgonTypography>
        <ArgonBox ml={1}>
          <ArgonTypography variant="body1" fontWeight="medium">
            $1.95
          </ArgonTypography>
        </ArgonBox>
      </ArgonBox>
    </>
  );
}

export default OrderSummary;

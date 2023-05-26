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

// Argon Dashboard 2 PRO MUI contexts
import { useArgonController } from "context";

function BillingInformation() {
  const [controller] = useArgonController();
  const { darkMode } = controller;

  return (
    <>
      <ArgonTypography variant="h6" fontWeight="medium">
        Billing Information
      </ArgonTypography>
      <ArgonBox
        component="li"
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        borderRadius="lg"
        p={3}
        mt={2}
        sx={({ palette: { grey, background } }) => ({
          backgroundColor: darkMode ? background.default : grey[100],
        })}
      >
        <ArgonBox width="100%" display="flex" flexDirection="column" lineHeight={1}>
          <ArgonBox mb={2}>
            <ArgonTypography variant="button" fontWeight="medium" textTransform="capitalize">
              Oliver Liam
            </ArgonTypography>
          </ArgonBox>
          <ArgonBox mb={1} lineHeight={0}>
            <ArgonTypography variant="caption" color="text">
              Company Name:&nbsp;&nbsp;&nbsp;
              <ArgonTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                Viking Burrito
              </ArgonTypography>
            </ArgonTypography>
          </ArgonBox>
          <ArgonBox mb={1} lineHeight={0}>
            <ArgonTypography variant="caption" color="text">
              Email Address:&nbsp;&nbsp;&nbsp;
              <ArgonTypography variant="caption" fontWeight="medium">
                oliver@burrito.com
              </ArgonTypography>
            </ArgonTypography>
          </ArgonBox>
          <ArgonTypography variant="caption" color="text">
            VAT Number:&nbsp;&nbsp;&nbsp;
            <ArgonTypography variant="caption" fontWeight="medium">
              FRB1235476
            </ArgonTypography>
          </ArgonTypography>
        </ArgonBox>
      </ArgonBox>
    </>
  );
}

export default BillingInformation;

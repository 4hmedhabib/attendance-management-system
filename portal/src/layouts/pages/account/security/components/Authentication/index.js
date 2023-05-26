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

// @mui material components
import Card from "@mui/material/Card";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";

function Authentication() {
  return (
    <Card>
      <ArgonBox display="flex" justifyContent="space-between" alignItems="centers" pt={2} px={2}>
        <ArgonTypography variant="h6" fontWeight="medium">
          Two factor authentication
        </ArgonTypography>
        <ArgonButton variant="gradient" color="dark" size="small">
          Enable
        </ArgonButton>
      </ArgonBox>
      <ArgonBox p={2}>
        <ArgonBox mt={6} mb={3} lineHeight={0}>
          <ArgonTypography variant="button" fontWeight="regular" color="text">
            Two-factor authentication adds an additional layer of security to your account by
            requiring more than just a password to log in.
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox
          bgColor="dark"
          borderRadius="lg"
          shadow="lg"
          p={2}
          variant="gradient"
          lineHeight={1}
        >
          <ArgonTypography variant="h6" fontWeight="medium" color="white">
            Questions about security?
          </ArgonTypography>
          <ArgonBox mb={3}>
            <ArgonTypography variant="button" fontWeight="regular" color="white">
              Have a question, concern, or comment about security? Please contact us.
            </ArgonTypography>
          </ArgonBox>
          <ArgonButton variant="gradient" color="light">
            Contact Us
          </ArgonButton>
        </ArgonBox>
      </ArgonBox>
    </Card>
  );
}

export default Authentication;

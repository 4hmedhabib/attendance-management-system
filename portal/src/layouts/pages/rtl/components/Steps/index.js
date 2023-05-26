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
import ArgonBadge from "components/ArgonBadge";

function Steps() {
  return (
    <Card>
      <ArgonBox p={3}>
        <ArgonTypography variant="body2" color="text" fontWeight="regular">
          خطوات
        </ArgonTypography>
        <ArgonBox mt={2} mb={1} lineHeight={0}>
          <ArgonTypography variant="h3" fontWeight="bold">
            11.4ك
          </ArgonTypography>
        </ArgonBox>
        <ArgonBadge variant="contained" color="success" badgeContent="+4.3%" container />
      </ArgonBox>
    </Card>
  );
}

export default Steps;

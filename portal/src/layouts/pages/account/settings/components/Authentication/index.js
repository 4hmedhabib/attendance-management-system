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
import Divider from "@mui/material/Divider";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";
import ArgonBadge from "components/ArgonBadge";

// Argon Dashboard 2 PRO MUI contexts
import { useArgonController } from "context";

function Authentication() {
  const [controller] = useArgonController();
  const { darkMode } = controller;

  return (
    <Card id="2fa" sx={{ overflow: "visible" }}>
      <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <ArgonTypography variant="h5">Two-factor authentication</ArgonTypography>
        <ArgonBadge variant="contained" color="success" badgeContent="enabled" container />
      </ArgonBox>
      <ArgonBox p={3}>
        <ArgonBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <ArgonTypography variant="body2" color="text">
            Security keys
          </ArgonTypography>
          <ArgonBox
            display="flex"
            alignItems={{ xs: "flex-start", sm: "center" }}
            flexDirection={{ xs: "column", sm: "row" }}
          >
            <ArgonBox mx={{ xs: 0, sm: 2 }} mb={{ xs: 1, sm: 0 }}>
              <ArgonTypography variant="button" color="text" fontWeight="regular">
                No Security keys
              </ArgonTypography>
            </ArgonBox>
            <ArgonButton variant="outlined" color={darkMode ? "white" : "dark"} size="small">
              Add
            </ArgonButton>
          </ArgonBox>
        </ArgonBox>
        <Divider />
        <ArgonBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <ArgonTypography variant="body2" color="text">
            SMS number
          </ArgonTypography>
          <ArgonBox
            display="flex"
            alignItems={{ xs: "flex-start", sm: "center" }}
            flexDirection={{ xs: "column", sm: "row" }}
          >
            <ArgonBox mx={{ xs: 0, sm: 2 }} mb={{ xs: 1, sm: 0 }}>
              <ArgonTypography variant="button" color="text" fontWeight="regular">
                +3012374423
              </ArgonTypography>
            </ArgonBox>
            <ArgonButton variant="outlined" color={darkMode ? "white" : "dark"} size="small">
              Edit
            </ArgonButton>
          </ArgonBox>
        </ArgonBox>
        <Divider />
        <ArgonBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <ArgonTypography variant="body2" color="text">
            Authenticator app
          </ArgonTypography>
          <ArgonBox
            display="flex"
            alignItems={{ xs: "flex-start", sm: "center" }}
            flexDirection={{ xs: "column", sm: "row" }}
          >
            <ArgonBox mx={{ xs: 0, sm: 2 }} mb={{ xs: 1, sm: 0 }}>
              <ArgonTypography variant="button" color="text" fontWeight="regular">
                Not Configured
              </ArgonTypography>
            </ArgonBox>
            <ArgonButton variant="outlined" color={darkMode ? "white" : "dark"} size="small">
              Set Up
            </ArgonButton>
          </ArgonBox>
        </ArgonBox>
      </ArgonBox>
    </Card>
  );
}

export default Authentication;

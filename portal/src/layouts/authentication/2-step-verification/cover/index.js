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
import Grid from "@mui/material/Grid";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/verification-cover.jpg";

function Cover() {
  return (
    <CoverLayout
      title="Good evening!"
      description="Use these awesome forms to login or create new account in your project for free."
      image={bgImage}
      button={{ color: "warning" }}
    >
      <Card>
        <ArgonBox textAlign="center" p={6}>
          <ArgonBox mb={3} px={1}>
            <ArgonTypography variant="h2" fontWeight="bold">
              2-Step Verification
            </ArgonTypography>
          </ArgonBox>
          <ArgonBox mb={2}>
            <Grid container spacing={2}>
              <Grid item xs>
                <ArgonInput size="large" inputProps={{ maxLength: 1 }} />
              </Grid>
              <Grid item xs>
                <ArgonInput size="large" inputProps={{ maxLength: 1 }} />
              </Grid>
              <Grid item xs>
                <ArgonInput size="large" inputProps={{ maxLength: 1 }} />
              </Grid>
              <Grid item xs>
                <ArgonInput size="large" inputProps={{ maxLength: 1 }} />
              </Grid>
            </Grid>
          </ArgonBox>
          <ArgonBox mb={2}>
            <ArgonButton color="warning" fullWidth>
              Send Code
            </ArgonButton>
          </ArgonBox>
          <ArgonTypography variant="button" color="text" fontWeight="regular">
            Haven&apos;t received it?{" "}
            <ArgonTypography component="a" href="#verification" variant="button">
              Resend a new code
            </ArgonTypography>
            .
          </ArgonTypography>
        </ArgonBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;

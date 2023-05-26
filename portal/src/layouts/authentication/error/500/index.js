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

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";

// Argon Dashboard 2 PRO MUI example components
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";

// Argon Dashboard 2 PRO MUI base styles
import typography from "assets/theme/base/typography";

// Authentication layout components
import Footer from "layouts/authentication/components/Footer";

// Argon Dashboard 2 PRO MUI page layout routes
import pageRoutes from "page.routes";

// Images
const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/error-500.jpg";

function Error500() {
  const { d1, d3, d4, d5 } = typography;

  return (
    <PageLayout white>
      <DefaultNavbar
        routes={pageRoutes}
        action={{
          type: "external",
          route: "https://creative-tim.com/product/argon-dashboard-pro-material-ui",
          label: "Buy Now",
          color: "warning",
          variant: "gradient",
        }}
      />
      <ArgonBox
        minHeight="100vh"
        sx={{
          display: "grid",
          placeItems: "center",
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.warning.main, 0.4),
              rgba(gradients.warning.state, 0.4)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
        }}
      >
        <Grid container justifyContent="center">
          <Grid item xs={12} md={7} lg={6} sx={{ textAlign: "center", mx: "auto" }}>
            <ArgonBox
              color="white"
              fontWeight="bold"
              fontSize={{ xs: d5.fontSize, sm: d4.fontSize, md: d3.fontSize, lg: d1.fontSize }}
              lineHeight={1.2}
              mb={2}
            >
              Error 500
            </ArgonBox>
            <ArgonTypography variant="h2" color="white" fontWeight="bold">
              Something went wrong
            </ArgonTypography>
            <ArgonTypography variant="body1" color="white">
              We suggest you to go to the homepage while we solve this issue.
            </ArgonTypography>
            <ArgonButton variant="gradient" color="warning" sx={{ mt: 5 }}>
              Go to Homepage
            </ArgonButton>
          </Grid>
        </Grid>
      </ArgonBox>
      <Footer />
    </PageLayout>
  );
}

export default Error500;

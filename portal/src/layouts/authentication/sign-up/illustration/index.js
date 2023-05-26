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

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Checkbox from "@mui/material/Checkbox";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

// Authentication layout components
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";

// Images
const bgIamge =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-ill.jpg";

function Illustration() {
  const [agreement, setAgreemnet] = useState(true);

  const handleSetAgremment = () => setAgreemnet(!agreement);

  return (
    <IllustrationLayout
      title="Sign Up"
      description="Enter your email and password to register"
      illustration={{
        image: bgIamge,
        title: "Your journey starts here",
        description:
          "Just as it takes a company to sustain a product, it takes a community to sustain a protocol.",
      }}
    >
      <ArgonBox component="form" role="form">
        <ArgonBox mb={2}>
          <ArgonInput placeholder="Name" size="large" />
        </ArgonBox>
        <ArgonBox mb={2}>
          <ArgonInput type="email" placeholder="Email" size="large" />
        </ArgonBox>
        <ArgonBox mb={2}>
          <ArgonInput type="password" placeholder="Password" size="large" />
        </ArgonBox>
        <ArgonBox display="flex" alignItems="center">
          <Checkbox checked={agreement} onChange={handleSetAgremment} />
          <ArgonTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetAgremment}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;I agree the&nbsp;
          </ArgonTypography>
          <ArgonTypography component="a" href="#" variant="button" fontWeight="bold" textGradient>
            Terms and Conditions
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox mt={4} mb={1}>
          <ArgonButton color="info" size="large" fullWidth>
            Sign up
          </ArgonButton>
        </ArgonBox>
        <ArgonBox mt={3} textAlign="center">
          <ArgonTypography variant="button" color="text" fontWeight="regular">
            Already have an account?&nbsp;
            <ArgonTypography
              component={Link}
              to="/authentication/sign-in/illustration"
              variant="button"
              color="info"
              fontWeight="bold"
            >
              Sign in
            </ArgonTypography>
          </ArgonTypography>
        </ArgonBox>
      </ArgonBox>
    </IllustrationLayout>
  );
}

export default Illustration;

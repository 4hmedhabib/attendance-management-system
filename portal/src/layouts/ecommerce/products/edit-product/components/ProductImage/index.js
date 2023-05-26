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

// Images
const sofa =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/product-page.jpg";

function ProductImage() {
  return (
    <Card sx={{ height: "100%" }}>
      <ArgonBox p={3}>
        <ArgonTypography variant="h5" fontWeight="bold">
          Product Image
        </ArgonTypography>
        <ArgonBox
          component="img"
          src={sofa}
          alt="Product Image"
          borderRadius="lg"
          shadow="lg"
          width="100%"
          my={3}
        />
        <ArgonBox display="flex">
          <ArgonBox mr={1}>
            <ArgonButton variant="gradient" color="info" size="small" sx={{ height: "100%" }}>
              Edit
            </ArgonButton>
          </ArgonBox>
          <ArgonButton variant="outlined" color="dark" size="small">
            Remove
          </ArgonButton>
        </ArgonBox>
      </ArgonBox>
    </Card>
  );
}

export default ProductImage;

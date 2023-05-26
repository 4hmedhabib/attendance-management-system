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
import ArgonDropzone from "components/ArgonDropzone";

function Media() {
  return (
    <ArgonBox>
      <ArgonTypography variant="h5">Media</ArgonTypography>
      <ArgonBox mt={3}>
        <ArgonBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
          <ArgonTypography component="label" variant="caption" fontWeight="bold">
            Product Image
          </ArgonTypography>
        </ArgonBox>
        <ArgonDropzone options={{ addRemoveLinks: true }} />
      </ArgonBox>
    </ArgonBox>
  );
}

export default Media;

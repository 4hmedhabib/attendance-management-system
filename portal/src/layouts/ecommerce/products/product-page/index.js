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

// Argon Dashboard 2 PRO MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// ProductPage page components
import ProductImages from "layouts/ecommerce/products/product-page/components/ProductImages";
import ProductInfo from "layouts/ecommerce/products/product-page/components/ProductInfo";

// Data
import dataTableData from "layouts/ecommerce/products/product-page/data/dataTableData";

function ProductPage() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <Card sx={{ overflow: "visible" }}>
          <ArgonBox p={3}>
            <ArgonBox mb={3}>
              <ArgonTypography variant="h5" fontWeight="medium">
                Product Details
              </ArgonTypography>
            </ArgonBox>

            <Grid container spacing={3}>
              <Grid item xs={12} lg={6} xl={5}>
                <ProductImages />
              </Grid>
              <Grid item xs={12} lg={5} sx={{ mx: "auto" }}>
                <ProductInfo />
              </Grid>
            </Grid>

            <ArgonBox mt={8} mb={2}>
              <ArgonBox mb={1} ml={2}>
                <ArgonTypography variant="h5" fontWeight="medium">
                  Other Products
                </ArgonTypography>
              </ArgonBox>
              <DataTable
                table={dataTableData}
                entriesPerPage={false}
                showTotalEntries={false}
                isSorted={false}
              />
            </ArgonBox>
          </ArgonBox>
        </Card>
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ProductPage;

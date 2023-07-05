

import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonButton from "components/ArgonButton";

// Argon Dashboard 2 PRO MUI example components
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

// Data
import dataTableData from "layouts/pages/faculties/data/dataTableData";

function OrderList() {
  const [menu, setMenu] = useState(null);

  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = () => setMenu(null);



  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox my={3}>
        <ArgonBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <ArgonButton variant="outlined" color="white">
            New Student
          </ArgonButton>

        </ArgonBox>
        <Card>
          <DataTable table={{ columns: dataTableData.columns, rows: [] }} entriesPerPage={false} canSearch />
        </Card>
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default OrderList;

import { useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// FFU ATMS MUI components
import ArgonBox from "components/ArgonBox";

// FFU ATMS MUI example components
import DetailedStatisticsCard from "examples/Cards/StatisticsCards/DetailedStatisticsCard";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import FacultiesList from "examples/Lists/FacultiesList";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "examples/Tables/Table";

// FFU ATMS MUI base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import Slider from "layouts/dashboards/default/components/Slider";

// Data
import Calendar from "examples/Calendar";
import classesTableData from "layouts/dashboards/default/data/classesTableData";
import facultiesListData from "layouts/dashboards/default/data/facultiesListData";

function Default() {
  const { size } = typography;

  useEffect(() => {
    console.log(facultiesListData);
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="Total Faculties"
              count="7"
              icon={{ color: "info", component: <i className="ni ni-hat-3" /> }}
              percentage={{ color: "success", count: "+55%", text: "since last year" }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="Total Classes"
              count="12"
              icon={{ color: "error", component: <i className="ni ni-world" /> }}
              percentage={{ color: "success", count: "+3%", text: "since last week" }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="Total Students"
              count="1,500"
              icon={{ color: "info", component: <i className="ni ni-hat-3" /> }}
              percentage={{ color: "success", count: "+55%", text: "since last year" }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="Total Users"
              count="15"
              icon={{ color: "warning", component: <i className="ni ni-cart" /> }}
              percentage={{ color: "success", count: "+5%", text: "than last month" }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} lg={7}>
            {/* <GradientLineChart
              title="Attandance Overview"
              description={
                <ArgonBox display="flex" alignItems="center">
                  <ArgonBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                    <Icon sx={{ fontWeight: "bold" }}>arrow_upward</Icon>
                  </ArgonBox>
                  <ArgonTypography variant="button" color="text" fontWeight="medium">
                    4% more{" "}
                    <ArgonTypography variant="button" color="text" fontWeight="regular">
                      in 2022
                    </ArgonTypography>
                  </ArgonTypography>
                </ArgonBox>
              }
              chart={gradientLineChartData}
            /> */}
            <Calendar />
          </Grid>
          <Grid item xs={12} lg={5}>
            <Slider />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <ArgonBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={classesTableData.columns} rows={classesTableData.rows} />
            </ArgonBox>
          </Grid>
          <Grid item xs={12} md={4}>
            <FacultiesList title="Faculties" faculties={facultiesListData} />
          </Grid>
        </Grid>
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Default;

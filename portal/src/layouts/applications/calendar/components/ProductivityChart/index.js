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

import { useRef, useEffect, useState, useMemo } from "react";

// react-chartjs-2 components
import { Line } from "react-chartjs-2";

// @mui material components
import Card from "@mui/material/Card";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Icon from "@mui/material/Icon";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 PRO MUI helper functions
import gradientChartLine from "assets/theme/functions/gradientChartLine";

// Chart configurations
import configs from "layouts/applications/calendar/components/ProductivityChart/configs";

// Argon Dashboard 2 PRO MUI base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";

function ProductivityChart() {
  const { white } = colors;
  const { size } = typography;
  const chartRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [chartData, setChartData] = useState({});
  const { data, options } = chartData;

  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(null);

  useEffect(() => {
    const backgroundColor = gradientChartLine(chartRef.current.children[0], white.main, 0.3);

    setChartData(configs(backgroundColor));
  }, [configs]);

  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      keepMounted
    >
      <MenuItem onClick={handleCloseMenu}>Action</MenuItem>
      <MenuItem onClick={handleCloseMenu}>Anoter action</MenuItem>
      <MenuItem onClick={handleCloseMenu}>Something else here</MenuItem>
    </Menu>
  );

  return (
    <Card>
      <ArgonBox bgColor="dark" variant="gradient">
        <ArgonBox p={2}>
          <ArgonBox display="flex" justifyContent="space-between">
            <ArgonBox>
              <ArgonTypography variant="h6" fontWeight="medium" color="white">
                Productivity
              </ArgonTypography>
              <ArgonBox display="flex" alignItems="center">
                <ArgonBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                  <Icon sx={{ fontWeight: "bold" }}>arrow_upward</Icon>
                </ArgonBox>
                <ArgonTypography variant="button" color="white" fontWeight="medium">
                  4% more{" "}
                  <ArgonTypography variant="button" color="white" fontWeight="regular">
                    in 2021
                  </ArgonTypography>
                </ArgonTypography>
              </ArgonBox>
            </ArgonBox>
            <ArgonTypography color="white" onClick={handleOpenMenu}>
              <Icon fontSize="default" sx={{ cursor: "pointer" }}>
                more_horiz
              </Icon>
            </ArgonTypography>
            {renderMenu()}
          </ArgonBox>
        </ArgonBox>
        {useMemo(
          () => (
            <ArgonBox ref={chartRef} sx={{ height: "6.25rem" }}>
              <Line data={data} options={options} />
            </ArgonBox>
          ),
          [chartData]
        )}
      </ArgonBox>
    </Card>
  );
}

export default ProductivityChart;

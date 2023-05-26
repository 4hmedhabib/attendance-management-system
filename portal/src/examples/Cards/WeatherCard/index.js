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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 PRO MUI context
import { useArgonController } from "context";

function WeatherCard({ color, title, weather, icon }) {
  const [controller] = useArgonController();
  const { darkMode } = controller;

  return (
    <Card>
      <ArgonBox
        variant={color === "white" && darkMode ? "contained" : "gradient"}
        bgColor={color === "white" && darkMode ? "transparent" : color}
        p={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8} sx={{ lineHeight: 0 }}>
            <ArgonTypography
              variant="button"
              color={color === "light" || color === "white" ? "dark" : "white"}
              textTransform="capitalize"
              fontWeight="medium"
              opacity={0.7}
            >
              {title}
            </ArgonTypography>
            <ArgonTypography
              variant="h5"
              color={color === "light" || color === "white" ? "dark" : "white"}
              fontWeight="bold"
            >
              {weather.location} - {weather.degree}&deg;C
            </ArgonTypography>
          </Grid>
          <Grid item xs={4}>
            <ArgonBox display="flex" flexDirection="column" alignItems="center">
              <ArgonBox
                component="img"
                src={icon.component}
                width="50%"
                ml="auto"
                alt="weather icon"
              />
              <ArgonBox ml="auto" mr={1}>
                <ArgonTypography
                  variant="h5"
                  color={color === "light" || color === "white" ? "dark" : "white"}
                  textTransform="capitalize"
                >
                  {icon.text}
                </ArgonTypography>
              </ArgonBox>
            </ArgonBox>
          </Grid>
        </Grid>
      </ArgonBox>
    </Card>
  );
}

// Setting default values for the props of WeatherCard
WeatherCard.defaultProps = {
  color: "info",
};

// Typechecking props for the WeatherCard
WeatherCard.propTypes = {
  color: PropTypes.oneOf([
    "transparent",
    "white",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  title: PropTypes.string.isRequired,
  weather: PropTypes.shape({
    location: PropTypes.string.isRequired,
    degree: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  icon: PropTypes.shape({
    text: PropTypes.string.isRequired,
    component: PropTypes.string.isRequired,
  }).isRequired,
};

export default WeatherCard;

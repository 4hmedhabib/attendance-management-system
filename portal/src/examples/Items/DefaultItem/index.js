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

import { forwardRef } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// custom styles for the DefaultItem
import { defaultItemIconBox, defaultItemIcon } from "examples/Items/DefaultItem/styles";

const DefaultItem = forwardRef(({ color, icon, title, description, ...rest }, ref) => (
  <ArgonBox {...rest} ref={ref} display="flex" alignItems="center">
    <ArgonBox sx={(theme) => defaultItemIconBox(theme, { color })}>
      <Icon fontSize="default" sx={(theme) => defaultItemIcon(theme, { color })}>
        {icon}
      </Icon>
    </ArgonBox>
    <ArgonBox ml={2} lineHeight={1}>
      <ArgonTypography display="block" variant="button" fontWeight="medium">
        {title}
      </ArgonTypography>
      <ArgonTypography variant="button" fontWeight="regular" color="text">
        {description}
      </ArgonTypography>
    </ArgonBox>
  </ArgonBox>
));

// Setting default values for the props of DefaultItem
DefaultItem.defaultProps = {
  color: "info",
};

// Typechecking props for the DefaultItem
DefaultItem.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default DefaultItem;

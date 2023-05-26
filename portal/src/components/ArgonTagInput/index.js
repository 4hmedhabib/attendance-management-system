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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-tag-input components
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

// Custom styles for ArgonTagInput
import ArgonTagInputRoot from "components/ArgonTagInput/ArgonTagInputRoot";

// Argon Dashboard 2 PRO MUI context
import { useArgonController } from "context";

const ArgonTagInput = forwardRef(({ size, error, success, ...rest }, ref) => {
  const [controller] = useArgonController();
  const { darkMode } = controller;

  return (
    <ArgonTagInputRoot ownerState={{ size, error, success, darkMode }}>
      <ReactTagInput {...rest} ref={ref} />
    </ArgonTagInputRoot>
  );
});

// Setting default values for the props of ArgonTagInput
ArgonTagInput.defaultProps = {
  size: "medium",
  error: false,
  success: false,
};

// Typechecking props for the ArgonTagInput
ArgonTagInput.propTypes = {
  size: PropTypes.oneOf(["medium", "large"]),
  error: PropTypes.bool,
  success: PropTypes.bool,
};

export default ArgonTagInput;

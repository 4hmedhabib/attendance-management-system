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

// react-flatpickr components
import Flatpickr from "react-flatpickr";

// react-flatpickr styles
import "flatpickr/dist/flatpickr.css";

// Argon Dashboard 2 PRO MUI components
import ArgonInput from "components/ArgonInput";

function ArgonDatePicker({ input, ...rest }) {
  return (
    <Flatpickr
      {...rest}
      render={({ defaultValue }, ref) => (
        <ArgonInput {...input} defaultValue={defaultValue} inputRef={ref} />
      )}
    />
  );
}

// Setting default values for the props of ArgonDatePicker
ArgonDatePicker.defaultProps = {
  input: {},
};

// Typechecking props for the ArgonDatePicker
ArgonDatePicker.propTypes = {
  input: PropTypes.objectOf(PropTypes.any),
};

export default ArgonDatePicker;

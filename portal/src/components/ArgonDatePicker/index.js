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

// Argon Dashboard 2 PRO MUI base styles
import typography from "assets/theme/base/typography";

// Argon Dashboard 2 PRO MUI helper functions
import pxToRem from "assets/theme/functions/pxToRem";

const { size } = typography;

const dialogTitle = {
  styleOverrides: {
    root: {
      padding: pxToRem(16),
      fontSize: size.xl,
    },
  },
};

export default dialogTitle;

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

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonProgress from "components/ArgonProgress";

// Argon Dashboard 2 PRO MUI base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";

function SocialItem({ icon, title, percentage }) {
  const { socialMediaColors } = colors;
  const { size } = typography;

  return (
    <ArgonBox width="100%" py={1} mb={1}>
      <ArgonBox display="flex" justifyContent="space-between" mb={1}>
        <ArgonBox display="flex" alignItems="center" lineHeight={0}>
          <ArgonBox mr={1} color={socialMediaColors[icon.color].main} fontSize={size.lg}>
            {icon.component}
          </ArgonBox>
          <ArgonTypography variant="button" fontWeight="medium" color="text">
            {title}
          </ArgonTypography>
        </ArgonBox>
        <ArgonTypography variant="button" fontWeight="medium" color="text">
          {percentage}%
        </ArgonTypography>
      </ArgonBox>
      <ArgonProgress value={percentage} color="dark" />
    </ArgonBox>
  );
}

// Typechecking props for the SocialItem
SocialItem.propTypes = {
  icon: PropTypes.shape({
    color: PropTypes.oneOf([
      "facebook",
      "twitter",
      "instagram",
      "linkedin",
      "pinterest",
      "youtube",
      "vimeo",
      "slack",
      "dribbble",
      "github",
      "reddit",
      "tumblr",
    ]).isRequired,
    component: PropTypes.node.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  percentage: PropTypes.number.isRequired,
};

export default SocialItem;

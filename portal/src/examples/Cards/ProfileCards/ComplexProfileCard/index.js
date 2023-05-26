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
import Link from "@mui/material/Link";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 PRO MUI base styles
import colors from "assets/theme/base/colors";

function ComplexProfileCard({ image, name, position, description, social }) {
  const { socialMediaColors } = colors;

  // Render the social media icons
  const renderSocial = social.map(({ link, icon, color }, key) => (
    <ArgonBox
      key={color}
      component={Link}
      href={link}
      target="_blank"
      rel="noreferrer"
      fontSize="1.375rem"
      color={socialMediaColors[color].main}
      py={1.5}
      pr={1.5}
      pl={key === 0 ? 0 : 1.5}
      lineHeight={1}
    >
      {icon}
    </ArgonBox>
  ));

  return (
    <ArgonBox width="100%" height="100%" display="flex" alignItems="center">
      <ArgonBox width="40%" height="100%">
        <ArgonBox
          component="img"
          src={image}
          alt={name}
          shadow="lg"
          borderRadius="lg"
          width="100%"
          height="100%"
          sx={{ objectFit: "cover" }}
        />
      </ArgonBox>
      <ArgonBox width="60%" py={2.5} px={4}>
        <ArgonBox mb={1} lineHeight={1}>
          <ArgonTypography variant="h5" fontWeight="bold">
            {name}
          </ArgonTypography>
          <ArgonTypography
            variant="button"
            color="text"
            textTransform="uppercase"
            fontWeight="medium"
          >
            {position}
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox mb={3}>
          <ArgonTypography variant="body2" color="text">
            {description}
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox display="flex">{renderSocial}</ArgonBox>
      </ArgonBox>
    </ArgonBox>
  );
}

// Setting default props for the ComplexProfileCard
ComplexProfileCard.defaultProps = {
  description: "",
  social: [{}],
};

// Typechecking props for the ComplexProfileCard
ComplexProfileCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  description: PropTypes.string,
  social: PropTypes.arrayOf(PropTypes.object),
};

export default ComplexProfileCard;

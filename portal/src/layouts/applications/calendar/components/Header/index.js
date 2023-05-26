// @mui material components
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// FFU ATMS MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonAvatar from "components/ArgonAvatar";
import ArgonButton from "components/ArgonButton";

// Image
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import team5 from "assets/images/team-5.jpg";

function Header() {
  const avatarStyles = {
    border: ({ borders: { borderWidth }, palette: { white } }) =>
      `${borderWidth[2]} solid ${white.main}`,
    cursor: "pointer",
    position: "relative",
    ml: -1.5,

    "&:hover, &:focus": {
      zIndex: "10",
    },
  };

  return (
    <ArgonBox display="flex" alignItems="center">
      <ArgonBox mt={0.5} pr={1}>
        <ArgonBox mb={1} ml={-1.5} lineHeight={0} position="relative">
          <ArgonTypography variant="caption" color="white" fontWeight="medium">
            Team members:
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox display="flex">
          <Tooltip title="Jessica Rowland" placement="top">
            <ArgonAvatar src={team1} alt="team-1" size="sm" sx={avatarStyles} />
          </Tooltip>
          <Tooltip title="Audrey Love" placement="top">
            <ArgonAvatar src={team2} alt="team-1" size="sm" sx={avatarStyles} />
          </Tooltip>
          <Tooltip title="Michael Lewis" placement="top">
            <ArgonAvatar src={team3} alt="team-1" size="sm" sx={avatarStyles} />
          </Tooltip>
          <Tooltip title="Lucia Linda" placement="top">
            <ArgonAvatar src={team4} alt="team-1" size="sm" sx={avatarStyles} />
          </Tooltip>
          <Tooltip title="Ronald Miller" placement="top">
            <ArgonAvatar src={team5} alt="team-1" size="sm" sx={avatarStyles} />
          </Tooltip>
        </ArgonBox>
      </ArgonBox>
      <ArgonBox height="100%" alignSelf="flex-end">
        <Divider orientation="vertical" light />
      </ArgonBox>
      <ArgonBox pl={1}>
        <ArgonButton variant="outlined" color="white" iconOnly>
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
        </ArgonButton>
      </ArgonBox>
    </ArgonBox>
  );
}

export default Header;

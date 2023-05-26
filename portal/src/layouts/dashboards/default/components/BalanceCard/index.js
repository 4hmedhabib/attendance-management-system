// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// FFU ATMS MUI components
import ArgonBox from "components/ArgonBox";
import ArgonButton from "components/ArgonButton";
import ArgonProgress from "components/ArgonProgress";
import ArgonTypography from "components/ArgonTypography";

// Data
const data = [
  { title: "Call with Dave", time: "09:30 AM", checked: true },
  { title: "Brunch Meeting", time: "11:00 AM", checked: false },
  { title: "Argon Dashboard Launch", time: "02:00 PM", checked: false },
  { title: "Winter Hackaton", time: "10:30 AM", checked: true },
];

function BalanceCard() {
  return (
    <Card>
      <ArgonBox variant="gradient" bgColor="dark">
        <ArgonBox p={3}>
          <ArgonBox mb={1}>
            <ArgonBox display="flex" alignItems="center" gap={0.5}>
              <ArgonTypography component="sup" variant="caption" color="white">
                $
              </ArgonTypography>{" "}
              <ArgonTypography component="span" variant="h2" color="white" fontWeight="bold">
                3,300
              </ArgonTypography>
            </ArgonBox>
            <ArgonTypography
              component="div"
              variant="button"
              color="white"
              fontWeight="regular"
              opacity={0.8}
              mt={1}
            >
              Your current balance
            </ArgonTypography>
            <ArgonBox>
              <ArgonTypography component="span" variant="body2" color="success">
                + 15%
              </ArgonTypography>{" "}
              <ArgonTypography component="span" variant="body2" color="white" opacity={0.8}>
                ($250)
              </ArgonTypography>{" "}
            </ArgonBox>
          </ArgonBox>
          <ArgonButton color="white" size="small" fullWidth>
            Add credit
          </ArgonButton>
        </ArgonBox>
        <ArgonBox pb={3} px={3}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <ArgonTypography variant="button" color="white" fontWeight="regular" opacity={0.8}>
                Orders: 60%
              </ArgonTypography>
              <ArgonBox my={1}>
                <ArgonProgress value={60} color="success" />
              </ArgonBox>
            </Grid>
            <Grid item xs={6}>
              <ArgonTypography variant="button" color="white" fontWeight="regular" opacity={0.8}>
                Sales: 40%
              </ArgonTypography>
              <ArgonBox my={1}>
                <ArgonProgress value={40} color="warning" />
              </ArgonBox>
            </Grid>
          </Grid>
        </ArgonBox>
      </ArgonBox>
    </Card>
  );
}

export default BalanceCard;

import { Fragment } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Data
const data = [
  { title: "Call with Dave", time: "09:30 AM", checked: true },
  { title: "Brunch Meeting", time: "11:00 AM", checked: false },
  { title: "Argon Dashboard Launch", time: "02:00 PM", checked: false },
  { title: "Winter Hackaton", time: "10:30 AM", checked: true },
];

function TodoList() {
  return (
    <Card sx={{ height: "100%", overflow: "hidden" }}>
      <ArgonBox p={3}>
        <ArgonTypography variant="h5" textTransform="capitalize">
          To Do List
        </ArgonTypography>
      </ArgonBox>
      <ArgonBox pb={3} px={3} my="auto">
        <ArgonBox
          component="ul"
          display="flex"
          flexDirection="column"
          m={0}
          p={0}
          sx={{ listStyle: "none" }}
        >
          {data.map(({ title, time, checked }, key) => (
            <Fragment key={key}>
              <ArgonBox
                component="li"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                py={1}
              >
                <ArgonBox lineHeight={1}>
                  <ArgonTypography variant="h6">{title}</ArgonTypography>
                  <ArgonTypography variant="caption">{time}</ArgonTypography>
                </ArgonBox>
                <Checkbox defaultChecked={checked} />
              </ArgonBox>
              {key !== data.length - 1 && (
                <ArgonBox
                  component="hr"
                  sx={({ palette: { grey } }) => ({
                    borderTop: `1px solid ${grey[300]}`,
                    borderBottom: 0,
                  })}
                />
              )}
            </Fragment>
          ))}
        </ArgonBox>
      </ArgonBox>
    </Card>
  );
}

export default TodoList;

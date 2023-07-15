import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// @mui material components
import Card from "@mui/material/Card";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonButton from "components/ArgonButton";

// Argon Dashboard 2 PRO MUI example components
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

// Data
import { fetchAPI } from "api/apiClient";
import urls from "constants/urls";
import dataTableData from "layouts/pages/faculties/data/dataTableData";

function OrderList() {
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState([]);
  const [menu, setMenu] = useState(null);

  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = () => setMenu(null);

  useEffect(() => {
    let subscribed = true;

    if (subscribed) {
      try {
        (async () => {
          const notification = toast("fetching data...", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          await fetchAPI("post", urls?.faculties, {
            isMiniView: false,
          })
            .then((res) => {
              setData(res?.data || []);
              setMessage(res?.message);
              notification();
            })
            .catch((err) => {
              console.log(err, "error");
            });
        })();
      } catch (err) {
        console.log(err, "error");
        errors.push(err.message || err);
      }
    }

    () => {
      subscribed = false;
    };
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox my={3}>
        <ArgonBox
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={2}
        >
          <ArgonButton variant="outlined" color="white">
            New Faculty
          </ArgonButton>
        </ArgonBox>
        <Card>
          <DataTable
            table={{ columns: dataTableData.columns, rows: [] }}
            entriesPerPage={false}
            canSearch
          />
        </Card>
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default OrderList;

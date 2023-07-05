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

/* eslint-disable react/prop-types */
// ProductsList page components
import DefaultCell from "layouts/pages/faculties/components/DefaultCell";
import IdCell from "layouts/pages/faculties/components/IdCell";

// Images

const dataTableData = {
  columns: [
    { Header: "id", accessor: "id", Cell: ({ value }) => <IdCell id={value} /> },

    {
      Header: "First name",
      accessor: "firstname",
      Cell: ({ value }) => <DefaultCell value={value[0]} />,
    },
    {
      Header: "Middle name",
      accessor: "middlename",
      Cell: ({ value }) => <DefaultCell value={value} />,
    },
    {
      Header: "Last name",
      accessor: "lastname",
      Cell: ({ value }) => <DefaultCell value={value[1]} />,
    },
    {
      Header: "mobile no",
      accessor: "mobileno",
      Cell: ({ value }) => <DefaultCell value={value} />,
    },
    {
      Header: "created by",
      accessor: "createdby.username",
      Cell: ({ value }) => <DefaultCell value={value} />,
    },
    {
      Header: "register date",
      accessor: "createdat",
      Cell: ({ value }) => <DefaultCell value={value} />,
    },
  ],
};

export default dataTableData;

import "bootstrap/dist/css/bootstrap.min.css";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useMemo, useState } from "react";

//import components
import Breadcrumbs from "../../components/Common/Breadcrumb";

import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import urls from "../../api/urls";
import ResError from "../../components/Common/ResError";
import TableContainer from "../../components/Common/TableContainer";
import useApiCall from "../../hooks/apiHook";

function Student() {
  //meta title
  document.title = "Students | FFU - ATMS";

  const [students, setStudents] = useState([]);

  const {
    data,
    isError,
    isLoading,
    errMsg,
    refetch: studentsRefetch,
  } = useApiCall(
    "STUDENT_LIST",
    urls.students(),
    {
      payload: { isMiniView: false },
    },
    false
  );

  const navigate = useNavigate();

  const handleStudentClicks = () => {
    navigate("create");
  };

  useEffect(() => {
    if (data) {
      setStudents(data.data);
    }
  }, [data]);

  const onRefresh = useCallback(() => {
    studentsRefetch({
      payload: { isMiniView: false },
    });
  }, []);

  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "studentid",
        style: {
          textAlign: "center",
          width: "10%",
          background: "#0000",
        },
        Cell: ({ cell }) => {
          return cell.value;
        },
      },
      {
        Header: "Student ID",
        accessor: "stdid",
        Cell: ({ cell }) => {
          console.log(cell);
          return `${cell?.value?.toUpperCase()}`;
        },
      },
      {
        Header: "First Name",
        accessor: "firstname",
        Cell: ({ cell }) => {
          console.log(cell);
          return `${cell?.value}`;
        },
      },
      {
        Header: "Middle Name",
        accessor: "middlename",
        Cell: ({ cell }) => {
          console.log(cell);
          return `${cell?.value}`;
        },
      },
      {
        Header: "Last Name",
        accessor: "lastname",
        Cell: ({ cell }) => {
          console.log(cell);
          return `${cell?.value}`;
        },
      },
      {
        Header: "Mobile No",
        accessor: "mobileno",
        Cell: ({ cell }) => {
          return cell?.value;
        },
      },
      {
        Header: "Created By",
        accessor: "createdby",
        Cell: ({ cell }) => {
          return `${cell?.value?.firstname} ${cell?.value?.middlename}`;
        },
      },
      {
        Header: "Date",
        accessor: "createdat",
        Cell: ({ cell }) => {
          return dayjs(cell?.value).format("YYYY-MM-DD");
        },
      },
      {
        Header: "View",
        accessor: "stdid",
        id: "Viewstdid",
        disableFilters: true,
        Cell: ({ cell }) => {
          return (
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              onClick={() =>
                navigate("detail", { state: { studentId: cell?.value } })
              }
            >
              View
            </Button>
          );
        },
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Students" breadcrumbItem="Students List" />

          {isError && <ResError error={errMsg} />}

          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={students || []}
                    isGlobalFilter={false}
                    isAddOptions={true}
                    handleClick={handleStudentClicks}
                    customPageSize={50}
                    className="custom-header-css"
                    isLoading={isLoading && !isError}
                    onRefresh={onRefresh}
                    title="Add New Student"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Student;
export { default as CreateStudent } from "./CreateStudent";
export { default as StudentDetail } from "./StudentDetail";

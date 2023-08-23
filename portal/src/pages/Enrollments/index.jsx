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

function Enrollment() {
  //meta title
  document.title = "Enrollments | FFU - ATMS";

  const [enrollments, setEnrollments] = useState([]);

  const {
    data,
    isError,
    isLoading,
    errMsg,
    refetch: enrollmentsRefetch,
  } = useApiCall(
    "ENROLLMENT_LIST",
    urls.enrollments(),
    {
      payload: {
        isMiniView: false,
        filters: {
          studentId: "",
          classId: "",
          courseId: "",
          semesterId: "",
        },
      },
    },
    false
  );

  const navigate = useNavigate();

  const handleEnrollmentClicks = () => {
    navigate("create");
  };

  useEffect(() => {
    if (data) {
      setEnrollments(data.data);
    }
  }, [data]);

  const onRefresh = useCallback(() => {
    enrollmentsRefetch({
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
        accessor: "enrollment_id",
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
        Header: "Enrollment ID",
        accessor: "student.stdid",
        Cell: ({ cell }) => {
          console.log(cell);
          return `${cell?.value?.toUpperCase()}`;
        },
      },
      {
        Header: "Semester",
        accessor: "semester_course.class_semester.semester.semestername",
        Cell: ({ cell }) => {
          console.log(cell);
          return `${cell?.value}`;
        },
      },
      {
        Header: "Class",
        accessor: "semester_course.class_semester.class.classname",
        Cell: ({ cell }) => {
          console.log(cell);
          return `${cell?.value}`;
        },
      },
      {
        Header: "Course",
        accessor: "semester_course.course.coursename",
        Cell: ({ cell }) => {
          console.log(cell);
          return `${cell?.value}`;
        },
      },
      {
        Header: "Teacher",
        accessor: "semester_course.teacher",
        Cell: ({ cell }) => {
          return `${cell?.value?.firstname} ${cell?.value?.middlename}`;
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
        accessor: "enrollmentdate",
        Cell: ({ cell }) => {
          return dayjs(cell?.value).format("YYYY-MM-DD");
        },
      },
      {
        Header: "View",
        accessor: "enrollment_id",
        id: "ViewEnrollmentId",
        disableFilters: true,
        Cell: ({ cell }) => {
          return (
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              onClick={() =>
                navigate("detail", { state: { enrollmentId: cell?.value } })
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
          <Breadcrumbs title="Enrollments" breadcrumbItem="Enrollments List" />

          {isError && <ResError error={errMsg} />}

          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={enrollments || []}
                    isGlobalFilter={false}
                    isAddOptions={true}
                    handleClick={handleEnrollmentClicks}
                    customPageSize={50}
                    className="custom-header-css"
                    isLoading={isLoading && !isError}
                    onRefresh={onRefresh}
                    title="Add New Enrollment"
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

export default Enrollment;
export { default as CreateEnrollment } from "./CreateEnrollment";
export { default as EnrollmentDetail } from "./EnrollmentDetail";

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

function Attendance() {
  //meta title
  document.title = "Attendances | FFU - ATMS";

  const [attendances, setAttendances] = useState([]);

  const {
    data,
    isError,
    isLoading,
    errMsg,
    refetch: attendancesRefetch,
  } = useApiCall(
    "ATTENDANCE_LIST",
    urls.attendances(),
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

  const handleAttendanceClicks = () => {
    navigate("create");
  };

  useEffect(() => {
    if (data) {
      setAttendances(data.data);
    }
  }, [data]);

  const onRefresh = useCallback(() => {
    attendancesRefetch({
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
        accessor: "attendance_id",
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
        Header: "Attendance ID",
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
          return `${cell?.value.firstname} ${cell?.value.middlename}`;
        },
      },
      {
        Header: "Created By",
        accessor: "createdby",
        Cell: ({ cell }) => {
          return `${cell?.value.firstname} ${cell?.value.middlename}`;
        },
      },
      {
        Header: "Date",
        accessor: "attendancedate",
        Cell: ({ cell }) => {
          return dayjs(cell?.value).format("YYYY-MM-DD");
        },
      },
      {
        Header: "View",
        accessor: "attendance_id",
        id: "ViewAttendanceId",
        disableFilters: true,
        Cell: ({ cell }) => {
          return (
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              onClick={() =>
                navigate("detail", { state: { attendanceId: cell?.value } })
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
          <Breadcrumbs title="Attendances" breadcrumbItem="Attendances List" />

          {isError && <ResError error={errMsg} />}

          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={attendances || []}
                    isGlobalFilter={false}
                    isAddOptions={true}
                    handleClick={handleAttendanceClicks}
                    customPageSize={50}
                    className="custom-header-css"
                    isLoading={isLoading && !isError}
                    onRefresh={onRefresh}
                    title="Add New Attendance"
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

export default Attendance;
export { default as CreateAttendance } from "./CreatAttendance";
export { default as AttendanceDetail } from "./AttendanceDetail";

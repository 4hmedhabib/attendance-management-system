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

function Course() {
  //meta title
  document.title = "Courses | FFU - ATMS";

  const [courses, setCourses] = useState([]);

  const {
    data,
    isError,
    isLoading,
    errMsg,
    refetch: coursesRefetch,
  } = useApiCall(
    "COURSE_LIST",
    urls.courses(),
    {
      payload: {
        isMiniView: false,
        filters: {
          semesterSlug: null,
          classSlug: null,
        },
      },
    },
    false
  );

  const navigate = useNavigate();

  const handleCourseClicks = () => {
    navigate("create");
  };

  useEffect(() => {
    if (data) {
      setCourses(data.data);
    }
  }, [data]);

  const onRefresh = useCallback(() => {
    coursesRefetch({
      payload: {
        isMiniView: false,
        filters: {
          semesterSlug: "semester_1",
          classSlug: null,
        },
      },
    });
  }, []);

  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "courseid",
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
        Header: "Course Name",
        accessor: "coursename",
        Cell: ({ cell }) => {
          return cell?.value;
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
        Header: "Semesters",
        accessor: "_count.semesters",
        Cell: ({ cell }) => {
          return cell?.value;
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
        accessor: "courseslug",
        disableFilters: true,
        Cell: ({ cell }) => {
          return (
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              onClick={() =>
                navigate("detail", { state: { courseSlug: cell?.value } })
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
          <Breadcrumbs title="Courses" breadcrumbItem="Courses List" />

          {isError && <ResError error={errMsg} />}

          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={courses || []}
                    isGlobalFilter={false}
                    isAddOptions={true}
                    handleClick={handleCourseClicks}
                    customPageSize={50}
                    className="custom-header-css"
                    isLoading={isLoading && !isError}
                    onRefresh={onRefresh}
                    title="Add New Course"
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

export default Course;
export { default as CourseDetail } from "./CourseDetail";
export { default as CreateCourse } from "./CreateCourse";

import "bootstrap/dist/css/bootstrap.min.css";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useMemo, useState } from "react";

//import components
import Breadcrumbs from "../../components/Common/Breadcrumb";

import { useFormik } from "formik";
import { Form, useNavigate } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  Col,
  Input,
  InputGroup,
  Label,
  Row,
} from "reactstrap";
import urls from "../../api/urls";
import ResError from "../../components/Common/ResError";
import TableContainer from "../../components/Common/TableContainer";
import useApiCall from "../../hooks/apiHook";
import { getSessionsSchema } from "../../validations/";

function Session() {
  //meta title
  document.title = "Sessions | FFU - ATMS";

  const [sessions, setSessions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      studentId: "",
      firstName: "",
      middleName: "",
      lastName: "",
      class: undefined,
      semester: undefined,
      course: undefined,
      teacher: undefined,
    },
    validationSchema: getSessionsSchema,
    onSubmit: async (values) => {
      toast.loading("Please wait a few minutes...", {
        toastId: "getSessions",
      });

      setIsSubmitting(true);
      const payload = {
        data: [
          {
            studentId: values.studentId,
            classId: values.class?.value,
            teacherId: values.teacher?.value,
            courseId: values.course?.value,
            semesterId: values.semester?.value,
          },
        ],
      };

      console.log(payload);
    },
  });

  let { semester, class: _class, course, studentId } = formik.values;

  const {
    data,
    isError,
    isLoading,
    errMsg,
    refetch: sessionsRefetch,
  } = useApiCall(
    "SESSION_LIST",
    urls.sessions(),
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

  const {
    data: classesData,
    isError: classesIsErr,
    isLoading: classesIsLoading,
    refetch: classesRefetch,
  } = useApiCall(
    "SESSIONS_LIST_CLASSES",
    urls.classes(),
    {
      payload: {
        isMiniView: true,
        filters: {
          facultySlug: null,
          shiftSlug: null,
        },
      },
    },
    false
  );

  const {
    data: coursesData,
    isError: coursesIsErr,
    isLoading: coursesIsLoading,
    refetch: coursesRefetch,
  } = useApiCall(
    "SESSIONS_LIST_COURSES",
    urls.courses(),
    {
      payload: {
        isMiniView: true,
        filters: {
          classSlug: _class?.value ?? "",
          semesterSlug: semester?.value ?? "",
        },
      },
    },
    false
  );

  const {
    data: semestersData,
    isError: semestersIsErr,
    isLoading: semestersIsLoading,
    refetch: semestersRefetch,
  } = useApiCall(
    "SESSIONS_LIST_SEMESTER",
    urls.semesters(),
    {
      payload: {
        isMiniView: true,
      },
    },
    false
  );

  const navigate = useNavigate();

  const handleSessionClicks = () => {
    navigate("create");
  };

  useEffect(() => {
    if (data) {
      setSessions(data.data);
    }
  }, [data]);

  const onRefresh = useCallback(() => {
    sessionsRefetch({
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
        accessor: "session_id",
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
        Header: "Session ID",
        accessor: "student.stdid",
        Cell: ({ cell }) => {
          return `${cell?.value?.toUpperCase()}`;
        },
      },
      {
        Header: "Semester",
        accessor: "semester_course.class_semester.semester.semestername",
        Cell: ({ cell }) => {
          return `${cell?.value}`;
        },
      },
      {
        Header: "Class",
        accessor: "semester_course.class_semester.class.classname",
        Cell: ({ cell }) => {
          return `${cell?.value}`;
        },
      },
      {
        Header: "Course",
        accessor: "semester_course.course.coursename",
        Cell: ({ cell }) => {
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
        accessor: "sessiondate",
        Cell: ({ cell }) => {
          return dayjs(cell?.value).format("YYYY-MM-DD");
        },
      },
      {
        Header: "View",
        accessor: "session_id",
        id: "ViewSessionId",
        disableFilters: true,
        Cell: ({ cell }) => {
          return (
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              onClick={() =>
                navigate("detail", { state: { sessionId: cell?.value } })
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
          <Breadcrumbs title="Sessions" breadcrumbItem="Sessions List" />

          {isError && <ResError error={errMsg} />}

          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  {" "}
                  <Form onSubmit={formik.handleSubmit}>
                    <Row>
                      <Col sm="6">
                        <div className="mb-3">
                          <Label className="control-label">Semester</Label>
                          <Select
                            // isLoading={semestersIsLoading}
                            id="semester"
                            name="semester"
                            classNamePrefix="select2-selection"
                            placeholder="Choose..."
                            title="Semester"
                            options={semestersData?.data?.map((semester) => ({
                              label: `${semester?.semestername}`,
                              value: semester?.semesterslug,
                            }))}
                            value={formik.values?.semester}
                            onBlur={formik.handleBlur}
                            onChange={(newValue) => {
                              formik.setFieldValue("semester", newValue);
                            }}
                            isLoading={semestersIsLoading}
                            isDisabled={isSubmitting}
                          />
                          {formik.touched?.semester &&
                          Boolean(formik.errors?.semester) ? (
                            <span semesterName="text-danger">
                              {formik.errors?.semester?.label ||
                                formik.errors?.semester?.value}
                            </span>
                          ) : null}
                        </div>
                      </Col>
                      <Col sm="6">
                        <div className="mb-3">
                          <Label className="control-label">Class</Label>
                          <Select
                            isLoading={classesIsLoading}
                            id="class"
                            name="class"
                            classNamePrefix="select2-selection"
                            placeholder="Choose..."
                            title="Class"
                            options={classesData?.data?.map((_class) => ({
                              label: `${_class?.classname}`,
                              value: _class?.classslug,
                            }))}
                            value={formik.values.class}
                            onBlur={formik.handleBlur}
                            onChange={(newValue) => {
                              formik.setFieldValue("class", newValue);
                            }}
                            isDisabled={isSubmitting}
                          />
                          {formik.touched.class &&
                          Boolean(formik.errors.class) ? (
                            <span className="text-danger">
                              {formik.errors?.class?.label ||
                                formik.errors?.class?.value}
                            </span>
                          ) : null}
                        </div>
                      </Col>
                      <Col sm="6">
                        <div className="mb-3">
                          <Label className="control-label">Course</Label>
                          <InputGroup className="mb-3 d-flex align-items-center">
                            <Select
                              isLoading={coursesIsLoading}
                              id="course"
                              name="course"
                              classNamePrefix="select2-selection"
                              placeholder="Choose..."
                              className="flex-grow-1"
                              title="Course"
                              options={coursesData?.data?.map((course) => ({
                                label: `${course?.coursename}`,
                                value: course?.courseslug,
                              }))}
                              value={formik.values?.course}
                              onBlur={formik.handleBlur}
                              onChange={(newValue) => {
                                formik.setFieldValue("course", newValue);
                              }}
                              isDisabled={isSubmitting}
                            />
                            <div className="input-group-prepend">
                              <button
                                disabled={
                                  isSubmitting ||
                                  coursesIsLoading ||
                                  coursesData?.data?.length <= 0
                                }
                                onClick={getTeacherData}
                                type="button"
                                className="btn btn-primary"
                              >
                                Get Data
                              </button>
                            </div>
                            {formik.touched.class &&
                            Boolean(formik.errors.class) ? (
                              <span className="text-danger">
                                {formik.errors.class?.label ||
                                  formik.errors.class?.value}
                              </span>
                            ) : null}
                          </InputGroup>
                        </div>
                      </Col>
                      <Col sm="6">
                        <div className="mb-3">
                          <Label htmlFor="teacher">Teacher</Label>
                          <Input
                            id="teacher"
                            name="teacher"
                            type="text"
                            className="form-control"
                            placeholder="Teacher"
                            readOnly
                            value={formik.values?.teacher?.label || ""}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            disabled={isSubmitting}
                          />
                          {formik.touched.teacher &&
                          Boolean(formik.errors?.teacher?.label) ? (
                            <span className="text-danger">
                              {formik.errors?.teacher?.label}
                            </span>
                          ) : null}
                        </div>
                      </Col>
                    </Row>
                    <div className="d-flex flex-wrap gap-2">
                      <Button
                        disabled={
                          isSubmitting || Object.keys(formik.errors).length > 0
                        }
                        type="submit"
                        color="primary"
                        className="btn "
                      >
                        {isSubmitting ? <Spinner size={"sm"} /> : "Create"}
                      </Button>
                      <Button
                        type="button"
                        onClick={() => navigate(-1)}
                        color="secondary"
                        className=" "
                        disabled={isSubmitting}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={sessions || []}
                    isGlobalFilter={false}
                    isAddOptions={true}
                    handleClick={handleSessionClicks}
                    customPageSize={50}
                    className="custom-header-css"
                    isLoading={isLoading && !isError}
                    onRefresh={onRefresh}
                    title="Add New Session"
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

export default Session;
export { default as CreateSession } from "./CreateSession";
export { default as SessionDetail } from "./SessionDetail";

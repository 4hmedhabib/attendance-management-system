import React, { useCallback, useEffect, useState } from "react";

import Select from "react-select";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  Label,
  Row,
  Spinner,
} from "reactstrap";

//Import Breadcrumb
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import urls from "../../api/urls";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import useApiCall from "../../hooks/apiHook";
import { createEnrollmentSchema } from "../../validations/enrollments";

const CreateEnrollment = () => {
  //meta title
  document.title = "Create Enrollment | FFU ATMS";

  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGetStudent, setIsGetStudent] = useState(false);

  const { create: createEnrollment } = useApiCall(
    "CREATE_STUDENT",
    urls.createEnrollment(),
    {},
    false
  );

  const {
    data: semestersData,
    isError: semestersIsErr,
    isLoading: semestersIsLoading,
    refetch: semestersRefetch,
  } = useApiCall(
    "SEMESTERS_ATTENDANCE_CREATE",
    urls.semesters(),
    {
      payload: {
        isMiniView: true,
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
    "CLASSES_ATTENDANCE_CREATE",
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
    validationSchema: createEnrollmentSchema,
    onSubmit: async (values) => {
      toast.loading("Please wait a few minutes...", {
        toastId: "createEnrollment",
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

      await createEnrollment({ payload })
        .then((res) => {
          toast.update("createEnrollment", {
            isLoading: false,
            type: "success",
            render: "Successfully Enrollment Created: " + values.firstName,
            autoClose: 3000,
            closeOnClick: true,
          });

          formik.resetForm();
          setIsSubmitting(false);
          navigate("/enrollments/detail", {
            state: { enrollmentId: res?.data?.enrollmentid },
          });
        })
        .catch((err) => {
          toast.update("createEnrollment", {
            isLoading: false,
            type: "error",
            autoClose: 5000,
            render: err.message || err || "Something went wrong!",
            closeOnClick: true,
          });

          setIsSubmitting(false);
        });
    },
  });

  let { semester, class: _class, course, studentId } = formik.values;

  const {
    data: coursesData,
    isError: coursesIsErr,
    isLoading: coursesIsLoading,
    refetch: coursesRefetch,
  } = useApiCall(
    "COURSES_ATTENDANCE_CREATE",
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
    data: studentData,
    isError: studentIsErr,
    isLoading: studentIsLoading,
    errMsg: studentErrMsg,
    refetch: studentRefetch,
  } = useApiCall(
    "STUDENT_DETAIL",
    urls.studentDetail(),
    {
      payload: {
        isMiniView: true,
        studentId: studentId || "",
      },
    },
    false
  );

  const onRefresh = useCallback(() => {
    semestersRefetch({
      payload: { isMiniView: true },
    });

    classesRefetch({
      payload: {
        isMiniView: true,
        filters: {
          facultySlug: null,
          shiftSlug: null,
        },
      },
    });
  }, []);

  useEffect(() => {
    if (semester && _class) {
      coursesRefetch({
        payload: {
          isMiniView: true,
          filters: {
            semesterSlug: semester?.value ?? "",
            classSlug: _class?.value ?? "",
          },
        },
      });
    }
  }, [semester, _class]);

  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  useEffect(() => {
    if (studentData?.data && isGetStudent) {
      formik.setFieldValue("firstName", studentData?.data?.firstname);
      formik.setFieldValue("middleName", studentData?.data?.middlename);
      formik.setFieldValue("lastName", studentData?.data?.lastname);
      setIsGetStudent(false);
    }
  }, [isGetStudent, studentData]);

  const getTeacherData = () => {
    let _course = coursesData?.data?.find(
      (course) => course?.classslug === course?.value
    );

    if (_course && _course.semesters[0]?.teacher) {
      let teacher = {
        label: `${_course?.semesters[0]?.teacher?.firstname} ${_course?.semesters[0]?.teacher?.middlename} ${_course?.semesters[0]?.teacher?.lastname}`,
        value: coursesData?.data?.find(
          (course) => course?.courseslug === formik.values?.course?.value
        )?.semesters[0]?.teacher?.techid,
      };
      formik.setFieldValue("teacher", teacher);
    }
  };

  const getStudentData = () => {
    studentRefetch();
    setIsGetStudent(true);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Enrollments" breadcrumbItem="Create Enrollment" />

          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <CardTitle>Basic Information</CardTitle>
                  <p className="card-title-desc mb-4">
                    Fill all information below
                  </p>

                  <Form onSubmit={formik.handleSubmit}>
                    <Row>
                      <Col sm="6">
                        <Label htmlFor="studentId">Student ID</Label>
                        <InputGroup className="mb-3">
                          <Input
                            id="studentId"
                            name="studentId"
                            type="text"
                            className="form-control"
                            placeholder="Student ID"
                            value={formik.values.studentId}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            disabled={isSubmitting}
                          />
                          <div className="input-group-prepend">
                            <button
                              // disabled={isSubmitting || studentIsLoading}
                              onClick={() => getStudentData()}
                              type="button"
                              className="btn btn-primary"
                            >
                              Get Data
                            </button>
                          </div>
                        </InputGroup>
                      </Col>
                      <Col sm="6">
                        <div className="mb-3">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            type="text"
                            readOnly
                            className="form-control"
                            placeholder="First Name"
                            value={formik.values.firstName}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            disabled={isSubmitting}
                          />
                          {formik.touched.firstName &&
                          Boolean(formik.errors.firstName) ? (
                            <span className="text-danger">
                              {formik.errors.firstName}
                            </span>
                          ) : null}
                        </div>
                      </Col>
                      <Col sm="6">
                        <div className="mb-3">
                          <Label htmlFor="firstName">Middle Name</Label>
                          <Input
                            id="middleName"
                            name="middleName"
                            type="text"
                            className="form-control"
                            placeholder="Middle Name"
                            readOnly
                            value={formik.values.middleName}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            disabled={isSubmitting}
                          />
                          {formik.touched?.middleName &&
                          Boolean(formik.errors?.middleName) ? (
                            <span className="text-danger">
                              {formik.errors?.middleName}
                            </span>
                          ) : null}
                        </div>
                      </Col>
                      <Col sm="6">
                        <div className="mb-3">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            type="text"
                            className="form-control"
                            placeholder="Last Name"
                            readOnly
                            value={formik.values.lastName}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            disabled={isSubmitting}
                          />
                          {formik.touched?.lastName &&
                          Boolean(formik.errors?.lastName) ? (
                            <span className="text-danger">
                              {formik.errors?.lastName}
                            </span>
                          ) : null}
                        </div>
                      </Col>
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
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CreateEnrollment;

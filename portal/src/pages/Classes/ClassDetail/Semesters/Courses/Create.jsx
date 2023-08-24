import React, { useCallback, useEffect, useState } from "react";

import Select from "react-select";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import slugify from "slugify";

//Import Breadcrumb
import { FieldArray, Formik, Form, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import urls from "../../../../../api/urls";

import useApiCall from "../../../../../hooks/apiHook";
import {
  createClassSemesterCoursesSchema,
  createClassSemesterSchema,
} from "../../../../../validations";
import ResError from "../../../../../components/Common/ResError";

//Date Picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateSemester = ({
  onShowCreateSemesterCourse,
  selectedSemester,
  oldCourses,
}) => {
  //meta title
  document.title = "Create Class | FFU ATMS";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState(null);

  const {
    data: coursesData,
    isError: coursesIsErr,
    isLoading: coursesIsLoading,
    refetch: coursesRefetch,
  } = useApiCall(
    "SEMESTER_COURSES_CREATE",
    urls.courses(),
    {
      payload: {
        isMiniView: true,
        filters: {
          semesterSlug: null,
          classSlug: null,
        },
      },
    },
    false
  );

  const {
    data: teachersData,
    isError: teachersIsErr,
    isLoading: teachersIsLoading,
    refetch: teachersRefetch,
  } = useApiCall(
    "SEMESTER_TEACHERS_CREATE",
    urls.teachers(),
    {
      payload: {
        isMiniView: true,
      },
    },
    false
  );

  const onRefresh = useCallback(() => {
    coursesRefetch({
      payload: { isMiniView: true },
    });
    teachersRefetch({
      payload: { isMiniView: true },
    });
  }, []);

  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  const { create: createSemesterCourses } = useApiCall(
    "CREATE_SEMESTER",
    urls.createClassSemesterCourses(),
    {},
    false
  );

  return (
    <React.Fragment>
      <Container fluid>
        {errors && <ResError error={errors} />}

        <Row>
          <Col xs="12">
            <Card>
              <CardBody>
                <CardTitle>Add Semester Course</CardTitle>

                <Formik
                  initialValues={{
                    className: selectedSemester?.class?.classname,
                    semester: selectedSemester?.semester?.semestername,
                    courses: [],
                  }}
                  validationSchema={createClassSemesterCoursesSchema}
                  onSubmit={async (values, { resetForm }) => {
                    toast.loading("Please wait a few minutes...", {
                      toastId: "createSemesterCourses",
                    });

                    setIsSubmitting(true);
                    const payload = {
                      classSlug: selectedSemester?.class?.classslug,
                      semesterSlug: selectedSemester?.semester?.semesterslug,
                      courses: values?.courses?.map((course) => ({
                        courseSlug: course?.course?.value,
                        teacherId: course?.teacher?.value,
                      })),
                    };

                    await createSemesterCourses({ payload })
                      .then((res) => {
                        toast.update("createSemesterCourses", {
                          isLoading: false,
                          type: "success",
                          render:
                            "Successfully Courses Added: " +
                            values.semester.value,
                          autoClose: 3000,
                          closeOnClick: true,
                        });

                        setIsSubmitting(false);
                        onShowCreateSemesterCourse(false);
                        resetForm();
                      })
                      .catch((err) => {
                        toast.update("createSemesterCourses", {
                          isLoading: false,
                          type: "error",
                          autoClose: 5000,
                          render: err?.message || "Something went wrong!",
                          closeOnClick: true,
                        });
                        setErrors(err?.response?.data?.message || err?.message);
                        setIsSubmitting(false);
                      });
                  }}
                >
                  {({
                    values,
                    handleChange,
                    handleBlur,
                    isValid,
                    errors,
                    touched,
                    setFieldValue,
                  }) => {
                    return (
                      <Form>
                        {errors && typeof errors?.courses === "string" && (
                          <div className="my-3">
                            <ResError error={errors?.courses} />{" "}
                          </div>
                        )}

                        <Row>
                          <Col sm="6">
                            <div className="mb-3">
                              <Label htmlFor="className">Class</Label>
                              <Input
                                id="className"
                                name="className"
                                type="text"
                                className="form-control"
                                placeholder="Class Name"
                                value={values.className}
                                disabled={isSubmitting}
                                readOnly
                              />
                            </div>
                          </Col>

                          <Col sm="6">
                            <div className="mb-3">
                              <Label htmlFor="className">Semester</Label>
                              <Input
                                id="semesterName"
                                name="semesterName"
                                type="text"
                                className="form-control"
                                placeholder="Semester Name"
                                value={values.semester}
                                disabled={isSubmitting}
                                readOnly
                              />
                            </div>
                          </Col>
                        </Row>

                        <FieldArray name="courses">
                          {({ remove, push }) => (
                            <div className="bg-light py-2 rounded m-2 px-3 gap-3">
                              {values?.courses?.map((_course, idx) => (
                                <Row
                                  key={idx}
                                  className="d-flex justify-content-center align-items-center"
                                >
                                  <Col sm="5">
                                    <div className="mb-3">
                                      <Label className="control-label">
                                        Course
                                      </Label>
                                      <Select
                                        isLoading={coursesIsLoading}
                                        id={`courses[${idx}].course`}
                                        name={`courses[${idx}].course`}
                                        classNamePrefix="select2-selection"
                                        placeholder="Choose..."
                                        title="Class Shift"
                                        options={coursesData?.data
                                          ?.filter(
                                            (course) =>
                                              !oldCourses?.find(
                                                (_course) =>
                                                  _course.courseslug ===
                                                  course.courseslug
                                              )
                                          )
                                          .filter(
                                            (course) =>
                                              !values.courses?.find(
                                                (_course) =>
                                                  _course?.course?.value ===
                                                  course.courseslug
                                              )
                                          )
                                          .map((course) => ({
                                            label: `${course?.coursename}`,
                                            value: course?.courseslug,
                                          }))}
                                        value={
                                          values.courses[idx]?.course ||
                                          undefined
                                        }
                                        onBlur={handleBlur}
                                        onChange={(newValue) => {
                                          setFieldValue(
                                            `courses[${idx}].course`,
                                            newValue
                                          );
                                        }}
                                        isDisabled={
                                          coursesIsLoading ||
                                          coursesIsErr ||
                                          isSubmitting
                                        }
                                      />
                                      {touched &&
                                        touched.courses &&
                                        touched?.courses[idx]?.course &&
                                        errors &&
                                        errors.courses &&
                                        errors?.courses[idx]?.course && (
                                          <span className="text-danger">
                                            {errors?.courses[idx]?.course
                                              ?.label ||
                                              errors?.courses[idx]?.course
                                                ?.value}
                                          </span>
                                        )}
                                    </div>
                                  </Col>
                                  <Col sm="6">
                                    <div className="mb-3">
                                      <Label className="control-label">
                                        Teacher
                                      </Label>
                                      <Select
                                        isLoading={teachersIsLoading}
                                        id={`teachers[${idx}].teacher`}
                                        name={`teachers[${idx}].teacher`}
                                        classNamePrefix="select2-selection"
                                        placeholder="Choose..."
                                        title="Course Teacher"
                                        options={teachersData?.data.map(
                                          (teacher) => ({
                                            label: `${teacher?.firstname} ${teacher?.middlename} - ${teacher?.techid}`,
                                            value: teacher?.techid,
                                          })
                                        )}
                                        value={
                                          values.courses[idx]?.teacher ||
                                          undefined
                                        }
                                        onBlur={handleBlur}
                                        onChange={(newValue) => {
                                          setFieldValue(
                                            `courses[${idx}].teacher`,
                                            newValue
                                          );
                                        }}
                                        isDisabled={
                                          teachersIsLoading ||
                                          teachersIsErr ||
                                          isSubmitting
                                        }
                                      />
                                      {touched &&
                                        touched.courses &&
                                        touched?.courses[idx]?.teacher &&
                                        errors &&
                                        errors.courses &&
                                        errors?.courses[idx]?.teacher && (
                                          <span className="text-danger">
                                            {errors?.courses[idx]?.teacher
                                              ?.label ||
                                              errors?.courses[idx]?.teacher
                                                ?.value}
                                          </span>
                                        )}
                                    </div>
                                  </Col>
                                  <Col sm="1">
                                    <div className="mt-2">
                                      <Button
                                        disabled={isSubmitting}
                                        type="submit"
                                        color="danger"
                                        className="btn"
                                        onClick={() => remove(idx)}
                                      >
                                        <i className="bx bx-trash align-baseline me-1"></i>
                                      </Button>
                                    </div>
                                  </Col>
                                </Row>
                              ))}

                              <Col sm="12" className="text-center my-3">
                                <Button
                                  disabled={isSubmitting}
                                  type="button"
                                  color="success"
                                  className="btn btn-sm"
                                  onClick={() =>
                                    push({
                                      course: undefined,
                                      teacher: undefined,
                                    })
                                  }
                                >
                                  {isSubmitting ? (
                                    <Spinner size={"sm"} />
                                  ) : (
                                    "Add Course"
                                  )}
                                </Button>
                              </Col>
                            </div>
                          )}
                        </FieldArray>

                        <div className="d-flex flex-wrap gap-2">
                          <Button
                            disabled={
                              isSubmitting ||
                              coursesIsLoading ||
                              coursesIsErr ||
                              Object.keys(errors).length > 0
                            }
                            type="submit"
                            color="primary"
                            className="btn "
                          >
                            {isSubmitting ? (
                              <Spinner size={"sm"} />
                            ) : (
                              "Add Semester Courses"
                            )}
                          </Button>
                          <Button
                            type="button"
                            onClick={() => onShowCreateSemesterCourse(false)}
                            color="secondary"
                            className=" "
                            disabled={isSubmitting}
                          >
                            Cancel
                          </Button>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default CreateSemester;

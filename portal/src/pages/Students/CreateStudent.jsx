import React, { useState } from "react";

import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  Input,
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
import { createStudentSchema } from "../../validations/students";

const CreateStudent = () => {
  //meta title
  document.title = "Create Student | FFU ATMS";

  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { create: createStudent } = useApiCall(
    "CREATE_STUDENT",
    urls.createStudent(),
    {},
    false
  );

  const formik = useFormik({
    initialValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      mobileNo: "",
      studentId: "",
      yearOfStudy: undefined,
    },
    validationSchema: createStudentSchema,
    onSubmit: async (values) => {
      toast.loading("Please wait a few minutes...", {
        toastId: "createStudent",
      });

      setIsSubmitting(true);
      const payload = {
        studentId: values.studentId,
        firstName: values.firstName,
        middleName: values.middleName,
        lastName: values.lastName,
        mobileNo: values.mobileNo?.toString(),
        yearOfStudy: values.yearOfStudy,
      };

      await createStudent({ payload })
        .then((res) => {
          toast.update("createStudent", {
            isLoading: false,
            type: "success",
            render: "Successfully Student Created: " + values.firstName,
            autoClose: 3000,
            closeOnClick: true,
          });

          formik.resetForm();
          setIsSubmitting(false);
          navigate("/students/detail", {
            state: { studentId: res?.data?.stdid },
          });
        })
        .catch((err) => {
          toast.update("createStudent", {
            isLoading: false,
            type: "error",
            autoClose: 5000,
            render:
              err?.response?.data?.message ??
              (err.message || err || "Something went wrong!"),
            closeOnClick: true,
          });
        });
      setIsSubmitting(false);
    },
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Students" breadcrumbItem="Create Student" />

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
                        <div className="mb-3">
                          <Label htmlFor="studentId">Student ID</Label>
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
                          {formik.touched.studentId &&
                          Boolean(formik.errors.studentId) ? (
                            <span className="text-danger">
                              {formik.errors.studentId}
                            </span>
                          ) : null}
                        </div>
                      </Col>
                      <Col sm="6">
                        <div className="mb-3">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            type="text"
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
                            value={formik.values.middleName}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            disabled={isSubmitting}
                          />
                          {formik.touched.middleName &&
                          Boolean(formik.errors.middleName) ? (
                            <span className="text-danger">
                              {formik.errors.middleName}
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
                            value={formik.values.lastName}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            disabled={isSubmitting}
                          />
                          {formik.touched.lastName &&
                          Boolean(formik.errors.lastName) ? (
                            <span className="text-danger">
                              {formik.errors.lastName}
                            </span>
                          ) : null}
                        </div>
                      </Col>
                      <Col sm="6">
                        <div className="mb-3">
                          <Label htmlFor="mobileNo">Mobile No</Label>
                          <Input
                            id="mobileNo"
                            name="mobileNo"
                            type="number"
                            className="form-control"
                            placeholder="Mobile No"
                            value={formik.values.mobileNo}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            disabled={isSubmitting}
                          />
                          {formik.touched.mobileNo &&
                          Boolean(formik.errors.mobileNo) ? (
                            <span className="text-danger">
                              {formik.errors.mobileNo}
                            </span>
                          ) : null}
                        </div>
                      </Col>{" "}
                      <Col sm="6">
                        <div className="mb-3">
                          <Label htmlFor="yearOfStudy">Year Of Study</Label>
                          <Input
                            id="yearOfStudy"
                            name="yearOfStudy"
                            type="number"
                            className="form-control"
                            placeholder="Year Of Study"
                            value={formik.values.yearOfStudy}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            disabled={isSubmitting}
                          />
                          {formik.touched.yearOfStudy &&
                          Boolean(formik.errors.yearOfStudy) ? (
                            <span className="text-danger">
                              {formik.errors.yearOfStudy}
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

export default CreateStudent;

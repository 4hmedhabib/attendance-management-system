import React, { useCallback, useEffect, useState } from "react";

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
import slugify from "slugify";

//Import Breadcrumb
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import urls from "../../api/urls";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import useApiCall from "../../hooks/apiHook";
import { createTeacherSchema } from "../../validations/teachers";

const CreateTeacher = () => {
  //meta title
  document.title = "Create Teacher | FFU ATMS";

  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { create: createTeacher } = useApiCall(
    "CREATE_teacher",
    urls.createTeacher(),
    {},
    false
  );

  const formik = useFormik({
    initialValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      mobileNo: "",
      teacherId: "",
    },
    validationSchema: createTeacherSchema,
    onSubmit: async (values) => {
      toast.loading("Please wait a few minutes...", {
        toastId: "createTeacher",
      });

      setIsSubmitting(true);
      const payload = {
        teacherId: values.teacherId,
        firstName: values.firstName,
        middleName: values.middleName,
        lastName: values.lastName,
        mobileNo: values.mobileNo?.toString(),
      };

      await createTeacher({ payload })
        .then((res) => {
          toast.update("createTeacher", {
            isLoading: false,
            type: "success",
            render: "Successfully Teacher Created: " + values.firstName,
            autoClose: 3000,
            closeOnClick: true,
          });

          formik.resetForm();
          setIsSubmitting(false);
          navigate("/teachers/detail", {
            state: { teacherSlug: res?.data?.teacherslug },
          });
        })
        .catch((err) => {
          toast.update("createTeacher", {
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
          <Breadcrumbs title="Teachers" breadcrumbItem="Create Teacher" />

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
                          <Label htmlFor="teacherId">Teacher ID</Label>
                          <Input
                            id="teacherId"
                            name="teacherId"
                            type="text"
                            className="form-control"
                            placeholder="Teacher ID"
                            value={formik.values.teacherId}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            disabled={isSubmitting}
                          />
                          {formik.touched.teacherId &&
                          Boolean(formik.errors.teacherId) ? (
                            <span className="text-danger">
                              {formik.errors.teacherId}
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

export default CreateTeacher;

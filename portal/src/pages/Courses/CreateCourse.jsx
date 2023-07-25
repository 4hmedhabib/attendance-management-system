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
import slugify from "slugify";

//Import Breadcrumb
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import urls from "../../api/urls";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import useApiCall from "../../hooks/apiHook";
import { createCourseSchema } from "../../validations/courses";

const CreateCourse = () => {
  //meta title
  document.title = "Create Course | FFU ATMS";

  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { create: createCourse } = useApiCall(
    "CREATE_COURSE",
    urls.createCourse(),
    {},
    false
  );

  const formik = useFormik({
    initialValues: {
      courseName: "",
      description: "",
    },
    validationSchema: createCourseSchema,
    onSubmit: async (values) => {
      toast.loading("Please wait a few minutes...", {
        toastId: "createCourse",
      });

      setIsSubmitting(true);
      const payload = {
        courseName: values.courseName,
        courseSlug: slugify(values.courseName?.toLowerCase(), "_"),
        description: values.description,
      };

      await createCourse({ payload })
        .then((res) => {
          toast.update("createCourse", {
            isLoading: false,
            type: "success",
            render: "Successfully Course Created: " + values.courseName,
            autoClose: 3000,
            closeOnClick: true,
          });

          formik.resetForm();
          setIsSubmitting(false);
          navigate("/courses/detail", {
            state: { courseSlug: res?.data?.courseslug },
          });
        })
        .catch((err) => {
          toast.update("createCourse", {
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
          <Breadcrumbs title="Courses" breadcrumbItem="Create Course" />

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
                          <Label htmlFor="courseName">Course Name</Label>
                          <Input
                            id="courseName"
                            name="courseName"
                            type="text"
                            className="form-control"
                            placeholder="Course Name"
                            value={formik.values.courseName}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            disabled={isSubmitting}
                          />
                          {formik.touched.courseName &&
                          Boolean(formik.errors.courseName) ? (
                            <span className="text-danger">
                              {formik.errors.courseName}
                            </span>
                          ) : null}
                        </div>
                      </Col>

                      <Col sm="6">
                        <div className="mb-3">
                          <Label htmlFor="description">
                            Course Description
                          </Label>
                          <textarea
                            id="description"
                            name="description"
                            className="form-control mb-3"
                            value={formik.values.description}
                            rows="5"
                            placeholder="Course Description"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            disabled={isSubmitting}
                          />
                          {formik.touched.description &&
                          Boolean(formik.errors.description) ? (
                            <span className="text-danger">
                              {formik.errors.description}
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

export default CreateCourse;

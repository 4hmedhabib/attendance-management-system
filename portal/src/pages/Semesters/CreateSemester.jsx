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
import { createSemesterSchema } from "../../validations/semesters";

const CreateSemester = () => {
  //meta title
  document.title = "Create Semester | FFU ATMS";

  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    data: usersData,
    isError: usersIsErr,
    isLoading: usersIsLoading,
    refetch: usersRefetch,
  } = useApiCall(
    "USERS_SHIFT_CREATE",
    urls.users(),
    {
      payload: {
        isMiniView: true,
        filters: {
          isAdmin: true,
        },
      },
    },
    false
  );

  const onRefresh = useCallback(() => {
    usersRefetch({
      payload: { isMiniView: false },
    });
  }, []);

  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  const {
    create: createSemester,
    isError: semestersIsErr,
    isLoading: semestersIsLoading,
    errMsg: userErrMsg,
  } = useApiCall("CREATE_SHIFT", urls.createSemester(), {}, false);

  const formik = useFormik({
    initialValues: {
      semesterName: "",
      description: "",
    },
    validationSchema: createSemesterSchema,
    onSubmit: async (values) => {
      toast.loading("Please wait a few minutes...", {
        toastId: "createSemester",
      });

      setIsSubmitting(true);
      const payload = {
        semesterName: values.semesterName,
        semesterSlug: slugify(values.semesterName?.toLowerCase(), "_"),
        description: values.description,
      };

      await createSemester({ payload })
        .then((res) => {
          toast.update("createSemester", {
            isLoading: false,
            type: "success",
            render: "Successfully Semester Created: " + values.semesterName,
            autoClose: 3000,
            closeOnClick: true,
          });

          formik.resetForm();
          setIsSubmitting(false);
          navigate("/semesters/detail", {
            state: { semesterSlug: res?.data?.semesterslug },
          });
        })
        .catch((err) => {
          toast.update("createSemester", {
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
          <Breadcrumbs title="Semesters" breadcrumbItem="Create Semester" />

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
                          <Label htmlFor="semesterName">Semester Name</Label>
                          <Input
                            id="semesterName"
                            name="semesterName"
                            type="text"
                            className="form-control"
                            placeholder="Semester Name"
                            value={formik.values.semesterName}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            disabled={isSubmitting}
                          />
                          {formik.touched.semesterName &&
                          Boolean(formik.errors.semesterName) ? (
                            <span className="text-danger">
                              {formik.errors.semesterName}
                            </span>
                          ) : null}
                        </div>
                      </Col>

                      <Col sm="6">
                        <div className="mb-3">
                          <Label htmlFor="description">Semester Description</Label>
                          <textarea
                            id="description"
                            name="description"
                            className="form-control mb-3"
                            value={formik.values.description}
                            rows="5"
                            placeholder="Semester Description"
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
                          isSubmitting ||
                          usersIsLoading ||
                          usersIsErr ||
                          Object.keys(formik.errors).length > 0
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

export default CreateSemester;

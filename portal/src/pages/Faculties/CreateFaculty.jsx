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
import { createFacultySchema } from "../../validations/faculties";
import ResError from "../../components/Common/ResError";

const CreateFaculty = () => {
  //meta title
  document.title = "Create Faculty | FFU ATMS";

  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    data: usersData,
    isError: usersIsErr,
    isLoading: usersIsLoading,
    refetch: usersRefetch,
  } = useApiCall(
    "USERS_FACULTY_CREATE",
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
    create: createFaculty,
    isError: facultiesIsErr,
    isLoading: facultiesIsLoading,
    errMsg: userErrMsg,
  } = useApiCall("CREATE_FACULTY", urls.createFaculty(), {}, false);

  const formik = useFormik({
    initialValues: {
      facultyName: "",
      description: "",
      manager: undefined,
      deputy: undefined,
    },
    validationSchema: createFacultySchema,
    onSubmit: async (values) => {
      toast.loading("Please wait a few minutes...", {
        toastId: "createFaculty",
      });

      setIsSubmitting(true);
      const payload = {
        facultyName: values.facultyName,
        facultySlug: slugify(values.facultyName?.toLowerCase(), "_"),
        description: values.description,
        manager: values.manager.value,
        deputy: values?.deputy?.value ?? "",
      };

      await createFaculty({ payload })
        .then((res) => {
          toast.update("createFaculty", {
            isLoading: false,
            type: "success",
            render: "Successfully Faculty Created: " + values.facultyName,
            autoClose: 3000,
            closeOnClick: true,
          });

          formik.resetForm();
          setIsSubmitting(false);
          navigate("/faculties/detail", {
            state: { facultySlug: res?.data?.facultyslug },
          });
        })
        .catch((err) => {
          toast.update("createFaculty", {
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
          <Breadcrumbs title="Faculties" breadcrumbItem="Create Faculty" />

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
                          <Label htmlFor="facultyName">Faculty Name</Label>
                          <Input
                            id="facultyName"
                            name="facultyName"
                            type="text"
                            className="form-control"
                            placeholder="Faculty Name"
                            value={formik.values.facultyName}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            disabled={isSubmitting}
                          />
                          {formik.touched.facultyName &&
                          Boolean(formik.errors.facultyName) ? (
                            <span className="text-danger">
                              {formik.errors.facultyName}
                            </span>
                          ) : null}
                        </div>
                        <div className="mb-3">
                          <Label className="control-label">
                            Faculty Manager
                          </Label>
                          <Select
                            isLoading={usersIsLoading}
                            id="manager"
                            name="manager"
                            classNamePrefix="select2-selection"
                            placeholder="Choose..."
                            title="Faculty Manager"
                            options={usersData?.data
                              ?.filter(
                                (user) =>
                                  user.username !== formik.values?.deputy?.value
                              )
                              .map((user) => ({
                                label: `${user?.firstname} ${user?.middlename} ${user?.lastname}`,
                                value: user.username,
                              }))}
                            value={formik.values.manager}
                            onBlur={formik.handleBlur}
                            onChange={(newValue) => {
                              formik.setFieldValue("manager", newValue);
                            }}
                            isDisabled={
                              usersIsLoading || usersIsErr || isSubmitting
                            }
                          />
                          {formik.touched.manager &&
                          Boolean(formik.errors.manager) ? (
                            <span className="text-danger">
                              {formik.errors.manager?.label ||
                                formik.errors.manager?.value}
                            </span>
                          ) : null}
                        </div>
                        <div className="mb-3">
                          <Label className="control-label">
                            Deputy Manager
                          </Label>
                          <Select
                            isLoading={usersIsLoading}
                            id="deputy"
                            name="deputy"
                            classNamePrefix="select2-selection"
                            placeholder="Choose..."
                            title="Deputy Manager"
                            options={usersData?.data
                              ?.filter(
                                (user) =>
                                  user.username !==
                                  formik.values?.manager?.value
                              )
                              .map((user) => ({
                                label: `${user?.firstname} ${user?.middlename} ${user?.lastname}`,
                                value: user.username,
                              }))}
                            value={formik.values.deputy}
                            onBlur={formik.handleBlur}
                            onChange={(newValue) => {
                              formik.setFieldValue("deputy", newValue);
                            }}
                            isDisabled={
                              usersIsLoading || usersIsErr || isSubmitting
                            }
                          />
                          {formik.touched.deputy &&
                          Boolean(formik.errors.deputy) ? (
                            <span className="text-danger">
                              {formik.errors.deputy?.label ||
                                formik.errors.deputy?.value}
                            </span>
                          ) : null}
                        </div>
                      </Col>

                      <Col sm="6">
                        <div className="mb-3">
                          <Label htmlFor="facultydesc">
                            Faculty Description
                          </Label>
                          <textarea
                            id="description"
                            name="description"
                            className="form-control mb-3"
                            value={formik.values.description}
                            rows="5"
                            placeholder="Faculty Description"
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

export default CreateFaculty;

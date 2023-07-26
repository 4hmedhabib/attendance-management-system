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
import { createClassSchema } from "../../validations";
import ResError from "../../components/Common/ResError";

const CreateClass = () => {
  //meta title
  document.title = "Create Class | FFU ATMS";

  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState(null);

  const {
    data: shiftsData,
    isError: shiftsIsErr,
    isLoading: shiftsIsLoading,
    refetch: shiftsRefetch,
  } = useApiCall(
    "SHIFTS_CLASS_CREATE",
    urls.shifts(),
    {
      payload: {
        isMiniView: true,
      },
    },
    false
  );

  const {
    data: facultiesData,
    isError: facultiesIsErr,
    isLoading: facultiesIsLoading,
    refetch: facultiesRefetch,
  } = useApiCall(
    "FACULTIES_CLASS_CREATE",
    urls.faculties(),
    {
      payload: {
        isMiniView: true,
      },
    },
    false
  );

  const onRefresh = useCallback(() => {
    shiftsRefetch({
      payload: { isMiniView: true },
    });
    facultiesRefetch({ payload: { isMiniView: true } });
  }, []);

  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  const { create: createClass } = useApiCall(
    "CREATE_CLASS",
    urls.createClass(),
    {},
    false
  );

  const formik = useFormik({
    initialValues: {
      className: "",
      description: "",
      shiftSlug: undefined,
      facultySlug: undefined,
    },
    validationSchema: createClassSchema,
    onSubmit: async (values) => {
      toast.loading("Please wait a few minutes...", {
        toastId: "createClass",
      });

      setIsSubmitting(true);
      const payload = {
        className: values.className,
        classSlug: slugify(values.className?.toLowerCase(), "_"),
        description: values.description,
        shiftSlug: values?.shiftSlug?.value ?? "",
        facultySlug: values?.facultySlug?.value ?? "",
      };

      await createClass({ payload })
        .then((res) => {
          toast.update("createClass", {
            isLoading: false,
            type: "success",
            render: "Successfully Class Created: " + values.className,
            autoClose: 3000,
            closeOnClick: true,
          });

          formik.resetForm();
          setIsSubmitting(false);
          navigate("/classes/detail", {
            state: { classSlug: res?.data?.classslug },
          });
        })
        .catch((err) => {
          toast.update("createClass", {
            isLoading: false,
            type: "error",
            autoClose: 5000,
            render: err?.message || "Something went wrong!",
            closeOnClick: true,
          });
          setErrors(err?.response?.data?.message || err?.message);
          setIsSubmitting(false);
        });
    },
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="classes" breadcrumbItem="Create Class" />

          {errors && <ResError error={errors} />}

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
                          <Label htmlFor="className">Class Name</Label>
                          <Input
                            id="className"
                            name="className"
                            type="text"
                            className="form-control"
                            placeholder="Class Name"
                            value={formik.values.className}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            disabled={isSubmitting}
                          />
                          {formik.touched.className &&
                          Boolean(formik.errors.className) ? (
                            <span className="text-danger">
                              {formik.errors.className}
                            </span>
                          ) : null}
                        </div>
                        <div className="mb-3">
                          <Label className="control-label">Class Shift</Label>
                          <Select
                            isLoading={shiftsIsLoading}
                            id="shiftSlug"
                            name="shiftSlug"
                            classNamePrefix="select2-selection"
                            placeholder="Choose..."
                            title="Class Shift"
                            options={shiftsData?.data.map((shift) => ({
                              label: `${shift?.shiftname}`,
                              value: shift?.shiftslug,
                            }))}
                            value={formik.values.shiftSlug}
                            onBlur={formik.handleBlur}
                            onChange={(newValue) => {
                              formik.setFieldValue("shiftSlug", newValue);
                            }}
                            isDisabled={
                              shiftsIsLoading || shiftsIsErr || isSubmitting
                            }
                          />
                          {formik.touched.shiftSlug &&
                          Boolean(formik.errors.shiftSlug) ? (
                            <span className="text-danger">
                              {formik.errors.shiftSlug?.label ||
                                formik.errors.shiftSlug?.value}
                            </span>
                          ) : null}
                        </div>
                        <div className="mb-3">
                          <Label className="control-label">Class Faculty</Label>
                          <Select
                            isLoading={facultiesIsLoading}
                            id="facultySlug"
                            name="facultySlug"
                            classNamePrefix="select2-selection"
                            placeholder="Choose..."
                            title="Class Faculty"
                            options={facultiesData?.data.map((faculty) => ({
                              label: `${faculty?.facultyname}`,
                              value: faculty.facultyslug,
                            }))}
                            value={formik.values.facultySlug}
                            onBlur={formik.handleBlur}
                            onChange={(newValue) => {
                              formik.setFieldValue("facultySlug", newValue);
                            }}
                            isDisabled={
                              facultiesIsLoading ||
                              facultiesIsErr ||
                              isSubmitting
                            }
                          />
                          {formik.touched.facultySlug &&
                          Boolean(formik.errors.facultySlug) ? (
                            <span className="text-danger">
                              {formik.errors.facultySlug?.label ||
                                formik.errors.facultySlug?.value}
                            </span>
                          ) : null}
                        </div>
                      </Col>

                      <Col sm="6">
                        <div className="mb-3">
                          <Label htmlFor="Classdesc">Class Description</Label>
                          <textarea
                            id="description"
                            name="description"
                            className="form-control mb-3"
                            value={formik.values.description}
                            rows="5"
                            placeholder="Class Description"
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
                          shiftsIsLoading ||
                          shiftsIsErr ||
                          facultiesIsLoading ||
                          facultiesIsErr ||
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

export default CreateClass;

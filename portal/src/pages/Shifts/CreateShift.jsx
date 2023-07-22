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
import { createShiftSchema } from "../../validations/shifts";
import ResError from "../../components/Common/ResError";

const CreateShift = () => {
  //meta title
  document.title = "Create Shift | FFU ATMS";

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
    create: createShift,
    isError: shiftsIsErr,
    isLoading: shiftsIsLoading,
    errMsg: userErrMsg,
  } = useApiCall("CREATE_SHIFT", urls.createShift(), {}, false);

  const formik = useFormik({
    initialValues: {
      shiftName: "",
      description: "",
    },
    validationSchema: createShiftSchema,
    onSubmit: async (values) => {
      toast.loading("Please wait a few minutes...", {
        toastId: "createShift",
      });

      setIsSubmitting(true);
      const payload = {
        shiftName: values.shiftName,
        shiftSlug: slugify(values.shiftName?.toLowerCase(), "_"),
        description: values.description,
      };

      await createShift({ payload })
        .then((res) => {
          console.log(res);
          toast.update("createShift", {
            isLoading: false,
            type: "success",
            render: "Successfully Shift Created: " + values.shiftName,
            autoClose: 3000,
            closeOnClick: true,
          });

          formik.resetForm();
          setIsSubmitting(false);
          navigate("/shifts/detail", {
            state: { shiftSlug: res?.data?.shiftslug },
          });
        })
        .catch((err) => {
          toast.update("createShift", {
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
          <Breadcrumbs title="Shifts" breadcrumbItem="Create Shift" />

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
                          <Label htmlFor="shiftName">Shift Name</Label>
                          <Input
                            id="shiftName"
                            name="shiftName"
                            type="text"
                            className="form-control"
                            placeholder="Shift Name"
                            value={formik.values.shiftName}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            disabled={isSubmitting}
                          />
                          {formik.touched.shiftName &&
                          Boolean(formik.errors.shiftName) ? (
                            <span className="text-danger">
                              {formik.errors.shiftName}
                            </span>
                          ) : null}
                        </div>
                      </Col>

                      <Col sm="6">
                        <div className="mb-3">
                          <Label htmlFor="description">Shift Description</Label>
                          <textarea
                            id="description"
                            name="description"
                            className="form-control mb-3"
                            value={formik.values.description}
                            rows="5"
                            placeholder="Shift Description"
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

export default CreateShift;

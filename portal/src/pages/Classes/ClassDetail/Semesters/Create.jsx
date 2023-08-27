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

//Import Breadcrumb
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import urls from "../../../../api/urls";
import ResError from "../../../../components/Common/ResError";
import useApiCall from "../../../../hooks/apiHook";
import { createClassSemesterSchema } from "../../../../validations";

//Date Picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateSemester = ({ onShowCreateSemester, classData }) => {
  //meta title
  document.title = "Create Class | FFU ATMS";

  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState(null);

  const {
    data: semestersData,
    isError: semestersIsErr,
    isLoading: semestersIsLoading,
    refetch: semestersRefetch,
  } = useApiCall(
    "SEMESTER_CLASS_CREATE",
    urls.semesters(),
    {
      payload: {
        isMiniView: true,
      },
    },
    false
  );

  const onRefresh = useCallback(() => {
    semestersRefetch({
      payload: { isMiniView: true },
    });
  }, []);

  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  const { create: createSemester } = useApiCall(
    "CREATE_SEMESTER",
    urls.createClassSemester(),
    {},
    false
  );

  const formik = useFormik({
    initialValues: {
      className: classData.classslug,
      semester: undefined,
      startDate: new Date(),
      endDate: new Date(),
    },
    validationSchema: createClassSemesterSchema,
    onSubmit: async (values) => {
      toast.loading("Please wait a few minutes...", {
        toastId: "createSemester",
      });

      setIsSubmitting(true);
      const payload = {
        classSlug: classData.classslug,
        semester: {
          semesterSlug: values.semester.value,
          startDate: values.startDate,
          endDate: values.endDate,
        },
      };

      await createSemester({ payload })
        .then((res) => {
          toast.update("createSemester", {
            isLoading: false,
            type: "success",
            render: "Successfully Semester Added: " + values.semester.value,
            autoClose: 3000,
            closeOnClick: true,
          });

          formik.resetForm();
          setIsSubmitting(false);
          onShowCreateSemester(false);
        })
        .catch((err) => {
          toast.update("createSemester", {
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
      <Container fluid>
        {errors && <ResError error={errors} />}

        <Row>
          <Col xs="12">
            <Card>
              <CardBody>
                <CardTitle>Add Semester</CardTitle>

                <Form className="my-3" onSubmit={formik.handleSubmit}>
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
                          value={classData?.classname}
                          disabled={isSubmitting}
                          readOnly
                        />
                      </div>
                    </Col>

                    <Col sm="6">
                      <div className="mb-3">
                        <Label className="control-label">Semester</Label>
                        <Select
                          isLoading={semestersIsLoading}
                          id="semester"
                          name="semester"
                          classNamePrefix="select2-selection"
                          placeholder="Choose..."
                          title="Class Shift"
                          options={semestersData?.data.map((semester) => ({
                            label: `${semester?.semestername}`,
                            value: semester?.semesterslug,
                          }))}
                          value={formik.values.semester}
                          onBlur={formik.handleBlur}
                          onChange={(newValue) => {
                            formik.setFieldValue("semester", newValue);
                          }}
                          isDisabled={
                            semestersIsLoading || semestersIsErr || isSubmitting
                          }
                        />
                        {formik.touched.semester &&
                        Boolean(formik.errors.semester) ? (
                          <span className="text-danger">
                            {formik.errors.semester?.label ||
                              formik.errors.semester?.value}
                          </span>
                        ) : null}
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm="6">
                      <div className="mb-3">
                        <Label>Start Date :</Label>
                        <DatePicker
                          onChange={(date) => {
                            formik.setFieldValue("startDate", new Date(date));
                          }}
                          selected={formik.values.startDate}
                          className="form-control"
                          placeholderText="Select Start Date"
                          dateFormat="MMM/dd/yyyy"
                        />

                        {formik.touched.startDate &&
                        Boolean(formik.errors.startDate) ? (
                          <span className="text-danger">
                            {formik.errors.startDate}
                          </span>
                        ) : null}
                      </div>
                    </Col>

                    <Col sm="6">
                      <div className="mb-3">
                        <Label>End Date :</Label>
                        <DatePicker
                          onChange={(date) => {
                            formik.setFieldValue("endDate", new Date(date));
                          }}
                          selected={formik.values.endDate}
                          className="form-control"
                          placeholderText="Select End Date"
                          dateFormat="MMM/dd/yyyy"
                        />
                        {formik.touched.endDate &&
                        Boolean(formik.errors.endDate) ? (
                          <span className="text-danger">
                            {formik.errors.endDate}
                          </span>
                        ) : null}
                      </div>
                    </Col>
                  </Row>

                  <div className="d-flex flex-wrap gap-2">
                    <Button
                      disabled={
                        isSubmitting ||
                        semestersIsLoading ||
                        semestersIsErr ||
                        Object.keys(formik.errors).length > 0
                      }
                      type="submit"
                      color="primary"
                      className="btn "
                    >
                      {isSubmitting ? <Spinner size={"sm"} /> : "Add Semester"}
                    </Button>
                    <Button
                      type="button"
                      onClick={() => onShowCreateSemester(false)}
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
    </React.Fragment>
  );
};

export default CreateSemester;

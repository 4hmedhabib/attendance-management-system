import React from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import NotFound from "../../../components/Common/NotFound";
import ResError from "../../../components/Common/ResError";
import Classes from "./Classes";

//import images

const UpdateForm = ({
  _class,
  isEdit,
  facultiesData,
  facultiesErrMsg,
  facultiesIsLoading,
  facultiesIsErr,
  shiftsData,
  shiftsIsErr,
  shiftsIsLoading,
  shiftsErrMsg,
  formik,
  isSubmitting,
}) => {
  if (!_class) {
    return (
      <Col lg={9}>
        <NotFound>
          <h3>Sorry!, Class Not Found</h3>
          <Link className="btn btn-outline-info mt-3" to={"/classes"}>
            Go All Classes
          </Link>
        </NotFound>
      </Col>
    );
  }

  return (
    <React.Fragment>
      <Col lg={9}>
        {shiftsIsErr && <ResError error={shiftsErrMsg} />}
        <Card>
          <CardBody>
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
                      disabled={isSubmitting || !isEdit}
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
                        facultiesIsLoading || facultiesIsErr || isSubmitting
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
                    <Label htmlFor="clasdesc">Class Description</Label>
                    <textarea
                      id="description"
                      name="description"
                      className="form-control mb-3"
                      value={formik.values.description}
                      rows="5"
                      placeholder="Class Description"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      disabled={isSubmitting || !isEdit}
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
                    Object.keys(formik.errors).length > 0 ||
                    !isEdit
                  }
                  type="submit"
                  color="primary"
                  className="btn"
                >
                  {isSubmitting ? <Spinner size={"sm"} /> : "Save Changes"}
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>

        {/* <Classes
          classesData={classesData}
          classesIsErr={classesIsErr}
          classesErrMsg={classesErrMsg}
          classesIsLoading={classesIsLoading}
        /> */}
      </Col>
    </React.Fragment>
  );
};

export default UpdateForm;

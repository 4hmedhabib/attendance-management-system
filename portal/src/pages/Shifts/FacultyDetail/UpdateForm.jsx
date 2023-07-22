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
  faculty,
  isEdit,
  classesData,
  classesErrMsg,
  classesIsLoading,
  classesIsErr,
  usersData,
  usersIsErr,
  usersIsLoading,
  usersErrMsg,
  formik,
  isSubmitting,
}) => {
  if (!faculty) {
    return (
      <Col lg={9}>
        <NotFound>
          <h3>Sorry!, Faculty Not Found</h3>
          <Link className="btn btn-outline-info mt-3" to={"/faculty"}>
            Go All Faculties
          </Link>
        </NotFound>
      </Col>
    );
  }

  return (
    <React.Fragment>
      <Col lg={9}>
        {usersIsErr && <ResError error={usersErrMsg} />}
        <Card>
          <CardBody>
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
                      disabled={isSubmitting || !isEdit}
                    />
                    {formik.touched.facultyName &&
                    Boolean(formik.errors.facultyName) ? (
                      <span className="text-danger">
                        {formik.errors.facultyName}
                      </span>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <Label className="control-label">Faculty Manager</Label>
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
                        usersIsLoading || usersIsErr || isSubmitting || !isEdit
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
                    <Label className="control-label">Deputy Manager</Label>
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
                            user.username !== formik.values?.manager?.value
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
                        usersIsLoading || usersIsErr || isSubmitting || !isEdit
                      }
                    />
                    {formik.touched.deputy && Boolean(formik.errors.deputy) ? (
                      <span className="text-danger">
                        {formik.errors.deputy?.label ||
                          formik.errors.deputy?.value}
                      </span>
                    ) : null}
                  </div>
                </Col>

                <Col sm="6">
                  <div className="mb-3">
                    <Label htmlFor="facultydesc">Faculty Description</Label>
                    <textarea
                      id="description"
                      name="description"
                      className="form-control mb-3"
                      value={formik.values.description}
                      rows="5"
                      placeholder="Faculty Description"
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
                    usersIsLoading ||
                    usersIsErr ||
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

        <Classes
          classesData={classesData}
          classesIsErr={classesIsErr}
          classesErrMsg={classesErrMsg}
          classesIsLoading={classesIsLoading}
        />
      </Col>
    </React.Fragment>
  );
};

export default UpdateForm;

import React from "react";
import { Link } from "react-router-dom";
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
//import images

const UpdateForm = ({ enrollment, isEdit, formik, isSubmitting }) => {
  if (!enrollment) {
    return (
      <Col lg={9}>
        <NotFound>
          <h3>Sorry!, Course Not Found</h3>
          <Link className="btn btn-outline-info mt-3" to={"/enrollments"}>
            Go All Enrollments
          </Link>
        </NotFound>
      </Col>
    );
  }

  return (
    <React.Fragment>
      <Col lg={9}>
        <Card>
          <CardBody>
            <Form onSubmit={formik.handleSubmit}>
              <Row>
                <Col sm="6">
                  <div className="mb-3">
                    <Label htmlFor="enrollmentId">Enrollment ID</Label>
                    <Input
                      id="enrollmentId"
                      name="enrollmentId"
                      type="text"
                      className="form-control"
                      placeholder="Enrollment ID"
                      value={formik.values.enrollmentId}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      disabled={isSubmitting}
                    />
                    {formik.touched.enrollmentId &&
                    Boolean(formik.errors.enrollmentId) ? (
                      <span className="text-danger">
                        {formik.errors.enrollmentId}
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
                  {isSubmitting ? <Spinner size={"sm"} /> : "Save Changes"}
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default UpdateForm;

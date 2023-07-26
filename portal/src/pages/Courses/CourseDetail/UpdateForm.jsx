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
//import images

const UpdateForm = ({ course, isEdit, formik, isSubmitting }) => {
  if (!course) {
    return (
      <Col lg={9}>
        <NotFound>
          <h3>Sorry!, Course Not Found</h3>
          <Link className="btn btn-outline-info mt-3" to={"/course"}>
            Go All Courses
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
                      disabled={isSubmitting || !isEdit}
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
                    <Label htmlFor="coursedesc">Course Description</Label>
                    <textarea
                      id="description"
                      name="description"
                      className="form-control mb-3"
                      value={formik.values.description}
                      rows="5"
                      placeholder="Course Description"
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
      </Col>
    </React.Fragment>
  );
};

export default UpdateForm;

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
import ResError from "../../../components/Common/ResError";

//import images

const UpdateForm = ({
  semester,
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
  if (!semester) {
    return (
      <Col lg={9}>
        <NotFound>
          <h3>Sorry!, Semester Not Found</h3>
          <Link className="btn btn-outline-info mt-3" to={"/semester"}>
            Go All Semesters
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
                      disabled={isSubmitting || !isEdit}
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
                    <Label htmlFor="semesterdesc">Semester Description</Label>
                    <textarea
                      id="description"
                      name="description"
                      className="form-control mb-3"
                      value={formik.values.description}
                      rows="5"
                      placeholder="Semester Description"
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

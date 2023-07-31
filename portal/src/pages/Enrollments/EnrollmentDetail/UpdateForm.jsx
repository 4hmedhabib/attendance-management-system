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
  InputGroup,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import NotFound from "../../../components/Common/NotFound";
//import images

const UpdateForm = ({
  enrollment,
  isEdit,
  formik,
  isSubmitting,
  semestersData,
  classesData,
  coursesData,
  coursesIsLoading,
  classesIsLoading,
  semestersIsLoading,
}) => {
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
                  <Label htmlFor="studentId">Student ID</Label>
                  <InputGroup className="mb-3">
                    <Input
                      id="studentId"
                      name="studentId"
                      type="text"
                      className="form-control"
                      placeholder="Student ID"
                      value={formik.values.studentId}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      disabled={isSubmitting}
                    />
                    <div className="input-group-prepend">
                      <button
                        // disabled={isSubmitting || studentIsLoading}
                        onClick={() => getStudentData()}
                        type="button"
                        className="btn btn-primary"
                      >
                        Get Data
                      </button>
                    </div>
                  </InputGroup>
                </Col>
                <Col sm="6">
                  <div className="mb-3">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      readOnly
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
                      readOnly
                      value={formik.values.middleName}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      disabled={isSubmitting}
                    />
                    {formik.touched?.middleName &&
                    Boolean(formik.errors?.middleName) ? (
                      <span className="text-danger">
                        {formik.errors?.middleName}
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
                      readOnly
                      value={formik.values.lastName}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      disabled={isSubmitting}
                    />
                    {formik.touched?.lastName &&
                    Boolean(formik.errors?.lastName) ? (
                      <span className="text-danger">
                        {formik.errors?.lastName}
                      </span>
                    ) : null}
                  </div>
                </Col>
                <Col sm="6">
                  <div className="mb-3">
                    <Label className="control-label">Semester</Label>
                    <Select
                      // isLoading={semestersIsLoading}
                      id="semester"
                      name="semester"
                      classNamePrefix="select2-selection"
                      placeholder="Choose..."
                      title="Semester"
                      options={semestersData?.data?.map((semester) => ({
                        label: `${semester?.semestername}`,
                        value: semester?.semesterslug,
                      }))}
                      value={formik.values?.semester}
                      onBlur={formik.handleBlur}
                      onChange={(newValue) => {
                        formik.setFieldValue("semester", newValue);
                      }}
                      isLoading={semestersIsLoading}
                      isDisabled={isSubmitting}
                    />
                    {formik.touched?.semester &&
                    Boolean(formik.errors?.semester) ? (
                      <span semesterName="text-danger">
                        {formik.errors?.semester?.label ||
                          formik.errors?.semester?.value}
                      </span>
                    ) : null}
                  </div>
                </Col>
                <Col sm="6">
                  <div className="mb-3">
                    <Label className="control-label">Class</Label>
                    <Select
                      isLoading={classesIsLoading}
                      id="class"
                      name="class"
                      classNamePrefix="select2-selection"
                      placeholder="Choose..."
                      title="Class"
                      options={classesData?.data?.map((_class) => ({
                        label: `${_class?.classname}`,
                        value: _class?.classslug,
                      }))}
                      value={formik.values.class}
                      onBlur={formik.handleBlur}
                      onChange={(newValue) => {
                        formik.setFieldValue("class", newValue);
                      }}
                      isDisabled={isSubmitting}
                    />
                    {formik.touched.class && Boolean(formik.errors.class) ? (
                      <span className="text-danger">
                        {formik.errors?.class?.label ||
                          formik.errors?.class?.value}
                      </span>
                    ) : null}
                  </div>
                </Col>
                <Col sm="6">
                  <div className="mb-3">
                    <Label className="control-label">Course</Label>
                    <InputGroup className="mb-3 d-flex align-items-center">
                      <Select
                        isLoading={coursesIsLoading}
                        id="course"
                        name="course"
                        classNamePrefix="select2-selection"
                        placeholder="Choose..."
                        className="flex-grow-1"
                        title="Course"
                        options={coursesData?.data?.map((course) => ({
                          label: `${course?.coursename}`,
                          value: course?.courseslug,
                        }))}
                        value={formik.values?.course}
                        onBlur={formik.handleBlur}
                        onChange={(newValue) => {
                          formik.setFieldValue("course", newValue);
                        }}
                        isDisabled={isSubmitting}
                      />
                      <div className="input-group-prepend">
                        <button
                          disabled={
                            isSubmitting ||
                            coursesIsLoading ||
                            coursesData?.data?.length <= 0
                          }
                          onClick={getTeacherData}
                          type="button"
                          className="btn btn-primary"
                        >
                          Get Data
                        </button>
                      </div>
                      {formik.touched.class && Boolean(formik.errors?.class) ? (
                        <span className="text-danger">
                          {formik.errors?.class?.label ||
                            formik.errors?.class?.value}
                        </span>
                      ) : null}
                    </InputGroup>
                  </div>
                </Col>
                <Col sm="6">
                  <div className="mb-3">
                    <Label htmlFor="teacher">Teacher</Label>
                    <Input
                      id="teacher"
                      name="teacher"
                      type="text"
                      className="form-control"
                      placeholder="Teacher"
                      readOnly
                      value={formik.values?.teacher?.label || ""}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      disabled={isSubmitting}
                    />
                    {formik.touched.teacher &&
                    Boolean(formik.errors?.teacher?.label) ? (
                      <span className="text-danger">
                        {formik.errors?.teacher?.label}
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
    </React.Fragment>
  );
};

export default UpdateForm;

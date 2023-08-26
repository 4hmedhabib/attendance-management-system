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
  InputGroup,
  Label,
  Row,
  Spinner,
} from "reactstrap";

//Import Breadcrumb
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import urls from "../../api/urls";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import useApiCall from "../../hooks/apiHook";
import { createUserSchema } from "../../validations";

const CreateUser = () => {
  //meta title
  document.title = "Create User| FFU ATMS";

  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGetTeacher, setIsGetTeacher] = useState(false);
  const [teacherData, setTeacherData] = useState(null);

  const { create: createUser } = useApiCall(
    "CREATE_USER",
    urls.createUser(),
    {},
    false
  );

  const {
    data: groupsData,
    isError: groupsIsErr,
    isLoading: groupsIsLoading,
    refetch: groupsRefetch,
  } = useApiCall(
    "USERS_CREATE",
    urls.groups(),
    {
      payload: {
        isMiniView: true,
      },
    },
    false
  );

  const formik = useFormik({
    initialValues: {
      username: undefined,
      teacherId: undefined,
      firstName: undefined,
      middleName: undefined,
      lastName: undefined,
      username: undefined,
      mobileNo: undefined,
      email: undefined,
      password: undefined,
      passwordConfirm: undefined,
      group: undefined,
      isAdmin: undefined,
    },
    validationSchema: createUserSchema,
    onSubmit: async (values) => {
      toast.loading("Please wait a few minutes...", {
        toastId: "createUser",
      });

      setIsSubmitting(true);
      const payload = {
        firstName: values?.firstName,
        middleName: values?.middleName,
        lastName: values?.lastName,
        username:
          values?.group?.value === "teachers"
            ? values.teacherId
            : values.username,
        mobileNo: values?.mobileNo,
        email: values?.email,
        password: values?.password,
        passwordConfirm: values?.passwordConfirm,
        isStudent: false,
        isTeacher: values?.group?.value === "teachers",
        group: values?.group?.value,
      };

      await createUser({ payload })
        .then((res) => {
          toast.update("createUser", {
            isLoading: false,
            type: "success",
            render: "Successfully UserCreated: " + values.firstName,
            autoClose: 3000,
            closeOnClick: true,
          });

          formik.resetForm();
          setIsSubmitting(false);
          navigate("/administrations/");
        })
        .catch((err) => {
          toast.update("createUser", {
            isLoading: false,
            type: "error",
            autoClose: 5000,
            render: err.message || err || "Something went wrong!",
            closeOnClick: true,
          });

          setIsSubmitting(false);
        });
    },
  });

  let { group, class: _class, course, teacherId } = formik.values;

  const { create: getTeacher } = useApiCall(
    "TEACHERS_DETAIL",
    urls.teacherDetail(),
    {},
    false
  );

  const onRefresh = useCallback(() => {
    groupsRefetch({
      payload: { isMiniView: true },
    });
  }, []);

  useEffect(() => {
    if (group && _class) {
      coursesRefetch({
        payload: {
          isMiniView: true,
          filters: {
            groupSlug: group?.value ?? "",
            classSlug: _class?.value ?? "",
          },
        },
      });
    }
  }, [group, _class]);

  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  useEffect(() => {
    if (teacherData?.data && isGetTeacher) {
      formik.setFieldValue("firstName", teacherData?.data?.firstname);
      formik.setFieldValue("middleName", teacherData?.data?.middlename);
      formik.setFieldValue("lastName", teacherData?.data?.lastname);
      setIsGetTeacher(false);
    }
  }, [isGetTeacher, teacherData]);

  const getTeacherData = (teacherId) => {
    console.log(teacherId, "000-80-");
    getTeacher({
      payload: {
        teacherId: teacherId,
        isMiniView: false,
      },
    }).then((res) => {
      setTeacherData(res.data);
      formik.setFieldValue("firstName", res?.data?.firstname);
      formik.setFieldValue("middleName", res?.data?.middlename);
      formik.setFieldValue("lastName", res?.data?.lastname);
      formik.setFieldValue("mobileNo", res?.data?.mobileno);
    });
    setIsGetTeacher(true);
  };

  console.log(formik.errors);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Users" breadcrumbItem="Create User" />

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
                          <Label className="control-label">Group</Label>
                          <Select
                            // isLoading={groupsIsLoading}
                            id="group"
                            name="group"
                            classNamePrefix="select2-selection"
                            placeholder="Choose..."
                            title="Group"
                            options={groupsData?.data?.map((group) => ({
                              label: `${group?.groupname}`,
                              value: group?.groupslug,
                            }))}
                            value={formik.values?.group}
                            onBlur={formik.handleBlur}
                            onChange={(newValue) => {
                              formik.setFieldValue("group", newValue);
                              if (newValue?.value === "teachers") {
                                formik.setFieldValue("firstName", undefined);
                                formik.setFieldValue("middleName", undefined);
                                formik.setFieldValue("lastName", undefined);
                                formik.setFieldValue("mobileNo", undefined);
                              }
                            }}
                            isLoading={groupsIsLoading}
                            isDisabled={isSubmitting}
                          />
                          {formik.touched?.group &&
                          Boolean(formik.errors?.group) ? (
                            <span groupName="text-danger">
                              {formik.errors?.group?.label ||
                                formik.errors?.group?.value}
                            </span>
                          ) : null}
                        </div>
                      </Col>
                      {formik.values?.group?.value === "teachers" && (
                        <Col sm="6">
                          <Label htmlFor="teacherId">Teacher ID</Label>
                          <InputGroup className="mb-3">
                            <Input
                              id="teacherId"
                              name="teacherId"
                              type="text"
                              className="form-control"
                              placeholder="Teacher ID"
                              value={formik.values.teacherId}
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              disabled={isSubmitting}
                            />
                            <div className="input-group-prepend">
                              <button
                                // disabled={isSubmitting || teacherIsLoading}
                                onClick={() =>
                                  getTeacherData(formik.values.teacherId)
                                }
                                type="button"
                                className="btn btn-primary"
                              >
                                Get Data
                              </button>
                            </div>
                          </InputGroup>
                        </Col>
                      )}
                      {formik.values?.group?.value !== "teachers" && (
                        <Col sm="6">
                          <Label htmlFor="username">Username</Label>
                          <InputGroup className="mb-3">
                            <Input
                              id="username"
                              name="username"
                              type="text"
                              className="form-control"
                              placeholder="Username"
                              value={formik.values.username}
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              disabled={isSubmitting}
                            />
                            <div className="input-group-prepend">
                              <button
                                // disabled={isSubmitting || teacherIsLoading}
                                onClick={() => getTData()}
                                type="button"
                                className="btn btn-primary"
                              >
                                Get Data
                              </button>
                            </div>
                          </InputGroup>
                        </Col>
                      )}
                      <Col sm="6">
                        <div className="mb-3">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            type="text"
                            readOnly={
                              formik.values?.group?.value === "teachers"
                            }
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
                            readOnly={
                              formik.values?.group?.value === "teachers"
                            }
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
                            readOnly={
                              formik.values?.group?.value === "teachers"
                            }
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
                          <Label htmlFor="mobileNo">Mobile No</Label>
                          <Input
                            id="mobileNo"
                            name="mobileNo"
                            type="text"
                            className="form-control"
                            placeholder="Mobile No"
                            readOnly={
                              formik.values?.group?.value === "teachers"
                            }
                            value={formik.values.mobileNo}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            disabled={isSubmitting}
                          />
                          {formik.touched?.mobileNo &&
                          Boolean(formik.errors?.mobileNo) ? (
                            <span className="text-danger">
                              {formik.errors?.mobileNo}
                            </span>
                          ) : null}
                        </div>
                      </Col>
                      <Col sm="6">
                        <div className="mb-3">
                          <Label htmlFor="lastName">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="text"
                            className="form-control"
                            placeholder="Email"
                            value={formik.values.email}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            disabled={isSubmitting}
                          />
                          {formik.touched?.email &&
                          Boolean(formik.errors?.email) ? (
                            <span className="text-danger">
                              {formik.errors?.email}
                            </span>
                          ) : null}
                        </div>
                      </Col>
                      <Col sm="6">
                        <div className="mb-3">
                          <Label htmlFor="password">Password</Label>
                          <Input
                            id="password"
                            name="password"
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={formik.values.password}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            disabled={isSubmitting}
                          />
                          {formik.touched?.password &&
                          Boolean(formik.errors?.password) ? (
                            <span className="text-danger">
                              {formik.errors?.password}
                            </span>
                          ) : null}
                        </div>
                      </Col>
                      <Col sm="6">
                        <div className="mb-3">
                          <Label htmlFor="passwordConfirm">
                            Confirm Password
                          </Label>
                          <Input
                            id="passwordConfirm"
                            name="passwordConfirm"
                            type="password"
                            className="form-control"
                            placeholder="Confirm Password"
                            value={formik.values.passwordConfirm}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            disabled={isSubmitting}
                          />
                          {formik.touched?.passwordConfirm &&
                          Boolean(formik.errors?.passwordConfirm) ? (
                            <span className="text-danger">
                              {formik.errors?.passwordConfirm}
                            </span>
                          ) : null}
                        </div>
                      </Col>

                      <Col sm="6">
                        <div className="mb-3">
                          <Label className="control-label">IsAdmin</Label>
                          <Select
                            id="isAdmin"
                            name="isAdmin"
                            classNamePrefix="select2-selection"
                            placeholder="Choose..."
                            title="Is Admin"
                            readOnly={group?.value === "teachers" || false}
                            options={[true, false].map((isAdmin) => ({
                              label: isAdmin ? "True" : "False",
                              value: isAdmin,
                            }))}
                            value={formik.values.isAdmin}
                            onBlur={formik.handleBlur}
                            onChange={(newValue) => {
                              formik.setFieldValue("isAdmin", newValue);
                            }}
                            isDisabled={isSubmitting}
                          />
                          {formik.touched.isAdmin &&
                          Boolean(formik.errors.isAdmin) ? (
                            <span className="text-danger">
                              {formik.errors?.isAdmin?.label ||
                                formik.errors?.isAdmin?.value}
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
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CreateUser;

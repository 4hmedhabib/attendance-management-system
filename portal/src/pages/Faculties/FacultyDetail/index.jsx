import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Row, Spinner } from "reactstrap";

//import images
import { useFormik } from "formik";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";
import urls from "../../../api/urls";
import NotFound from "../../../components/Common/NotFound";
import ResError from "../../../components/Common/ResError";
import useApiCall from "../../../hooks/apiHook";
import { updateFacultySchema } from "../../../validations/faculties";
import Sidebar from "./Sidebar";
import UpdateForm from "./UpdateForm";

const FacultyDetail = () => {
  document.title = "Faculty Detail | FFU ATMS";

  const { state } = useLocation();

  if (!state?.facultySlug) {
    return (
      <NotFound>
        <h3>Sorry!, Faculty Id Not Found</h3>
        <Link className="btn btn-outline-info mt-3" to={"/faculties"}>
          Go All Faculties
        </Link>
      </NotFound>
    );
  }

  const [faculty, setFaculty] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setErrors] = useState(null);

  const {
    data: facultyData,
    isError: facultyIsErr,
    isLoading: facultyIsLoading,
    errMsg: facultyErrMsg,
    refetch: facultyRefetch,
  } = useApiCall("FACULTY_DETAIL", urls.facultyDetail(), {
    payload: {
      isMiniView: false,
      facultySlug: state.facultySlug,
    },
  });

  const {
    data: classesData,
    isError: classesIsErr,
    isLoading: classesIsLoading,
    errMsg: classesErrMsg,
  } = useApiCall("CLASSES_FACULTY_DETAIL", urls.classes(), {
    payload: {
      isMiniView: true,
      filters: {
        facultySlug: state.facultySlug,
      },
    },
  });

  const {
    data: usersData,
    isError: usersIsErr,
    isLoading: usersIsLoading,
    errMsg: usersErrMsg,
  } = useApiCall("USERS_FACULTY_DETAIL", urls.users(), {
    payload: {
      isMiniView: true,
      filters: {
        isAdmin: true,
      },
    },
  });

  const { update: updateFaculty } = useApiCall(
    "UPDATE_FACULTY",
    urls.updateFaculty(),
    {},
    false
  );

  useEffect(() => {
    if (facultyData) {
      setFaculty(facultyData.data);
      console.log(facultyData, "UPDATD");
    }
  }, [facultyData]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      facultyName: faculty?.facultyname ?? "",
      description: faculty?.description ?? "",
      manager: faculty?.manager
        ? {
            label: `${faculty?.manager?.firstname} ${faculty?.manager?.middlename} ${faculty?.manager?.lastname}`,
            value: faculty?.manager.username,
          }
        : undefined,
      deputy: undefined,
    },
    validationSchema: updateFacultySchema,
    onSubmit: async (values) => {
      setErrors(null);
      setIsSubmitting(true);
      toast.loading("Please wait a few minutes...", {
        toastId: "updateFaculty",
      });

      const payload = {
        facultySlug: state?.facultySlug,
        data: {
          facultyName: values.facultyName,
          facultySlug: slugify(values.facultyName?.toLowerCase(), "_"),
          description: values.description,
          manager: values.manager.value,
          deputy: values?.deputy?.value ?? "",
        },
      };

      await updateFaculty({ payload })
        .then((res) => {
          setErrors(null);

          toast.update("updateFaculty", {
            isLoading: false,
            type: "success",
            render: "Successfully Faculty Updated: " + values.facultyName,
            autoClose: 3000,
            closeOnClick: true,
          });

          setIsSubmitting(false);
          onRefresh();
        })
        .catch((err) => {
          console.log("----++++-");
          toast.update("updateFaculty", {
            isLoading: false,
            type: "error",
            autoClose: 5000,
            render: "Something went wrong!",
            closeOnClick: true,
          });

          setErrors(err.response.data?.message || err.message);

          setIsSubmitting(false);
        });
    },
  });

  const onEdit = () => {
    setIsEdit(!isEdit);
  };

  const onRefresh = () => {
    facultyRefetch({
      payload: {
        isMiniView: false,
        facultySlug: state.facultySlug,
      },
    });
  };

  if (facultyIsLoading) {
    return (
      <div className="page-content ">
        <Col lg={12} className="text-center mt-5">
          <Spinner />
        </Col>
      </div>
    );
  } else if (facultyIsErr) {
    <ResError error={facultyErrMsg} />;
  }

  if (!faculty) {
    return (
      <NotFound>
        <h3>Sorry!, Faculty Not Found</h3>
        <Link className="btn btn-outline-info mt-3" to={"/faculties"}>
          Go All Faculties
        </Link>
      </NotFound>
    );
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              {error && <ResError error={error} />}
              <Card className="mx-n4 mt-n4 bg-info bg-white">
                <CardBody>
                  <div className="text-center mb-4">
                    <h5 className="mt-3 mb-1">{faculty?.facultyname}</h5>
                    <p className="text-muted mb-3">Faculty</p>
                  </div>

                  <div className="d-flex align-items-center">
                    <ul className="list-unstyled hstack gap-3 mb-0 flex-grow-1"></ul>
                    <div className="hstack gap-2">
                      <button
                        className="btn btn-info d-flex justify-content-center align-items-center"
                        onClick={onRefresh}
                      >
                        <i className="mdi mdi-reload align-baseline me-1"></i>
                        Refresh
                      </button>
                      <button
                        type="button"
                        className={`btn ${
                          isEdit ? "btn-danger" : "btn-warning"
                        } d-flex justify-content-center align-items-center`}
                        onClick={onEdit}
                      >
                        {!isEdit ? (
                          <>
                            <i className="bx bxs-edit align-baseline me-1"></i>
                            Edit
                          </>
                        ) : (
                          <>
                            <i className="bx bx bx-x align-baseline me-1"></i>
                            Cancel
                          </>
                        )}
                      </button>
                      <Link
                        className="btn btn-secondary d-flex justify-content-center align-items-center"
                        to={"/faculties"}
                      >
                        <i className="bx bx-left-arrow align-baseline me-1"></i>
                        Back
                      </Link>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Sidebar faculty={faculty} />
            <UpdateForm
              faculty={faculty}
              facultySlug={state?.facultySlug}
              isEdit={isEdit}
              classesData={classesData}
              classesIsErr={classesIsErr}
              classesErrMsg={classesErrMsg}
              classesIsLoading={classesIsLoading}
              usersData={usersData}
              usersIsErr={usersIsErr}
              usersIsLoading={usersIsLoading}
              usersErrMsg={usersErrMsg}
              formik={formik}
              isSubmitting={isSubmitting}
            />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default FacultyDetail;

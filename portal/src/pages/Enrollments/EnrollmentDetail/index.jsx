import React, { useCallback, useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Modal,
  Row,
  Spinner,
} from "reactstrap";

//import images
import { useFormik } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import urls from "../../../api/urls";
import NotFound from "../../../components/Common/NotFound";
import ResError from "../../../components/Common/ResError";
import useApiCall from "../../../hooks/apiHook";
import { updateEnrollmentSchema } from "../../../validations/enrollments";
import Sidebar from "./Sidebar";
import UpdateForm from "./UpdateForm";

const EnrollmentDetail = () => {
  document.title = "Enrollment Detail | FFU ATMS";

  const { state } = useLocation();

  console.log(state);

  if (!state?.enrollmentId) {
    return (
      <NotFound>
        <h3>Sorry!, Enrollment Id Not Found</h3>
        <Link className="btn btn-outline-info mt-3" to={"/enrollments"}>
          Go All Enrollments
        </Link>
      </NotFound>
    );
  }

  const navigate = useNavigate();

  const [enrollment, setEnrollment] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setErrors] = useState(null);
  const [modal_backdrop, setDeleteModal] = useState(false);
  const [isGetStudent, setIsGetStudent] = useState(false);

  const {
    data: enrollmentData,
    isError: enrollmentIsErr,
    isLoading: enrollmentIsLoading,
    errMsg: enrollmentErrMsg,
    refetch: enrollmentRefetch,
  } = useApiCall("ENROLLMENT_DETAIL", urls.enrollmentDetail(), {
    payload: {
      isMiniView: false,
      enrollmentId: state.enrollmentId,
    },
  });

  const {
    data: semestersData,
    isError: semestersIsErr,
    isLoading: semestersIsLoading,
    refetch: semestersRefetch,
  } = useApiCall(
    "SEMESTERS_ENROLLMENT_CREATE",
    urls.semesters(),
    {
      payload: {
        isMiniView: true,
      },
    },
    false
  );

  const {
    data: classesData,
    isError: classesIsErr,
    isLoading: classesIsLoading,
    refetch: classesRefetch,
  } = useApiCall(
    "CLASSES_ENROLLMENT_CREATE",
    urls.classes(),
    {
      payload: {
        isMiniView: true,
        filters: {
          facultySlug: null,
          shiftSlug: null,
        },
      },
    },
    false
  );

  const { update: updateEnrollment } = useApiCall(
    "UPDATE_ENROLLMENT",
    urls.updateEnrollment(),
    {
      payload: {
        isMiniView: true,
        filters: {
          enrollmentId: state.enrollmentId,
        },
      },
    },
    false
  );

  const { remove: deleteEnrollment } = useApiCall(
    "DELETE_ENROLLMENT",
    urls.deleteEnrollment(),
    {
      payload: {
        isMiniView: true,
        filters: {
          enrollmentId: state.enrollmentId,
        },
      },
    },
    false
  );

  useEffect(() => {
    if (enrollmentData) {
      setEnrollment(enrollmentData?.data);
    }
  }, [enrollmentData]);

  const onRefresh = useCallback(() => {
    enrollmentRefetch({
      payload: {
        isMiniView: false,
        enrollmentId: state.enrollmentId,
      },
    });
  }, []);

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  const toggleDeleteModal = () => {
    setDeleteModal(!modal_backdrop);
    removeBodyCss();
  };

  useEffect(() => {
    let subscribed = true;
    if (subscribed) {
      onRefresh();
    }

    () => {
      subscribed = false;
    };
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      studentId: "",
      firstName: "",
      middleName: "",
      lastName: "",
      class: undefined,
      semester: undefined,
      course: undefined,
      teacher: undefined,
    },
    validationSchema: updateEnrollmentSchema,
    onSubmit: async (values) => {
      setErrors(null);
      setIsSubmitting(true);
      toast.loading("Please wait a few minutes...", {
        toastId: "updateEnrollment",
      });

      const payload = {
        enrollmentId: state?.enrollmentId,
        data: {
          firstName: values?.firstName,
          middleName: values?.middleName,
          lastName: values?.lastName,
          mobileNo: values?.mobileNo?.toString(),
          enrollmentId: values?.enrollmentId,
        },
      };

      await updateEnrollment({ payload })
        .then((res) => {
          setErrors(null);

          toast.update("updateEnrollment", {
            isLoading: false,
            type: "success",
            render: "Successfully Enrollment Updated: " + values.enrollmentName,
            autoClose: 3000,
            closeOnClick: true,
          });

          setIsSubmitting(false);
          onRefresh();
        })
        .catch((err) => {
          toast.update("updateEnrollment", {
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

  let { semester, class: _class, studentId } = formik.values;

  const {
    data: studentData,
    isError: studentIsErr,
    isLoading: studentIsLoading,
    errMsg: studentErrMsg,
    refetch: studentRefetch,
  } = useApiCall(
    "STUDENT_DETAIL",
    urls.studentDetail(),
    {
      payload: {
        isMiniView: true,
        studentId: studentId || "",
      },
    },
    false
  );

  const {
    data: coursesData,
    isError: coursesIsErr,
    isLoading: coursesIsLoading,
    refetch: coursesRefetch,
  } = useApiCall(
    "COURSES_ENROLLMENT_CREATE",
    urls.courses(),
    {
      payload: {
        isMiniView: true,
        filters: {
          classSlug: _class?.value ?? "",
          semesterSlug: semester?.value ?? "",
        },
      },
    },
    false
  );

  const onEdit = () => {
    setIsEdit(!isEdit);
  };

  const onDelete = async () => {
    toast.loading("Please wait a few minutes...", {
      toastId: "deleteEnrollment",
    });

    setIsDeleting(true);
    await deleteEnrollment({
      payload: { enrollmentId: enrollment.techid },
    })
      .then((res) => {
        setErrors(null);

        toast.update("deleteEnrollment", {
          isLoading: false,
          type: "success",
          render:
            "Successfully Enrollment Deleted: " +
            `${enrollment?.firstname} ${enrollment?.middlename} - ${enrollment.stdid}`,
          autoClose: 3000,
          closeOnClick: true,
        });
        setDeleteModal(false);
        navigate("/enrollments");
        setIsDeleting(false);
      })
      .catch((err) => {
        toast.update("deleteEnrollment", {
          isLoading: false,
          type: "error",
          autoClose: 5000,
          render: err?.response?.data?.message ?? "Something went wrong!",
          closeOnClick: true,
        });
        console.log(err.response.data.message);
        setErrors(err?.response?.data?.message ?? err.message);
        setDeleteModal(false);
        setIsDeleting(false);
      });
  };

  if (enrollmentIsLoading) {
    return (
      <div className="page-content ">
        <Col lg={12} className="text-center mt-5">
          <Spinner />
        </Col>
      </div>
    );
  } else if (enrollmentIsErr) {
    return <ResError error={enrollmentErrMsg} />;
  }

  if (!enrollment) {
    return (
      <NotFound>
        <h3>Sorry!, Enrollment Not Found</h3>
        <Link className="btn btn-outline-info mt-3" to={"/enrollments"}>
          Go All Enrollments
        </Link>
      </NotFound>
    );
  }

  const getStudentData = () => {
    studentRefetch();
    setIsGetStudent(true);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              {error && <ResError error={error} />}
              {enrollmentIsErr && <ResError error={enrollmentErrMsg} />}
              <Card className="mx-n4 mt-n4 bg-info bg-white">
                <CardBody>
                  <div className="text-center mb-4">
                    <h5 className="mt-3 mb-1">{`${enrollment?.firstname} ${enrollment?.middlename} ${enrollment?.lastname}`}</h5>
                    <p className="text-muted mb-3">Enrollment</p>
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
                        className="btn btn-danger d-flex justify-content-center align-items-center"
                        type="button"
                        onClick={() => {
                          toggleDeleteModal();
                        }}
                        data-toggle="modal"
                      >
                        <i className="bx bx-trash align-baseline me-1"></i>
                        Delete
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
                        to={"/enrollments"}
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
            <Sidebar enrollment={enrollment} />
            <UpdateForm
              enrollment={enrollment}
              enrollmentId={state?.enrollmentId}
              isEdit={isEdit}
              formik={formik}
              isSubmitting={isSubmitting}
              semestersData={semestersData}
              classesData={classesData}
              coursesData={coursesData}
              studentData={studentData}
              isGetStudent={isGetStudent}
              coursesIsLoading={coursesIsLoading}
              classesIsLoading={classesIsLoading}
              semestersIsLoading={semestersIsLoading}
            />
          </Row>
        </Container>
      </div>

      <Modal
        isOpen={modal_backdrop}
        toggle={() => {
          toggleDeleteModal();
        }}
        backdrop={"static"}
        id="staticBackdrop"
      >
        <div className="modal-header">
          <h5 className="modal-title" id="deleteBackdropLabel">
            Are you sure?
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => {
              setDeleteModal(false);
            }}
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <p>
            Do you really want to delete these record{" "}
            <span className="fw-bold fs-6 text-primary">
              {`${enrollment?.firstname} ${enrollment?.middlename} - ${enrollment.stdid}`}
            </span>
            ? This process can't be undone.
          </p>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setDeleteModal(false);
            }}
          >
            Cancel
          </button>
          <button onClick={onDelete} type="button" className="btn btn-danger">
            {isDeleting ? <Spinner size={"sm"} /> : "Delete"}
          </button>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default EnrollmentDetail;

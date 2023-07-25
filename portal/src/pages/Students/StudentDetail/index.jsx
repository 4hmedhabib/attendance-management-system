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
import { updateStudentSchema } from "../../../validations/students";
import Sidebar from "./Sidebar";
import UpdateForm from "./UpdateForm";

const StudentDetail = () => {
  document.title = "Student Detail | FFU ATMS";

  const { state } = useLocation();

  if (!state?.studentId) {
    return (
      <NotFound>
        <h3>Sorry!, Student Id Not Found</h3>
        <Link className="btn btn-outline-info mt-3" to={"/students"}>
          Go All Students
        </Link>
      </NotFound>
    );
  }

  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setErrors] = useState(null);
  const [modal_backdrop, setDeleteModal] = useState(false);

  const {
    data: studentData,
    isError: studentIsErr,
    isLoading: studentIsLoading,
    errMsg: studentErrMsg,
    refetch: studentRefetch,
  } = useApiCall("STUDENT_DETAIL", urls.studentDetail(), {
    payload: {
      isMiniView: false,
      studentId: state.studentId,
    },
  });

  const { update: updateStudent } = useApiCall(
    "UPDATE_STUDENT",
    urls.updateStudent(),
    {
      payload: {
        isMiniView: true,
        filters: {
          studentId: state.studentId,
        },
      },
    },
    false
  );

  const { remove: deleteStudent } = useApiCall(
    "DELETE_STUDENT",
    urls.deleteStudent(),
    {
      payload: {
        isMiniView: true,
        filters: {
          studentId: state.studentId,
        },
      },
    },
    false
  );

  useEffect(() => {
    if (studentData) {
      setStudent(studentData.data);
    }
  }, [studentData]);

  const onRefresh = useCallback(() => {
    studentRefetch({
      payload: {
        isMiniView: false,
        studentId: state.studentId,
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
      firstName: student?.firstname ?? "",
      middleName: student?.middlename ?? "",
      lastName: student?.lastname ?? "",
      mobileNo: student?.mobileno?.toString() ?? "",
      studentId: student?.techid?.toUpperCase() ?? "",
    },
    validationSchema: updateStudentSchema,
    onSubmit: async (values) => {
      setErrors(null);
      setIsSubmitting(true);
      toast.loading("Please wait a few minutes...", {
        toastId: "updateStudent",
      });

      const payload = {
        studentId: state?.studentId,
        data: {
          firstName: values?.firstName,
          middleName: values?.middleName,
          lastName: values?.lastName,
          mobileNo: values?.mobileNo?.toString(),
          studentId: values?.studentId,
        },
      };

      await updateStudent({ payload })
        .then((res) => {
          setErrors(null);

          toast.update("updateStudent", {
            isLoading: false,
            type: "success",
            render: "Successfully Student Updated: " + values.studentName,
            autoClose: 3000,
            closeOnClick: true,
          });

          setIsSubmitting(false);
          onRefresh();
        })
        .catch((err) => {
          toast.update("updateStudent", {
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

  const onDelete = async () => {
    toast.loading("Please wait a few minutes...", {
      toastId: "deleteStudent",
    });

    setIsDeleting(true);
    await deleteStudent({
      payload: { studentId: student.techid },
    })
      .then((res) => {
        setErrors(null);

        toast.update("deleteStudent", {
          isLoading: false,
          type: "success",
          render: "Successfully Student Deleted: " + student?.studentname,
          autoClose: 3000,
          closeOnClick: true,
        });
        setDeleteModal(false);
        navigate("/students");
        setIsDeleting(false);
      })
      .catch((err) => {
        toast.update("deleteStudent", {
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

  if (studentIsLoading) {
    return (
      <div className="page-content ">
        <Col lg={12} className="text-center mt-5">
          <Spinner />
        </Col>
      </div>
    );
  } else if (studentIsErr) {
    return <ResError error={studentErrMsg} />;
  }

  if (!student) {
    return (
      <NotFound>
        <h3>Sorry!, Student Not Found</h3>
        <Link className="btn btn-outline-info mt-3" to={"/students"}>
          Go All Students
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
              {studentIsErr && <ResError error={studentErrMsg} />}
              <Card className="mx-n4 mt-n4 bg-info bg-white">
                <CardBody>
                  <div className="text-center mb-4">
                    <h5 className="mt-3 mb-1">{`${student?.firstname} ${student?.middlename} ${student?.lastname}`}</h5>
                    <p className="text-muted mb-3">Student</p>
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
                        to={"/students"}
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
            <Sidebar student={student} />
            <UpdateForm
              student={student}
              studentId={state?.studentId}
              isEdit={isEdit}
              formik={formik}
              isSubmitting={isSubmitting}
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
              {student?.studentname}{" "}
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

export default StudentDetail;

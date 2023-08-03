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
import slugify from "slugify";
import urls from "../../../api/urls";
import NotFound from "../../../components/Common/NotFound";
import ResError from "../../../components/Common/ResError";
import useApiCall from "../../../hooks/apiHook";
import { updateSemesterSchema } from "../../../validations/semesters";
import Sidebar from "./Sidebar";
import UpdateForm from "./UpdateForm";

const SemesterDetail = () => {
  document.title = "Semester Detail | FFU ATMS";

  const { state } = useLocation();

  if (!state?.semesterSlug) {
    return (
      <NotFound>
        <h3>Sorry!, Semester Id Not Found</h3>
        <Link className="btn btn-outline-info mt-3" to={"/semesters"}>
          Go All Semesters
        </Link>
      </NotFound>
    );
  }

  const navigate = useNavigate();

  const [semester, setSemester] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setErrors] = useState(null);
  const [modal_backdrop, setDeleteModal] = useState(false);

  const {
    data: semesterData,
    isError: semesterIsErr,
    isLoading: semesterIsLoading,
    errMsg: semesterErrMsg,
    refetch: semesterRefetch,
  } = useApiCall("SEMESTER_DETAIL", urls.semesterDetail(), {
    payload: {
      isMiniView: false,
      semesterSlug: state.semesterSlug,
    },
  });

  const {
    data: classesData,
    isError: classesIsErr,
    isLoading: classesIsLoading,
    errMsg: classesErrMsg,
    refetch: classesRefetch,
  } = useApiCall(
    "CLASSES_SEMESTER_DETAIL",
    urls.classes(),
    {
      payload: {
        isMiniView: true,
        filters: {
          semesterSlug: state.semesterSlug,
        },
      },
    },
    false
  );

  const {
    data: usersData,
    isError: usersIsErr,
    isLoading: usersIsLoading,
    errMsg: usersErrMsg,
    refetch: usersRefetch,
  } = useApiCall(
    "USERS_SEMESTER_DETAIL",
    urls.users(),
    {
      payload: {
        isMiniView: true,
        filters: {
          isAdmin: true,
        },
      },
    },
    false
  );

  const { update: updateSemester } = useApiCall(
    "UPDATE_SEMESTER",
    urls.updateSemester(),
    {
      payload: {
        isMiniView: true,
        filters: {
          semesterSlug: state.semesterSlug,
        },
      },
    },
    false
  );

  const { remove: deleteSemester } = useApiCall(
    "DELETE_SEMESTER",
    urls.deleteSemester(),
    {
      payload: {
        isMiniView: true,
        filters: {
          semesterSlug: state.semesterSlug,
        },
      },
    },
    false
  );

  useEffect(() => {
    if (semesterData) {
      setSemester(semesterData.data);
    }
  }, [semesterData]);

  const onRefresh = useCallback(() => {
    semesterRefetch({
      payload: {
        isMiniView: false,
        semesterSlug: state.semesterSlug,
      },
    });
    usersRefetch({
      payload: {
        isMiniView: true,
        filters: {
          isAdmin: true,
        },
      },
    });
    classesRefetch({
      payload: {
        isMiniView: true,
        filters: {
          semesterSlug: state.semesterSlug,
        },
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
      semesterName: semester?.semestername ?? "",
      description: semester?.description ?? "",
      manager: semester?.manager
        ? {
            label: `${semester?.manager?.firstname} ${semester?.manager?.middlename} ${semester?.manager?.lastname}`,
            value: semester?.manager.username,
          }
        : undefined,
      deputy: undefined,
    },
    validationSchema: updateSemesterSchema,
    onSubmit: async (values) => {
      setErrors(null);
      setIsSubmitting(true);
      toast.loading("Please wait a few minutes...", {
        toastId: "updateSemester",
      });

      const payload = {
        semesterSlug: state?.semesterSlug,
        data: {
          semesterName: values.semesterName,
          semesterSlug: slugify(values.semesterName?.toLowerCase(), "_"),
          description: values.description,
        },
      };

      await updateSemester({ payload })
        .then((res) => {
          setErrors(null);

          toast.update("updateSemester", {
            isLoading: false,
            type: "success",
            render: "Successfully Semester Updated: " + values.semesterName,
            autoClose: 3000,
            closeOnClick: true,
          });

          setIsSubmitting(false);
          onRefresh();
        })
        .catch((err) => {
          console.log("----++++-");
          toast.update("updateSemester", {
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
      toastId: "deleteSemester",
    });

    setIsDeleting(true);
    await deleteSemester({
      payload: { semesterSlug: semester.semesterslug },
    })
      .then((res) => {
        setErrors(null);

        toast.update("deleteSemester", {
          isLoading: false,
          type: "success",
          render: "Successfully Semester Deleted: " + semester?.semestername,
          autoClose: 3000,
          closeOnClick: true,
        });
        setDeleteModal(false);
        navigate("/semesters");
        setIsDeleting(false);
      })
      .catch((err) => {
        toast.update("deleteSemester", {
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

  if (semesterIsLoading) {
    return (
      <div className="page-content ">
        <Col lg={12} className="text-center mt-5">
          <Spinner />
        </Col>
      </div>
    );
  } else if (semesterIsErr) {
    return <ResError error={semesterErrMsg} />;
  }

  if (!semester) {
    return (
      <NotFound>
        <h3>Sorry!, Semester Not Found</h3>
        <Link className="btn btn-outline-info mt-3" to={"/semesters"}>
          Go All Semesters
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
              {semesterIsErr && <ResError error={semesterErrMsg} />}
              <Card className="mx-n4 mt-n4 bg-info bg-white">
                <CardBody>
                  <div className="text-center mb-4">
                    <h5 className="mt-3 mb-1">{semester?.semestername}</h5>
                    <p className="text-muted mb-3">Semester</p>
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
                        to={"/semesters"}
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
            <Sidebar semester={semester} />
            <UpdateForm
              semester={semester}
              semesterSlug={state?.semesterSlug}
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
              {semester?.semestername}{" "}
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

export default SemesterDetail;

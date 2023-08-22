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
import { updateClassSchema } from "../../../validations";
import Sessions from "./Sessions";
import Sidebar from "./Sidebar";
import UpdateForm from "./UpdateForm";

const ClassDetail = () => {
  document.title = "Class Detail | FFU ATMS";

  const { state } = useLocation();

  if (!state?.classSlug) {
    return (
      <NotFound>
        <h3>Sorry!, Class Id Not Found</h3>
        <Link className="btn btn-outline-info mt-3" to={"/classes"}>
          Go All Classes
        </Link>
      </NotFound>
    );
  }

  const navigate = useNavigate();

  const [_class, setClass] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setErrors] = useState(null);
  const [modal_backdrop, setDeleteModal] = useState(false);
  const [showSessions, setShowSessions] = useState(true);

  const {
    data: classData,
    isError: classIsErr,
    isLoading: classIsLoading,
    errMsg: classErrMsg,
    refetch: classRefetch,
  } = useApiCall("CLASS_DETAIL", urls.classDetail(), {
    payload: {
      isMiniView: false,
      classSlug: state.classSlug,
    },
  });

  const {
    data: shiftsData,
    isError: shiftsIsErr,
    isLoading: shiftsIsLoading,
    errMsg: shiftsErrMsg,
    refetch: shiftsRefetch,
  } = useApiCall(
    "SHIFTS_CLASS_CREATE",
    urls.shifts(),
    {
      payload: {
        isMiniView: true,
      },
    },
    false
  );

  const {
    data: facultiesData,
    isError: facultiesIsErr,
    errMsg: facultiesErrMsg,
    isLoading: facultiesIsLoading,
    refetch: facultiesRefetch,
  } = useApiCall(
    "FACULTIES_CLASS_CREATE",
    urls.faculties(),
    {
      payload: {
        isMiniView: true,
      },
    },
    false
  );

  const { update: updateClass } = useApiCall(
    "UPDATE_CLASS",
    urls.updateClass(),
    {
      payload: {
        isMiniView: true,
        filters: {
          classSlug: state.classSlug,
        },
      },
    },
    false
  );

  const { remove: deleteClass } = useApiCall(
    "DELETE_CLASS",
    urls.deleteClass(),
    {
      payload: {
        isMiniView: true,
        filters: {
          classSlug: state.classSlug,
        },
      },
    },
    false
  );

  useEffect(() => {
    if (classData) {
      setClass(classData.data);
    }
  }, [classData]);

  const onRefresh = useCallback(() => {
    classRefetch({
      payload: {
        isMiniView: false,
        classSlug: state.classSlug,
      },
    });
    facultiesRefetch({
      payload: {
        isMiniView: true,
      },
    });
    shiftsRefetch({
      payload: {
        isMiniView: true,
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
      className: _class?.classname ?? "",
      description: _class?.description ?? "",
      facultySlug: _class?.faculty
        ? {
            label: _class?.faculty?.facultyname,
            value: _class?.faculty.facultyslug,
          }
        : undefined,
      shiftSlug: _class?.shift
        ? {
            label: _class?.shift?.shiftname,
            value: _class?.shift.shiftslug,
          }
        : undefined,
    },
    validationSchema: updateClassSchema,
    onSubmit: async (values) => {
      setErrors(null);
      setIsSubmitting(true);
      toast.loading("Please wait a few minutes...", {
        toastId: "updateClass",
      });

      const payload = {
        classSlug: state?.classSlug,
        data: {
          className: values.className,
          classSlug: slugify(values.className?.toLowerCase(), "_"),
          description: values.description,
          shiftSlug: values?.shiftSlug?.value ?? "",
          facultySlug: values?.facultySlug?.value ?? "",
        },
      };

      await updateClass({ payload })
        .then(() => {
          setErrors(null);

          toast.update("updateClass", {
            isLoading: false,
            type: "success",
            render: "Successfully Class Updated: " + values.className,
            autoClose: 3000,
            closeOnClick: true,
          });

          setIsSubmitting(false);
          onRefresh();
        })
        .catch((err) => {
          toast.update("updateClass", {
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
      toastId: "deleteClass",
    });

    setIsDeleting(true);
    await deleteClass({
      payload: { classSlug: _class.classslug },
    })
      .then(() => {
        setErrors(null);

        toast.update("deleteClass", {
          isLoading: false,
          type: "success",
          render: "Successfully Class Deleted: " + _class?.classname,
          autoClose: 3000,
          closeOnClick: true,
        });
        setDeleteModal(false);
        navigate("/classes");
        setIsDeleting(false);
      })
      .catch((err) => {
        toast.update("deleteClass", {
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

  if (classIsLoading) {
    return (
      <div className="page-content ">
        <Col lg={12} className="text-center mt-5">
          <Spinner />
        </Col>
      </div>
    );
  } else if (classIsErr) {
    return <ResError error={classErrMsg} />;
  }

  if (!_class) {
    return (
      <NotFound>
        <h3>Sorry!, Class Not Found</h3>
        <Link className="btn btn-outline-info mt-3" to={"/classes"}>
          Go All Classes
        </Link>
      </NotFound>
    );
  }

  return (
    <React.Fragment>
      {!showSessions && (
        <>
          <div className="page-content">
            <Container fluid>
              <Row>
                <Col lg={12}>
                  {error && <ResError error={error} />}
                  {classIsErr && <ResError error={classErrMsg} />}
                  <Card className="mx-n4 mt-n4 bg-info bg-white">
                    <CardBody>
                      <div className="text-center mb-4">
                        <h5 className="mt-3 mb-1">{_class?.classname}</h5>
                        <p className="text-muted mb-3">Class</p>
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
                            to={"/classes"}
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
                <Sidebar _class={_class} />
                <UpdateForm
                  _class={_class}
                  classSlug={state?.classSlug}
                  isEdit={isEdit}
                  facultiesData={facultiesData}
                  facultiesIsErr={facultiesIsErr}
                  facultiesErrMsg={facultiesErrMsg}
                  facultiesIsLoading={facultiesIsLoading}
                  shiftsData={shiftsData}
                  shiftsIsErr={shiftsIsErr}
                  shiftsIsLoading={shiftsIsLoading}
                  shiftsErrMsg={shiftsErrMsg}
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
                  {_class?.classname}{" "}
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
              <button
                onClick={onDelete}
                type="button"
                className="btn btn-danger"
              >
                {isDeleting ? <Spinner size={"sm"} /> : "Delete"}
              </button>
            </div>
          </Modal>
        </>
      )}

      {showSessions && <Sessions />}
    </React.Fragment>
  );
};

export default ClassDetail;

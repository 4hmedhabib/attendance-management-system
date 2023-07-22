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
import urls from "../../../../api/urls";
import NotFound from "../../../../components/Common/NotFound";
import ResError from "../../../../components/Common/ResError";
import useApiCall from "../../../../hooks/apiHook";
import { updateShiftSchema } from "../../../../validations/shifts";
import Sidebar from "./Sidebar";
import UpdateForm from "./UpdateForm";

const ShiftDetail = () => {
  document.title = "Shift Detail | FFU ATMS";

  const { state } = useLocation();

  if (!state?.shiftSlug) {
    return (
      <NotFound>
        <h3>Sorry!, Shift Id Not Found</h3>
        <Link className="btn btn-outline-info mt-3" to={"/shifts"}>
          Go All Shifts
        </Link>
      </NotFound>
    );
  }

  const navigate = useNavigate();

  const [shift, setShift] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setErrors] = useState(null);
  const [modal_backdrop, setDeleteModal] = useState(false);

  const {
    data: shiftData,
    isError: shiftIsErr,
    isLoading: shiftIsLoading,
    errMsg: shiftErrMsg,
    refetch: shiftRefetch,
  } = useApiCall("SHIFT_DETAIL", urls.shiftDetail(), {
    payload: {
      isMiniView: false,
      shiftSlug: state.shiftSlug,
    },
  });

  const {
    data: classesData,
    isError: classesIsErr,
    isLoading: classesIsLoading,
    errMsg: classesErrMsg,
    refetch: classesRefetch,
  } = useApiCall(
    "CLASSES_SHIFT_DETAIL",
    urls.classes(),
    {
      payload: {
        isMiniView: true,
        filters: {
          shiftSlug: state.shiftSlug,
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
    "USERS_SHIFT_DETAIL",
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

  const { update: updateShift } = useApiCall(
    "UPDATE_SHIFT",
    urls.updateShift(),
    {
      payload: {
        isMiniView: true,
        filters: {
          shiftSlug: state.shiftSlug,
        },
      },
    },
    false
  );

  const { remove: deleteShift } = useApiCall(
    "DELETE_SHIFT",
    urls.deleteShift(),
    {
      payload: {
        isMiniView: true,
        filters: {
          shiftSlug: state.shiftSlug,
        },
      },
    },
    false
  );

  useEffect(() => {
    if (shiftData) {
      setShift(shiftData.data);
    }
  }, [shiftData]);

  const onRefresh = useCallback(() => {
    shiftRefetch({
      payload: {
        isMiniView: false,
        shiftSlug: state.shiftSlug,
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
          shiftSlug: state.shiftSlug,
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
      shiftName: shift?.shiftname ?? "",
      description: shift?.description ?? "",
      manager: shift?.manager
        ? {
            label: `${shift?.manager?.firstname} ${shift?.manager?.middlename} ${shift?.manager?.lastname}`,
            value: shift?.manager.username,
          }
        : undefined,
      deputy: undefined,
    },
    validationSchema: updateShiftSchema,
    onSubmit: async (values) => {
      setErrors(null);
      setIsSubmitting(true);
      toast.loading("Please wait a few minutes...", {
        toastId: "updateShift",
      });

      const payload = {
        shiftSlug: state?.shiftSlug,
        data: {
          shiftName: values.shiftName,
          shiftSlug: slugify(values.shiftName?.toLowerCase(), "_"),
          description: values.description,
        },
      };

      await updateShift({ payload })
        .then((res) => {
          setErrors(null);

          toast.update("updateShift", {
            isLoading: false,
            type: "success",
            render: "Successfully Shift Updated: " + values.shiftName,
            autoClose: 3000,
            closeOnClick: true,
          });

          setIsSubmitting(false);
          onRefresh();
        })
        .catch((err) => {
          console.log("----++++-");
          toast.update("updateShift", {
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
      toastId: "deleteShift",
    });

    setIsDeleting(true);
    await deleteShift({
      payload: { shiftSlug: shift.shiftslug },
    })
      .then((res) => {
        setErrors(null);

        toast.update("deleteShift", {
          isLoading: false,
          type: "success",
          render: "Successfully Shift Deleted: " + shift?.shiftname,
          autoClose: 3000,
          closeOnClick: true,
        });
        setDeleteModal(false);
        navigate("/shifts");
        setIsDeleting(false);
      })
      .catch((err) => {
        toast.update("deleteShift", {
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

  if (shiftIsLoading) {
    return (
      <div className="page-content ">
        <Col lg={12} className="text-center mt-5">
          <Spinner />
        </Col>
      </div>
    );
  } else if (shiftIsErr) {
    return <ResError error={shiftErrMsg} />;
  }

  if (!shift) {
    return (
      <NotFound>
        <h3>Sorry!, Shift Not Found</h3>
        <Link className="btn btn-outline-info mt-3" to={"/shifts"}>
          Go All Shifts
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
              {shiftIsErr && <ResError error={shiftErrMsg} />}
              <Card className="mx-n4 mt-n4 bg-info bg-white">
                <CardBody>
                  <div className="text-center mb-4">
                    <h5 className="mt-3 mb-1">{shift?.shiftname}</h5>
                    <p className="text-muted mb-3">Shift</p>
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
                        to={"/shifts"}
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
            <Sidebar shift={shift} />
            <UpdateForm
              shift={shift}
              shiftSlug={state?.shiftSlug}
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
              {shift?.shiftname}{" "}
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

export default ShiftDetail;

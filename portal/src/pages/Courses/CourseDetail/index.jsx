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
import NotFound from "../../../components/Common/NotFound";
import ResError from "../../../components/Common/ResError";
import useApiCall from "../../../hooks/apiHook";
import { updateCourseSchema } from "../../../validations/courses";
import Sidebar from "./Sidebar";
import UpdateForm from "./UpdateForm";
import urls from "../../../api/urls";

const CourseDetail = () => {
  document.title = "Course Detail | FFU ATMS";

  const { state } = useLocation();

  if (!state?.courseSlug) {
    return (
      <NotFound>
        <h3>Sorry!, Course Id Not Found</h3>
        <Link className="btn btn-outline-info mt-3" to={"/courses"}>
          Go All Courses
        </Link>
      </NotFound>
    );
  }

  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setErrors] = useState(null);
  const [modal_backdrop, setDeleteModal] = useState(false);

  const {
    data: courseData,
    isError: courseIsErr,
    isLoading: courseIsLoading,
    errMsg: courseErrMsg,
    refetch: courseRefetch,
  } = useApiCall("COURSE_DETAIL", urls.courseDetail(), {
    payload: {
      isMiniView: false,
      courseSlug: state.courseSlug,
    },
  });

  const { update: updateCourse } = useApiCall(
    "UPDATE_COURSE",
    urls.updateCourse(),
    {
      payload: {
        isMiniView: true,
        filters: {
          courseSlug: state.courseSlug,
        },
      },
    },
    false
  );

  const { remove: deleteCourse } = useApiCall(
    "DELETE_COURSE",
    urls.deleteCourse(),
    {
      payload: {
        isMiniView: true,
        filters: {
          courseSlug: state.courseSlug,
        },
      },
    },
    false
  );

  useEffect(() => {
    if (courseData) {
      setCourse(courseData.data);
    }
  }, [courseData]);

  const onRefresh = useCallback(() => {
    courseRefetch({
      payload: {
        isMiniView: false,
        courseSlug: state.courseSlug,
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
      courseName: course?.coursename ?? "",
      description: course?.description ?? "",
    },
    validationSchema: updateCourseSchema,
    onSubmit: async (values) => {
      setErrors(null);
      setIsSubmitting(true);
      toast.loading("Please wait a few minutes...", {
        toastId: "updateCourse",
      });

      const payload = {
        courseSlug: state?.courseSlug,
        data: {
          courseName: values.courseName,
          courseSlug: slugify(values.courseName?.toLowerCase(), "_"),
          description: values.description,
        },
      };

      await updateCourse({ payload })
        .then((res) => {
          setErrors(null);

          toast.update("updateCourse", {
            isLoading: false,
            type: "success",
            render: "Successfully Course Updated: " + values.courseName,
            autoClose: 3000,
            closeOnClick: true,
          });

          setIsSubmitting(false);
          onRefresh();
        })
        .catch((err) => {
          toast.update("updateCourse", {
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
      toastId: "deleteCourse",
    });

    setIsDeleting(true);
    await deleteCourse({
      payload: { courseSlug: course.courseslug },
    })
      .then((res) => {
        setErrors(null);

        toast.update("deleteCourse", {
          isLoading: false,
          type: "success",
          render: "Successfully Course Deleted: " + course?.coursename,
          autoClose: 3000,
          closeOnClick: true,
        });
        setDeleteModal(false);
        navigate("/courses");
        setIsDeleting(false);
      })
      .catch((err) => {
        toast.update("deleteCourse", {
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

  if (courseIsLoading) {
    return (
      <div className="page-content ">
        <Col lg={12} className="text-center mt-5">
          <Spinner />
        </Col>
      </div>
    );
  } else if (courseIsErr) {
    return <ResError error={courseErrMsg} />;
  }

  if (!course) {
    return (
      <NotFound>
        <h3>Sorry!, Course Not Found</h3>
        <Link className="btn btn-outline-info mt-3" to={"/courses"}>
          Go All Courses
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
              {courseIsErr && <ResError error={courseErrMsg} />}
              <Card className="mx-n4 mt-n4 bg-info bg-white">
                <CardBody>
                  <div className="text-center mb-4">
                    <h5 className="mt-3 mb-1">{course?.coursename}</h5>
                    <p className="text-muted mb-3">Course</p>
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
                        to={"/courses"}
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
            <Sidebar course={course} />
            <UpdateForm
              course={course}
              courseSlug={state?.courseSlug}
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
              {course?.coursename}{" "}
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

export default CourseDetail;

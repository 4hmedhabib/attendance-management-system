import "bootstrap/dist/css/bootstrap.min.css";
import React, { useCallback, useEffect, useState } from "react";

import { Button, Card, CardBody, Col, Row } from "reactstrap";
import urls from "../../../../../api/urls";
import ResError from "../../../../../components/Common/ResError";
import useApiCall from "../../../../../hooks/apiHook";
import Create from "./Create";
import Sessions from "./Sessions";

function ClassSemesterCourses({
  onBackClassSemesterCourses,
  selectedSemester,
}) {
  //meta title
  document.title = "ClassSemesterCourses | FFU - ATMS";

  const [classSemesterCourses, setClassSemesterCourses] = useState([]);
  const [showCourses, setCourses] = useState(false);
  const [showSessions, setShowSessions] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [createClassSemesterCourses, setCreateClassSemesterCourses] =
    useState(false);
  const [selectedClassSemesterCourses, setSelectedClassSemesterCourses] =
    useState(null);

  const {
    data,
    isError,
    isLoading,
    errMsg,
    refetch: classClassSemesterCoursesCoursesRefetch,
  } = useApiCall(
    "CLASS_SEMESTER_COURSES_LIST",
    urls.classSemesterCourses(),
    {
      payload: {
        classSlug: selectedSemester?.class?.classslug,
        semesterSlug: selectedSemester?.semester?.semesterslug,
        isMiniView: true,
      },
    },
    false
  );

  useEffect(() => {
    if (data) {
      setClassSemesterCourses(data.data);
    }
  }, [data]);

  const onRefresh = useCallback(() => {
    classClassSemesterCoursesCoursesRefetch({
      payload: {
        isMiniView: false,
        filters: {
          semesterSlug: "semester_1",
          classSlug: null,
        },
      },
    });
  }, []);

  useEffect(() => {
    onRefresh();
  }, [onRefresh, createClassSemesterCourses]);

  const onBack = () => {
    onBackClassSemesterCourses(false);
  };

  const onAddClassSemesterCourses = () => {
    setCreateClassSemesterCourses(true);
  };

  const onShowSessions = (course) => {
    setShowSessions(true);
    setSelectedCourse(course);
  };

  return (
    <React.Fragment>
      <div className="container-fluid">
        {isError && !createClassSemesterCourses && !showCourses && (
          <ResError error={errMsg} />
        )}

        {!showCourses && !showSessions && (
          <>
            {!createClassSemesterCourses && (
              <Row>
                <Col xs="12">
                  <Card>
                    <CardBody>
                      <div className="d-flex align-items-center gap-2 justify-content-between">
                        <div>
                          <h4 className="card-title">Semester Courses</h4>
                        </div>

                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-success d-flex justify-content-center align-items-center"
                            onClick={onAddClassSemesterCourses}
                          >
                            <i className="bx bx-caret-right align-baseline me-1"></i>
                            Add Course
                          </button>
                          <button
                            className="btn btn-secondary d-flex justify-content-center align-items-center"
                            onClick={onBack}
                          >
                            <i className="bx bx-caret-left align-baseline me-1"></i>
                            Back
                          </button>
                        </div>
                      </div>

                      <Row>
                        {classSemesterCourses?.map((course, idx) => (
                          <Col key={idx} sm="6" md="4">
                            <div className="border p-3 rounded mt-4">
                              <Row>
                                <div className="d-flex align-items-center mb-3 col-6">
                                  <div className="avatar-xs me-3">
                                    <span className="avatar-title rounded-circle bg-info bg-soft text-info font-size-18">
                                      <i className="mdi mdi-book-open" />
                                    </span>
                                  </div>
                                  <h5 className="font-size-14 mb-0">
                                    {course?.course?.coursename}
                                  </h5>
                                </div>
                                <div className="col-6 align-self-start text-danger fs-5 text-end">
                                  <i className="bx bxs-trash mr-1 btn text-danger" />
                                </div>
                              </Row>

                              <Row>
                                <div className="col-lg-8">
                                  <div className="text-muted mt-3">
                                    <p className="d-flex align-items-center">
                                      <i className="bx bxs-user-voice mr-1" />
                                      {`${course?.teacher?.firstname} ${course?.teacher?.middlename}`}
                                    </p>
                                    <p>Students</p>
                                    <h4>{course?._count?.enrollments}</h4>
                                  </div>
                                </div>

                                <div className="col-lg-4 align-self-end">
                                  <div className="float-end mt-3">
                                    <Button
                                      onClick={() => onShowSessions(course)}
                                      className="btn btn-primary btn-sm"
                                    >
                                      View Sessions
                                    </Button>
                                  </div>
                                </div>
                              </Row>
                            </div>
                          </Col>
                        ))}

                        {classSemesterCourses.length <= 0 && (
                          <div className="mx-4 mt-5 mb-4 text-center">
                            <h4 className="bg-light d-inline px-5 py-2 rounded-3">
                              No Data Found!
                            </h4>
                          </div>
                        )}
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            )}

            {createClassSemesterCourses && !showSessions && (
              <Create
                onShowCreateSemesterCourse={setCreateClassSemesterCourses}
                selectedSemester={selectedSemester}
                oldCourses={classSemesterCourses.map((course) => course.course)}
              />
            )}
          </>
        )}

        {selectedCourse && showSessions && (
          <Sessions
            selectedSemester={selectedSemester}
            selectedCourse={selectedCourse}
            setShowSessions={setShowSessions}
            setSelectedCourse={setSelectedCourse}
          />
        )}
      </div>
    </React.Fragment>
  );
}

export default ClassSemesterCourses;

import "bootstrap/dist/css/bootstrap.min.css";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import urls from "../../../../../api/urls";
import ResError from "../../../../../components/Common/ResError";
import useApiCall from "../../../../../hooks/apiHook";
import Create from "./Create";

function ClassSemesterCourses({
  onBackClassSemesterCourses,
  selectedSemester,
}) {
  //meta title
  document.title = "ClassSemesterCourses | FFU - ATMS";

  const [classSemesterCourses, setClassSemesterCourses] = useState([]);
  const [showCourses, setCourses] = useState(false);
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
        classSlug: "class_ict_2223",
        semesterSlug: "semester_6",
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

  return (
    <React.Fragment>
      <div className="container-fluid">
        {isError && !createClassSemesterCourses && !showCourses && (
          <ResError error={errMsg} />
        )}

        {!showCourses && (
          <>
            {!createClassSemesterCourses && (
              <Row>
                <Col xs="12">
                  <Card>
                    <CardBody>
                      <div className="d-flex align-items-center gap-2 justify-content-between">
                        <h4 className="card-title">Semester Courses</h4>

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
                        {classSemesterCourses?.map((course, idx) => {
                          console.log(course);
                          return (
                            <Col key={idx} sm="6" md="4" xl="3">
                              <div className="border p-3 rounded mt-4">
                                <div className="d-flex align-items-center mb-3">
                                  <div className="avatar-xs me-3">
                                    <span className="avatar-title rounded-circle bg-info bg-soft text-info font-size-18">
                                      <i className="mdi mdi-book-open" />
                                    </span>
                                  </div>
                                  <h5 className="font-size-14 mb-0">
                                    {course?.course?.coursename}
                                  </h5>
                                </div>

                                <Row>
                                  <div className="col-lg-6">
                                    <div className="text-muted mt-3">
                                      <p>{`${course?.teacher?.firstname} ${course?.teacher?.middlename}`}</p>
                                      <h4>{course?._count?.enrollments}</h4>
                                    </div>
                                  </div>

                                  <div className="col-lg-6 align-self-end">
                                    <div className="float-end mt-3">
                                      <Link
                                        to="/courses/detail"
                                        state={{
                                          courseSlug:
                                            course?.course?.courseslug,
                                        }}
                                        className="btn btn-primary"
                                      >
                                        View
                                      </Link>
                                    </div>
                                  </div>
                                </Row>
                              </div>
                            </Col>
                          );
                        })}
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            )}

            {createClassSemesterCourses && (
              <Create
                onShowCreateClassSemesterCourses={setCreateClassSemesterCourses}
                classData={classData}
              />
            )}
          </>
        )}
      </div>
    </React.Fragment>
  );
}

export default ClassSemesterCourses;

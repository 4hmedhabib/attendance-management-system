import "bootstrap/dist/css/bootstrap.min.css";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useMemo, useState } from "react";

//import components
import Breadcrumbs from "../../../../components/Common/Breadcrumb";

import { Link, useNavigate } from "react-router-dom";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import urls from "../../../../api/urls";
import ResError from "../../../../components/Common/ResError";
import useApiCall from "../../../../hooks/apiHook";
import Courses from "./Courses";
import Create from "./Create";

function Semesters({ onShowSemester, classData }) {
  //meta title
  document.title = "Semesters | FFU - ATMS";

  const [semesters, setSemesters] = useState([]);
  const [showClassSemesterCourses, setShowClassSemesterCourses] =
    useState(false);
  const [createSemester, setCreateSemester] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState(null);

  const {
    data,
    isError,
    isLoading,
    errMsg,
    refetch: classSemestersRefetch,
  } = useApiCall(
    "SEMESTER_LIST",
    urls.classSemesters(),
    {
      payload: {
        isMiniView: true,
        classSlug: classData.classslug,
      },
    },
    false
  );

  useEffect(() => {
    if (data) {
      setSemesters(data.data);
    }
  }, [data]);

  const onRefresh = useCallback(() => {
    classSemestersRefetch({
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
  }, [onRefresh, createSemester]);

  const onBack = () => {
    onShowSemester(false);
  };

  const onAddSemester = () => {
    setCreateSemester(true);
  };

  const onViewClassSemesterCourses = (semesterSlug) => {
    setSelectedSemester(
      semesters.find(
        (semester) => semester.semester.semesterslug === semesterSlug || null
      )
    );
    setShowClassSemesterCourses(true);
  };

  const onBackClassSemesterCourses = () => {
    setShowClassSemesterCourses(false);
    setSelectedSemester(null);
  };

  return (
    <React.Fragment>
      <div className="container-fluid">
        {isError && !createSemester && !showClassSemesterCourses && (
          <ResError error={errMsg} />
        )}

        {!showClassSemesterCourses && (
          <>
            {!createSemester && (
              <Row>
                <Col xs="12">
                  <Card>
                    <CardBody>
                      <div className="d-flex align-items-center gap-2 justify-content-between">
                        <h4 className="card-title">Semesters</h4>

                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-success d-flex justify-content-center align-items-center"
                            onClick={onAddSemester}
                          >
                            <i className="bx bx-caret-right align-baseline me-1"></i>
                            Add Semester
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
                        {semesters?.map((semester, idx) => (
                          <Col key={idx} sm="6" md="4" xl="3">
                            <div className="border p-3 rounded mt-4">
                              <div className="d-flex align-items-center mb-3">
                                <div className="avatar-xs me-3">
                                  <span className="avatar-title rounded-circle bg-secondary bg-soft text-secondary font-size-18">
                                    <i className="mdi mdi-book-education" />
                                  </span>
                                </div>
                                <h5 className="font-size-14 mb-0">
                                  {semester?.semester?.semestername}
                                </h5>
                              </div>

                              <Row>
                                <div className="col-lg-6">
                                  <div className="text-muted mt-3">
                                    Courses
                                    <h4>{semester?._count?.courses}</h4>
                                  </div>
                                </div>

                                <div className="col-lg-6 align-self-end">
                                  <div className="float-end mt-3">
                                    <button
                                      onClick={() =>
                                        onViewClassSemesterCourses(
                                          semester?.semester?.semesterslug
                                        )
                                      }
                                      className="btn btn-primary"
                                    >
                                      View
                                    </button>
                                  </div>
                                </div>
                              </Row>
                            </div>
                          </Col>
                        ))}

                        {semesters.length <= 0 && (
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

            {createSemester && (
              <Create
                onShowCreateSemester={setCreateSemester}
                classData={classData}
              />
            )}
          </>
        )}

        {showClassSemesterCourses && selectedSemester && (
          <Courses
            selectedSemester={selectedSemester}
            onBackClassSemesterCourses={onBackClassSemesterCourses}
          />
        )}
      </div>
    </React.Fragment>
  );
}

export default Semesters;
// export { default as CreateSemester } from "./CreateSemester";
// export { default as SemesterDetail } from "./SemesterDetail";

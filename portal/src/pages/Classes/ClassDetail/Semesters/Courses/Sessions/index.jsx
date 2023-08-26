import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Label,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";

import TableContainer from "../../../../../../components/Common/TableContainer";

//Date Picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import dayjs from "dayjs";
import { toast } from "react-toastify";
import urls from "../../../../../../api/urls";
import useApiCall from "../../../../../../hooks/apiHook";
import Attendances from "./Attendances";
import "/src/assets/scss/datatables.scss";

//Import Breadcrumb

const Sessions = ({
  selectedCourse,
  selectedSemester,
  setSelectedCourse,
  setShowSessions,
}) => {
  //meta title
  document.title = "Sessions | ATMS";

  const [activeTab, setActiveTab] = useState("1");
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [showSessionDetail, setShowSessionDetail] = useState(false);

  const {
    data,
    isError,
    isLoading,
    errMsg,
    refetch: sessionsRefetch,
  } = useApiCall(
    "SESSIONS_LIST",
    urls.sessions(),
    {
      payload: {
        isMiniView: false,
        classSlug: selectedSemester?.class?.classslug,
        semesterSlug: selectedSemester?.semester?.semesterslug,
        courseSlug: selectedCourse?.course?.courseslug,
        teacherId: selectedCourse?.teacher?.techid,
        startDate: "2023-01-15",
        endDate: "2023-12-22",
      },
    },
    true
  );

  const { create: createSession } = useApiCall(
    "CREATE_SEMESTER",
    urls.createSession(),
    {},
    false
  );

  useEffect(() => {
    if (data) {
      setSessions(data.data);
    }
  }, [data]);

  const onRefresh = useCallback(() => {
    sessionsRefetch({
      payload: {
        isMiniView: true,
        classSlug: selectedSemester?.class?.classslug,
        semesterSlug: selectedSemester?.semester?.semesterslug,
        courseSlug: selectedCourse?.course?.courseslug,
        teacherId: selectedCourse?.teacher?.techid,
        startDate: "2023-01-15",
        endDate: "2023-12-22",
      },
    });
  }, []);

  const onViewSession = (sessionUID) => {
    setShowSessionDetail(true);
    setSelectedSession(sessionUID);
  };

  const onBackViewSession = () => {
    setShowSessionDetail(false);
    setSelectedSession(null);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Session ID",
        accessor: "sessionid",
        filterable: true,
        Cell: (cell) => {
          return cell?.value;
        },
      },
      {
        Header: "Date",
        accessor: "sessiondate",
        filterable: true,
        Cell: (cell) => {
          return dayjs(cell?.value).format("YYYY-MM-DD hh:mm A");
        },
      },
      {
        Header: "Attendances",
        accessor: "_count.attendances",
        filterable: true,
        Cell: (cell) => {
          return cell?.value;
        },
      },
      {
        Header: "Action",
        accessor: "sessionuid",
        Cell: (cell) => {
          return (
            <button
              className="btn btn-success d-flex justify-content-center align-items-center"
              onClick={() => onViewSession(cell?.value)}
            >
              <i className="bx bx-eye align-baseline me-1"></i>
              View
            </button>
          );
        },
      },
    ],
    []
  );

  const onBackSessions = () => {
    setSelectedCourse(null);
    setShowSessions(false);
  };

  const onAddSession = async () => {
    toast.loading("Please wait a few minutes...", {
      toastId: "createSession",
    });

    await createSession({
      payload: {
        classSlug: "ict-01-23",
        semesterSlug: "semester_1",
        courseSlug: "dld_maths",
        teacherId: "T-01",
      },
    })
      .then((res) => {
        toast.update("createSession", {
          isLoading: false,
          type: "success",
          render: "Successfully Session Added",
          autoClose: 3000,
          closeOnClick: true,
        });
      })
      .catch((err) => {
        toast.update("createSession", {
          isLoading: false,
          type: "error",
          autoClose: 5000,
          render:
            err?.response?.data?.message.toUpperCase() ||
            err?.message ||
            "Something went wrong!",
          closeOnClick: true,
        });
      });
  };

  return (
    <React.Fragment>
      {!showSessionDetail && (
        <Row>
          <Col lg="12">
            <Card>
              <CardBody>
                <div className="d-flex align-items-center justify-content-between">
                  <h4 className="card-title">Course Sessions</h4>
                  <button
                    className="btn btn-success d-flex justify-content-center align-items-center"
                    onClick={onBackSessions}
                  >
                    <i className="bx bx-caret-left align-baseline me-1"></i>
                    Back
                  </button>
                </div>

                <TabContent activeTab={activeTab} className="p-3">
                  <TabPane tabId="1" id="all-order">
                    <Form>
                      <Row className="mb-4">
                        <div className="col-xl col-sm-6">
                          <FormGroup className="mt-3 mb-0">
                            <Label>Semester :</Label>
                            <select className="form-control select2-search-disable">
                              <option
                                value={selectedSemester?.semester?.semestername}
                                defaultValue
                              >
                                {selectedSemester?.semester?.semestername}
                              </option>
                            </select>
                          </FormGroup>
                        </div>

                        <div className="col-xl col-sm-6">
                          <FormGroup className="mt-3 mb-0">
                            <Label>Course</Label>
                            <select className="form-control select2-search-disable">
                              <option
                                value={selectedCourse?.course?.coursename}
                                defaultValue
                              >
                                {selectedCourse?.course?.coursename}
                              </option>
                            </select>
                          </FormGroup>
                        </div>

                        <div className="col-xl col-sm-6">
                          <FormGroup className="mt-3 mb-0">
                            <Label>Class</Label>
                            <select
                              disabled
                              className="form-control select2-search-disable"
                            >
                              <option
                                value={selectedSemester?.class?.classname}
                                defaultValue
                              >
                                {selectedSemester?.class?.classname}
                              </option>
                            </select>
                          </FormGroup>
                        </div>

                        <div className="col-xl col-sm-6">
                          <FormGroup className="mt-3 mb-0">
                            <Label>Teacher</Label>
                            <select
                              disabled
                              className="form-control select2-search-disable"
                            >
                              <option
                                value={`${selectedCourse?.teacher?.firstname} ${selectedCourse?.teacher?.middlename}`}
                                defaultValue
                              >
                                {`${selectedCourse?.teacher?.firstname} ${selectedCourse?.teacher?.middlename}`}
                              </option>
                            </select>
                          </FormGroup>
                        </div>

                        <div className="col-xl col-sm-6">
                          <FormGroup className="mt-3 mb-0">
                            <Label>Students</Label>
                            <select
                              disabled
                              className="form-control select2-search-disable"
                            >
                              <option
                                value={selectedCourse?._count?.enrollments}
                                defaultValue
                              >
                                {selectedCourse?._count?.enrollments}
                              </option>
                            </select>
                          </FormGroup>
                        </div>

                        <div className="col-xl col-sm-6">
                          <FormGroup className="mt-3 mb-0">
                            <Label>Date :</Label>
                            <DatePicker
                              className="form-control"
                              placeholderText="Select date"
                              selected={new Date()}
                              disabled
                            />
                          </FormGroup>
                        </div>

                        <div className="col-xl col-sm-6 align-self-end">
                          <div className="mb-3">
                            <Button
                              type="button"
                              color="primary"
                              className="w-md"
                              onClick={onAddSession}
                            >
                              Add Session
                            </Button>
                          </div>
                        </div>
                      </Row>
                    </Form>

                    <TableContainer
                      isHideAdd
                      columns={columns}
                      data={sessions}
                      isGlobalFilter={false}
                      isAddOptions={false}
                      customPageSize={10}
                      onRefresh={onRefresh}
                    />
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}

      {showSessionDetail && selectedSession && (
        <Attendances
          selectedCourse={selectedCourse}
          selectedSemester={selectedSemester}
          onBackViewSession={onBackViewSession}
          selectedSession={selectedSession}
        />
      )}
    </React.Fragment>
  );
};

export default Sessions;

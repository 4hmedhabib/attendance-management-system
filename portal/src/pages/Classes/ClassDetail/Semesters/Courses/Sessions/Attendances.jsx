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
import urls from "../../../../../../api/urls";
import useApiCall from "../../../../../../hooks/apiHook";
import "/src/assets/scss/datatables.scss";

//Import Breadcrumb

const Attendances = ({
  selectedCourse,
  selectedSemester,
  onBackViewSession,
  selectedSession,
}) => {
  //meta title
  document.title = "Attendances | ATMS";

  const [activeTab, setActiveTab] = useState("1");
  const [attendances, setAttendances] = useState([]);

  const {
    data,
    isError,
    isLoading,
    errMsg,
    refetch: attendancesRefetch,
  } = useApiCall(
    "ATTENDANCES_LIST",
    urls.attendances(),
    {
      payload: {
        isMiniView: false,
        sessionId: selectedSession,
      },
    },
    true
  );

  const { update: updateAttendance } = useApiCall(
    "ATTENDANCES_LIST",
    urls.updateattendance(),
    {},
    false
  );

  useEffect(() => {
    if (data) {
      setAttendances(data.data);
    }
  }, [data]);

  const onRefresh = useCallback(() => {
    attendancesRefetch({
      payload: {
        isMiniView: false,
        sessionId: selectedSession,
      },
    });
  }, []);

  const changeAttendanceStatus = async (attendanceId, statusSlug) => {
    await updateAttendance({
      payload: { attendanceId: attendanceId, statusSlug: statusSlug },
    })
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err, "ERTWR"));
  };

  const columns = useMemo(
    () => [
      {
        Header: "Student ID",
        accessor: "enrollment.student.stdid",
        filterable: true,
        Cell: (cell) => {
          return cell?.value;
        },
      },
      {
        Header: "Firstname",
        accessor: "enrollment.student.firstname",
        filterable: true,
        Cell: (cell) => {
          return cell?.value;
        },
      },
      {
        Header: "Middlename",
        accessor: "enrollment.student.middlename",
        filterable: true,
        Cell: (cell) => {
          return cell?.value;
        },
      },
      {
        Header: "Lastname",
        accessor: "enrollment.student.lastname",
        filterable: true,
        Cell: (cell) => {
          return cell?.value;
        },
      },
      {
        Header: "Date",
        accessor: "attendancedate",
        filterable: true,
        Cell: (cell) => {
          return dayjs(cell?.value).format("YYYY-MM-DD hh:mm A");
        },
      },
      {
        Header: "STATUS",
        accessor: "status.statusname",
        Cell: ({ row }) => {
          console.log(row.original?.status?.statusname, "CURRENT");
          return (
            <select
              defaultValue={row.original?.status?.statusslug}
              onChange={(e) => {
                changeAttendanceStatus(
                  row.original.attendanceid,
                  e.currentTarget.value
                );
              }}
              className="select2-search-disable"
            >
              <option value={"present"}>Present</option>
              <option value={"absent"}>Absent</option>
              <option value={"late"}>Late</option>
              <option value={"excused"}>Excused</option>
            </select>
          );
        },
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <Row>
        <Col lg="12">
          <Card>
            <CardBody>
              <div className="d-flex align-items-center justify-content-between">
                <h4 className="card-title">Session Attendances</h4>
                <button
                  className="btn btn-success d-flex justify-content-center align-items-center"
                  onClick={onBackViewSession}
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
                    data={attendances}
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
    </React.Fragment>
  );
};

export default Attendances;

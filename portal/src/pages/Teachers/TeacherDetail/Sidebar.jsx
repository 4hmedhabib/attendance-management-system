import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col } from "reactstrap";

const Sidebar = ({ teacher }) => {
  return (
    <React.Fragment>
      <Col lg={3}>
        <Card>
          <CardBody>
            <ul className="list-unstyled vstack gap-3 mb-0">
              <li>
                <div className="d-flex">
                  <i className="bx bx-id-card font-size-18 text-primary"></i>
                  <div className="ms-3">
                    <h6 className="mb-1 fw-semibold">First Name:</h6>
                    <span className="text-muted">{teacher?.firstname}</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex">
                  <i className="bx bx-id-card font-size-18 text-primary"></i>
                  <div className="ms-3">
                    <h6 className="mb-1 fw-semibold">Middle Name:</h6>
                    <span className="text-muted">{teacher?.middlename}</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex">
                  <i className="bx bx-id-card font-size-18 text-primary"></i>
                  <div className="ms-3">
                    <h6 className="mb-1 fw-semibold">Last Name:</h6>
                    <span className="text-muted">{teacher?.lastname}</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex">
                  <i className="mdi mdi-card-account-details-star font-size-18 text-primary"></i>
                  <div className="ms-3">
                    <h6 className="mb-1 fw-semibold">Teacher ID:</h6>
                    <span className="text-muted">
                      {teacher?.techid?.toUpperCase()}
                    </span>
                  </div>
                </div>
              </li>

              <li>
                <div className="d-flex">
                  <i className="mdi mdi-phone-classic font-size-18 text-primary"></i>
                  <div className="ms-3">
                    <h6 className="mb-1 fw-semibold">Mobile No:</h6>
                    <span className="text-muted">{teacher?.mobileno}</span>
                  </div>
                </div>
              </li>

              <li>
                <div className="d-flex">
                  <i className="bx bx-user-plus font-size-18 text-primary"></i>
                  <div className="ms-3">
                    <h6 className="mb-1 fw-semibold">Created By:</h6>
                    {teacher?.createdby ? (
                      <Link
                        to="/users/detail"
                        state={{ userName: teacher?.createdby?.username }}
                      >
                        {`${teacher?.createdby?.firstname} ${teacher?.createdby?.middlename} ${teacher?.createdby?.lastname}`}
                      </Link>
                    ) : (
                      "NULL"
                    )}
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex">
                  <i className="bx bx-user-minus font-size-18 text-primary"></i>
                  <div className="ms-3">
                    <h6 className="mb-1 fw-semibold">Update By:</h6>
                    {teacher?.updatedby ? (
                      <Link
                        to="/users/detail"
                        state={{ userName: teacher?.updatedby?.username }}
                      >
                        {`${teacher?.updatedby?.firstname} ${teacher?.updatedby?.middlename} ${teacher?.updatedby?.lastname}`}
                      </Link>
                    ) : (
                      "NULL"
                    )}
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex">
                  <i className="mdi mdi-calendar font-size-18 text-primary"></i>
                  <div className="ms-3">
                    <h6 className="mb-1 fw-semibold">Created At:</h6>
                    <span className="text-muted">
                      {teacher?.createdat
                        ? dayjs(teacher?.createdat).format("YYYY-MM-DD HH:mm")
                        : "NULL"}
                    </span>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex">
                  <i className="mdi mdi-calendar font-size-18 text-primary"></i>
                  <div className="ms-3">
                    <h6 className="mb-1 fw-semibold">Updated At:</h6>
                    {teacher?.updatedat
                      ? dayjs(teacher?.updatedat).format("YYYY-MM-DD HH:mm")
                      : "NULL"}
                  </div>
                </div>
              </li>
            </ul>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default Sidebar;

import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col } from "reactstrap";

const Sidebar = ({ enrollment }) => {
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
                    <span className="text-muted">{enrollment?.firstname}</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex">
                  <i className="bx bx-id-card font-size-18 text-primary"></i>
                  <div className="ms-3">
                    <h6 className="mb-1 fw-semibold">Middle Name:</h6>
                    <span className="text-muted">{enrollment?.middlename}</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex">
                  <i className="bx bx-id-card font-size-18 text-primary"></i>
                  <div className="ms-3">
                    <h6 className="mb-1 fw-semibold">Last Name:</h6>
                    <span className="text-muted">{enrollment?.lastname}</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex">
                  <i className="mdi mdi-card-account-details-star font-size-18 text-primary"></i>
                  <div className="ms-3">
                    <h6 className="mb-1 fw-semibold">enrollment ID:</h6>
                    <span className="text-muted">
                      {enrollment?.techid?.toUpperCase()}
                    </span>
                  </div>
                </div>
              </li>

              <li>
                <div className="d-flex">
                  <i className="mdi mdi-phone-classic font-size-18 text-primary"></i>
                  <div className="ms-3">
                    <h6 className="mb-1 fw-semibold">Mobile No:</h6>
                    <span className="text-muted">{enrollment?.mobileno}</span>
                  </div>
                </div>
              </li>

              <li>
                <div className="d-flex">
                  <i className="mdi mdi-calendar font-size-18 text-primary"></i>
                  <div className="ms-3">
                    <h6 className="mb-1 fw-semibold">Year Of Study:</h6>
                    <span className="text-muted">
                      {enrollment?.yearofstudy}
                    </span>
                  </div>
                </div>
              </li>

              <li>
                <div className="d-flex">
                  <i className="bx bx-user-plus font-size-18 text-primary"></i>
                  <div className="ms-3">
                    <h6 className="mb-1 fw-semibold">Created By:</h6>
                    {enrollment?.createdby ? (
                      <Link
                        to="/users/detail"
                        state={{ userName: enrollment?.createdby?.username }}
                      >
                        {`${enrollment?.createdby?.firstname} ${enrollment?.createdby?.middlename} ${enrollment?.createdby?.lastname}`}
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
                    {enrollment?.updatedby ? (
                      <Link
                        to="/users/detail"
                        state={{ userName: enrollment?.updatedby?.username }}
                      >
                        {`${enrollment?.updatedby?.firstname} ${enrollment?.updatedby?.middlename} ${enrollment?.updatedby?.lastname}`}
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
                      {enrollment?.createdat
                        ? dayjs(enrollment?.createdat).format(
                            "YYYY-MM-DD HH:mm"
                          )
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
                    {enrollment?.updatedat
                      ? dayjs(enrollment?.updatedat).format("YYYY-MM-DD HH:mm")
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

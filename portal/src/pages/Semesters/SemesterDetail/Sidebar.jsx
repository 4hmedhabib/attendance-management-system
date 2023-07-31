import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col } from "reactstrap";

const Sidebar = ({ semester }) => {
  return (
    <React.Fragment>
      <Col lg={3}>
        <Card>
          <CardBody>
            <ul className="list-unstyled vstack gap-3 mb-0">
              <li>
                <div className="d-flex">
                  <i className="bx bx-home font-size-18 text-primary"></i>
                  <div className="ms-3">
                    <h6 className="mb-1 fw-semibold">Semester Name:</h6>
                    <span className="text-muted">{semester?.semestername}</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex">
                  <i className="bx bx-chalkboard font-size-18 text-primary"></i>
                  <div className="ms-3">
                    <h6 className="mb-1 fw-semibold">Classes:</h6>
                    <span className="text-muted">
                      {semester?._count?.classes}
                    </span>
                  </div>
                </div>
              </li>

              <li>
                <div className="d-flex">
                  <i className="bx bx-user-plus font-size-18 text-primary"></i>
                  <div className="ms-3">
                    <h6 className="mb-1 fw-semibold">Created By:</h6>
                    {semester?.createdby ? (
                      <Link
                        to="/users/detail"
                        state={{ userName: semester?.createdby?.username }}
                      >
                        {`${semester?.createdby?.firstname} ${semester?.createdby?.middlename} ${semester?.createdby?.lastname}`}
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
                    {semester?.updatedby ? (
                      <Link
                        to="/users/detail"
                        state={{ userName: semester?.updatedby?.username }}
                      >
                        {`${semester?.updatedby?.firstname} ${semester?.updatedby?.middlename} ${semester?.updatedby?.lastname}`}
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
                      {semester?.createdat
                        ? dayjs(semester?.createdat).format("YYYY-MM-DD HH:mm")
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
                    {semester?.updatedat
                      ? dayjs(semester?.updatedat).format("YYYY-MM-DD HH:mm")
                      : "NULL"}
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex">
                  <i className="mdi mdi-calendar font-size-18 text-primary"></i>
                  <div className="ms-3">
                    <h6 className="mb-1 fw-semibold">Description:</h6>
                    <span className="text-muted">
                      {semester?.description ? semester.description : "NULL"}
                    </span>
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

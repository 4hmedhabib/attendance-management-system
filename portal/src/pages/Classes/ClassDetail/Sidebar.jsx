import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col } from "reactstrap";

const Sidebar = ({ _class }) => {
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
                    <h6 className="mb-1 fw-semibold">Class Name:</h6>
                    <span className="text-muted">{_class?.classname}</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex">
                  <i className="bx bx-chalkboard font-size-18 text-primary"></i>
                  <div className="ms-3">
                    <h6 className="mb-1 fw-semibold">Classes:</h6>
                    <span className="text-muted">
                      {_class?._count?.classes}
                    </span>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex">
                  <i className="bx bx-user font-size-18 text-primary"></i>
                  <div className="ms-3">
                    <h6 className="mb-1 fw-semibold">Manager:</h6>
                    {_class?.manager ? (
                      <Link
                        to="/users/detail"
                        state={{ userName: _class?.manager?.username }}
                      >
                        {`${_class?.manager?.firstname} ${_class?.manager?.middlename} ${_class?.manager?.lastname}`}
                      </Link>
                    ) : (
                      "NULL"
                    )}
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex">
                  <i className="bx bx-user font-size-18 text-primary"></i>
                  <div className="ms-3">
                    <h6 className="mb-1 fw-semibold">Deputy:</h6>
                    {_class?.deputy ? (
                      <Link
                        to="/users/detail"
                        state={{ userName: _class?.deputy?.username }}
                      >
                        {`${_class?.deputy?.firstname} ${_class?.deputy?.middlename} ${_class?.deputy?.lastname}`}
                      </Link>
                    ) : (
                      "NULL"
                    )}
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex">
                  <i className="bx bx-user-plus font-size-18 text-primary"></i>
                  <div className="ms-3">
                    <h6 className="mb-1 fw-semibold">Created By:</h6>
                    {_class?.createdby ? (
                      <Link
                        to="/users/detail"
                        state={{ userName: _class?.createdby?.username }}
                      >
                        {`${_class?.createdby?.firstname} ${_class?.createdby?.middlename} ${_class?.createdby?.lastname}`}
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
                    {_class?.updatedby ? (
                      <Link
                        to="/users/detail"
                        state={{ userName: _class?.updatedby?.username }}
                      >
                        {`${_class?.updatedby?.firstname} ${_class?.updatedby?.middlename} ${_class?.updatedby?.lastname}`}
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
                      {_class?.createdat
                        ? dayjs(_class?.createdat).format("YYYY-MM-DD HH:mm")
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
                    {_class?.updatedat
                      ? dayjs(_class?.updatedat).format("YYYY-MM-DD HH:mm")
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
                      {_class?.description ? _class.description : "NULL"}
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

import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col } from "reactstrap";

const Sidebar = ({ faculty }) => {
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
                    <h6 className="mb-1 fw-semibold">Faculty Name:</h6>
                    <span className="text-muted">{faculty?.facultyname}</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex">
                  <i className="bx bx-chalkboard font-size-18 text-primary"></i>
                  <div className="ms-3">
                    <h6 className="mb-1 fw-semibold">Classes:</h6>
                    <span className="text-muted">
                      {faculty?._count?.classes}
                    </span>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex">
                  <i className="bx bx-user font-size-18 text-primary"></i>
                  <div className="ms-3">
                    <h6 className="mb-1 fw-semibold">Manager:</h6>
                    {faculty?.manager ? (
                      <Link
                        to="/users/detail"
                        state={{ userName: faculty?.manager?.username }}
                      >
                        {`${faculty?.manager?.firstname} ${faculty?.manager?.middlename} ${faculty?.manager?.lastname}`}
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
                    {faculty?.deputy ? (
                      <Link
                        to="/users/detail"
                        state={{ userName: faculty?.deputy?.username }}
                      >
                        {`${faculty?.deputy?.firstname} ${faculty?.deputy?.middlename} ${faculty?.deputy?.lastname}`}
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
                    {faculty?.createdby ? (
                      <Link
                        to="/users/detail"
                        state={{ userName: faculty?.createdby?.username }}
                      >
                        {`${faculty?.createdby?.firstname} ${faculty?.createdby?.middlename} ${faculty?.createdby?.lastname}`}
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
                    {faculty?.updatedby ? (
                      <Link
                        to="/users/detail"
                        state={{ userName: faculty?.updatedby?.username }}
                      >
                        {`${faculty?.updatedby?.firstname} ${faculty?.updatedby?.middlename} ${faculty?.updatedby?.lastname}`}
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
                      {faculty?.createdat
                        ? dayjs(faculty?.createdat).format("YYYY-MM-DD HH:mm")
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
                    {faculty?.updatedat
                      ? dayjs(faculty?.updatedat).format("YYYY-MM-DD HH:mm")
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
                      {faculty?.description ? faculty.description : "NULL"}
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

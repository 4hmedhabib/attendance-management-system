import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";

//import images

const Section = () => {
  return (
    <React.Fragment>
      <Row className="mb-4">
        <Col lg={12}>
          <div className="d-flex align-items-center">
            <div className="ms-3 flex-grow-1">
              <h5 className="mb-2 card-title">Hello, Welcome</h5>
              <p className="text-muted mb-0">
                FFU - Attendance Management System
              </p>
            </div>
            <div>
              <Link to="#" className="btn btn-primary">
                <i className="mdi mdi-reload align-middle"></i> Refresh
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Section;

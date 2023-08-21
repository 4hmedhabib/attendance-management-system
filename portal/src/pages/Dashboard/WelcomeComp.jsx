import React from "react";

import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row } from "reactstrap";

import avatar1 from "../../assets/images/users/avatar-4.png";
import profileImg from "../../assets/images/verification-img.png";

const WelcomeComp = () => {
  return (
    <React.Fragment>
      <Card className="overflow-hidden">
        <div className="bg-primary bg-soft">
          <Row>
            <Col xs="7">
              <div className="text-primary p-3">
                <h5 className="text-primary">Welcome Back !</h5>
                <p>FFU - Attendance Management System</p>
              </div>
            </Col>
            <Col xs="5" className="align-self-end">
              <img src={profileImg} alt="" className="img-fluid" />
            </Col>
          </Row>
        </div>
        <CardBody className="pt-0">
          <Row>
            <Col sm="4">
              <div className="avatar-md profile-user-wid mb-4">
                <img
                  src={avatar1}
                  alt=""
                  className="img-thumbnail rounded-circle"
                />
              </div>
              <h5 className="font-size-15 text-truncate">Mohamed Ahmed</h5>
              <p className="text-muted mb-0 text-truncate">Dean</p>
            </Col>

            <Col sm="8">
              <div className="pt-4">
                <Row>
                  <Col xs="6">
                    <h5 className="font-size-15">22</h5>
                    <p className="text-muted mb-0">Classes</p>
                  </Col>
                  <Col xs="6">
                    <h5 className="font-size-15">13</h5>
                    <p className="text-muted mb-0">Courses</p>
                  </Col>
                </Row>
                <div className="mt-4">
                  <Link to="" className="btn btn-primary  btn-sm">
                    View Profile <i className="mdi mdi-arrow-right ms-1"></i>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};
export default WelcomeComp;

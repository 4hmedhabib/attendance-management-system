import React from "react";

import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row } from "reactstrap";

import avatar1 from "../../assets/images/users/avatar-4.png";
import profileImg from "../../assets/images/verification-img.png";

const WelcomeComp = () => {
  const authUser = JSON.parse(localStorage.getItem("authUser"));

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
            <Col sm="8">
              <div className="avatar-md profile-user-wid mb-4">
                <img
                  src={avatar1}
                  alt=""
                  className="img-thumbnail rounded-circle"
                />
              </div>
              <h5 className="font-size-15 text-truncate">{`${authUser?.user?.firstname} ${authUser?.user?.middlename}`}</h5>
              <p className="text-muted mb-0 text-truncate">
                {authUser?.group?.groupname}
              </p>
            </Col>

            <Col sm="4">
              <div className="pt-4">
                <div className="mt-4">
                  <Link to="/profile" className="btn btn-primary btn-sm">
                    Profile <i className="mdi mdi-arrow-right ms-1"></i>
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

import React, { useEffect, useState } from "react";
import { Alert, Card, CardBody, Col, Container, Row } from "reactstrap";

// Formik Validation
import { useFormik } from "formik";
import * as Yup from "yup";

//redux
import { useDispatch, useSelector } from "react-redux";

import withRouter from "../../components/Common/withRouter";

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb";

import avatar from "../../assets/images/users/avatar-4.png";
// actions
import { Link } from "react-router-dom";
import { editProfile, resetProfileFlag } from "../../store/actions";

const UserProfile = (props) => {
  //meta title
  document.title = "Profile | FFU - ATMS & Dashboard Template";

  const dispatch = useDispatch();

  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [idx, setidx] = useState(1);

  const { error, success } = useSelector((state) => ({
    error: state.Profile.error,
    success: state.Profile.success,
  }));
  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"));
      if (import.meta.env.VITE_APP_DEFAULTAUTH === "firebase") {
        setname(obj.displayName);
        setemail(obj.email);
        setidx(obj.uid);
      } else if (
        import.meta.env.VITE_APP_DEFAULTAUTH === "fake" ||
        import.meta.env.VITE_APP_DEFAULTAUTH === "jwt"
      ) {
        setname(obj.username);
        setemail(obj.email);
        setidx(obj.uid);
      }
      setTimeout(() => {
        dispatch(resetProfileFlag());
      }, 3000);
    }
  }, [dispatch, success]);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      username: name || "",
      idx: idx || "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter Your UserName"),
    }),
    onSubmit: (values) => {
      dispatch(editProfile(values));
    },
  });

  const authUser = JSON.parse(localStorage.getItem("authUser"));

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="Skote" breadcrumbItem="Profile" />

          <Row>
            <Col lg="12">
              {error && error ? <Alert color="danger">{error}</Alert> : null}
              {success ? <Alert color="success">{success}</Alert> : null}

              <Card>
                <CardBody className="d-flex flex-column justify-content-center">
                  <div className="d-flex">
                    <div className="ms-3">
                      <img
                        src={avatar}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                    </div>
                    <div className="flex-grow-1 align-self-center">
                      <div className="text-muted">
                        <h5>{name}</h5>
                        <p className="mb-1">{email}</p>
                        <p className="mb-0">
                          Full Name:{" "}
                          <span className="fw-bold">{`${authUser?.user?.firstname} ${authUser?.user?.middlename} ${authUser?.user?.lastname}`}</span>
                        </p>
                        <p className="mb-0">
                          Group :{" "}
                          <span className="fw-bold">
                            {authUser?.group?.groupname}
                          </span>
                        </p>
                        <p className="mb-0">
                          Username :{" "}
                          <span className="fw-bold">
                            {authUser?.user?.username}
                          </span>
                        </p>
                        <p className="mb-0">
                          Email :{" "}
                          <span className="fw-bold">
                            {authUser?.user?.email}
                          </span>
                        </p>
                        <p className="mb-0">
                          Mobile No :{" "}
                          <span className="fw-bold">
                            {authUser?.user?.mobileno}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center my-3">
                    <Link
                      to={"/logout"}
                      className="bg-danger text-white btn btn-sm"
                    >
                      Logout
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(UserProfile);

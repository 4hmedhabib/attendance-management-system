import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

//import images
import { Link, useLocation } from "react-router-dom";
import urls from "../../../api/urls";
import NotFound from "../../../components/Common/NotFound";
import useApiCall from "../../../hooks/apiHook";
import Sidebar from "./Sidebar";
import UpdateForm from "./UpdateForm";

const FacultyDetail = () => {
  document.title = "Faculty Detail | FFU ATMS";

  const { state } = useLocation();

  if (!state?.facultySlug) {
    return (
      <NotFound>
        <h3>Sorry!, Faculty Not Found</h3>
        <Link className="btn btn-outline-info mt-3" to={"/faculties"}>
          Go All Faculties
        </Link>
      </NotFound>
    );
  }

  const [faculty, setFaculty] = useState(null);

  const {
    data: facultyData,
    isError: facultyIsErr,
    isLoading: facultyIsLoading,
  } = useApiCall(urls.facultyDetail(), {
    payload: {
      isMiniView: false,
      facultySlug: state.facultySlug,
    },
  });

  useEffect(() => {
    if (facultyData) {
      setFaculty(facultyData.data);
    }
  }, [facultyData]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card className="mx-n4 mt-n4 bg-info bg-white">
                <CardBody>
                  <div className="text-center mb-4">
                    <h5 className="mt-3 mb-1">ICT/CS</h5>
                    <p className="text-muted mb-3">Faculty</p>
                  </div>

                  <div className="d-flex align-items-center">
                    <ul className="list-unstyled hstack gap-3 mb-0 flex-grow-1"></ul>
                    <div className="hstack gap-2">
                      <button
                        type="button"
                        className="btn btn-warning d-flex justify-content-center align-items-center"
                      >
                        <i className="bx bxs-edit align-baseline me-1"></i>
                        Edit
                      </button>
                      <Link
                        className="btn btn-secondary d-flex justify-content-center align-items-center"
                        to={"/faculties"}
                      >
                        <i className="bx bx-left-arrow align-baseline me-1"></i>
                        Back
                      </Link>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Sidebar />
            <UpdateForm facultySlug={state?.facultySlug} />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default FacultyDetail;

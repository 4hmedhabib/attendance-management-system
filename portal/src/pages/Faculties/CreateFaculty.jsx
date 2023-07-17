import React, { useState } from "react";

import Select from "react-select";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  Input,
  Label,
  Row,
} from "reactstrap";

//Import Breadcrumb
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Common/Breadcrumb";

const CreateFaculty = () => {
  //meta title
  document.title = "Create Faculty | FFU ATMS";

  const navigate = useNavigate();

  const [users, setUsers] = useState([
    { value: "AK", label: "Alaska" },
    { value: "HI", label: "Hawaii" },
    { value: "CA", label: "California" },
    { value: "NV", label: "Nevada" },
    { value: "OR", label: "Oregon" },
    { value: "WA", label: "Washington" },
  ]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Faculties" breadcrumbItem="Create Faculty" />

          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <CardTitle>Basic Information</CardTitle>
                  <p className="card-title-desc mb-4">
                    Fill all information below
                  </p>

                  <Form>
                    <Row>
                      <Col sm="6">
                        <div className="mb-3">
                          <Label htmlFor="facultyname">Faculty Name</Label>
                          <Input
                            id="facultyname"
                            name="facultyname"
                            type="text"
                            className="form-control"
                            placeholder="Faculty Name"
                          />
                        </div>
                        <div className="mb-3">
                          <Label className="control-label">
                            Faculty Manager
                          </Label>
                          <Select
                            classNamePrefix="select2-selection"
                            placeholder="Choose..."
                            title="Country"
                            users={users}
                            isMulti
                          />
                        </div>
                        <div className="mb-3">
                          <Label className="control-label">
                            Deputy Manager
                          </Label>
                          <Select
                            classNamePrefix="select2-selection"
                            placeholder="Choose..."
                            title="Country"
                            users={users}
                            isMulti
                          />
                        </div>
                      </Col>

                      <Col sm="6">
                        <div className="mb-3">
                          <Label htmlFor="facultydesc">
                            Faculty Description
                          </Label>
                          <textarea
                            className="form-control mb-3"
                            id="facultydesc"
                            rows="5"
                            placeholder="Faculty Description"
                          />
                        </div>
                      </Col>
                    </Row>
                    <div className="d-flex flex-wrap gap-2">
                      <Button type="submit" color="primary" className="btn ">
                        Save Changes
                      </Button>
                      <Button
                        type="button"
                        onClick={() => navigate(-1)}
                        color="secondary"
                        className=" "
                      >
                        Cancel
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CreateFaculty;

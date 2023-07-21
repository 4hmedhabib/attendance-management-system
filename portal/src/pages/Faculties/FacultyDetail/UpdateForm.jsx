import React, { useState } from "react";
import Select from "react-select";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  Input,
  Label,
  Row,
} from "reactstrap";
import Classes from "./Classes";

//import images

const UpdateForm = ({ facultySlug }) => {
  const [users, setUsers] = useState([]);
  const [classes, setClasses] = useState([]);

  return (
    <React.Fragment>
      <Col lg={9}>
        <Card>
          <CardBody>
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
                    <Label className="control-label">Faculty Manager</Label>
                    <Select
                      classNamePrefix="select2-selection"
                      placeholder="Choose..."
                      title="Country"
                      users={users}
                      isMulti
                    />
                  </div>
                  <div className="mb-3">
                    <Label className="control-label">Deputy Manager</Label>
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
                    <Label htmlFor="facultydesc">Faculty Description</Label>
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

        <Classes facultySlug={facultySlug} />
      </Col>
    </React.Fragment>
  );
};

export default UpdateForm;

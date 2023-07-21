import React from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

const NotFound = ({ children }) => {
  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <div>
            <Col lg={12}>
              <Card>
                <CardBody className="text-center">{children}</CardBody>
              </Card>
            </Col>
          </div>
        </Row>{" "}
      </Container>{" "}
    </div>
  );
};

export default NotFound;

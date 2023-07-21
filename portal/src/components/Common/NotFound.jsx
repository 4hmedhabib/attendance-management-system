import React from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

const NotFound = ({ children, size = 12 }) => {
  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <div>
            <Col lg={size}>
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

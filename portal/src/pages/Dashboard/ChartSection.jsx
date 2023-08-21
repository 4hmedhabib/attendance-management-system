import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";

//import components

const ChartSection = ({ chartsData }) => {
  return (
    <React.Fragment>
      <Row>
        {(chartsData || []).map((item, key) => (
          // <Col lg={3} key={key}>
          //   <Card className="mini-stats-wid">
          //     <CardBody>
          //       <div className="d-flex">
          //         <div className="flex-grow-1">
          //           <p className="text-muted fw-medium">{item.title}</p>
          //           <h4 className="mb-0">{item.total}</h4>
          //         </div>

          //         <div className="flex-shrink-0 align-self-center">

          //         </div>
          //       </div>
          //     </CardBody>

          //     <div className="card-body border-top py-3">
          //       <p className="mb-0">{item.subTitle}</p>
          //     </div>
          //   </Card>
          // </Col>
          <Col md="3" key={"_col_" + key}>
            <Card className="mini-stats-wid">
              <CardBody>
                <div className="d-flex">
                  <div className="flex-grow-1">
                    <p className="text-muted fw-medium">{item.title}</p>
                    <h4 className="mb-0">{item.total}</h4>
                  </div>
                  <div
                    className={`avatar-sm rounded-circle bg-${item.bagdeColor} align-self-center mini-stat-icon`}
                  >
                    <span
                      className={`avatar-title rounded-circle bg-${item.bagdeColor}`}
                    >
                      <i
                        className={"bx " + item.iconClass + " font-size-24"}
                      ></i>
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </React.Fragment>
  );
};

export default ChartSection;

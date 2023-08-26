import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

//import action

import "@fullcalendar/react/dist/vdom";

import BootstrapTheme from "@fullcalendar/bootstrap";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";

// Pages Components
import LatestTranaction from "./LatestTranaction";
import WelcomeComp from "./WelcomeComp";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { useState } from "react";
import { withTranslation } from "react-i18next";
import urls from "../../api/urls";
import useApiCall from "../../hooks/apiHook";
import TopCities from "./TopCities";

//redux

const Dashboard = (props) => {
  const [dashboardData, setDashboardData] = useState(null);

  const reports = [
    {
      title: "Classes",
      iconClass: "bx-buildings",
      description: dashboardData?.classes || 0,
      color: "warning",
    },
    {
      title: "Courses",
      iconClass: "bxs-book",
      description: dashboardData?.courses || 0,
      color: "success",
    },
    {
      title: "Students",
      iconClass: "bxs-graduation",
      description: dashboardData?.students || 0,
      color: "primary",
    },
  ];

  //meta title
  document.title = "Dashboard | FFU ATMS";

  const {
    data,
    isError,
    isLoading,
    errMsg,
    refetch: dashboardRefetch,
  } = useApiCall(
    "DASHBOARD_DATA",
    urls.dashboard(),
    {
      isMiniView: false,
    },
    true
  );

  useEffect(() => {
    if (data) {
      setDashboardData(data.data);
    }
  }, [data]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Dashboards")}
            breadcrumbItem={props.t("Dashboard")}
          />

          <Row>
            <Col xl="4">
              <WelcomeComp />
              <TopCities />
            </Col>
            <Col xl="8">
              <Row>
                {/* Reports Render */}
                {reports.map((report, key) => (
                  <Col md="4" key={"_col_" + key}>
                    <Card className="mini-stats-wid">
                      <CardBody>
                        <div className="d-flex">
                          <div className="flex-grow-1">
                            <p className="text-muted fw-medium">
                              {report.title}
                            </p>
                            <h4 className="mb-0">{report.description}</h4>
                          </div>
                          <div
                            className={`avatar-sm rounded-circle bg-${report.color} align-self-center mini-stat-icon`}
                          >
                            <span
                              className={`avatar-title rounded-circle bg-${report.color}`}
                            >
                              <i
                                className={
                                  "bx " + report.iconClass + " font-size-24"
                                }
                              ></i>
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>

              <Card>
                <CardBody>
                  <div className="flex">
                    <FullCalendar
                      plugins={[
                        BootstrapTheme,
                        dayGridPlugin,
                        interactionPlugin,
                      ]}
                      themeSystem="bootstrap"
                      headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth",
                      }}
                      contentHeight={"auto"}
                    />{" "}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg="12">
              <LatestTranaction />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(Dashboard);

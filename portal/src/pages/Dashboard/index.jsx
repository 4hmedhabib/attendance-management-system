import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";

import "@fullcalendar/react/dist/vdom";

//Import Components
import BootstrapTheme from "@fullcalendar/bootstrap";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";

import ChartSection from "./ChartSection";
import Section from "./Section";

const DashboardJob = () => {
  document.title = "Dashboard | FFU Attendance MS";

  const [periodData, setPeriodData] = useState([]);
  const [periodType, setPeriodType] = useState("yearly");

  const chartsData = [
    {
      id: 1,
      title: "Faculties",
      total: "5",
      bagdeColor: "primary",
      color: '["--bs-success", "--bs-transparent"]',
      iconClass: "bx-chalkboard",
    },
    {
      id: 2,
      title: "Classes",
      total: "14",
      bagdeColor: "success",
      color: '["--bs-success", "--bs-transparent"]',
      iconClass: "bx-buildings",
    },
    {
      id: 3,
      title: "Students",
      total: "1,487",
      bagdeColor: "warning",
      color: '["--bs-success", "--bs-transparent"]',
      iconClass: "bxs-graduation",
    },
    {
      id: 4,
      title: "Teachers",
      total: "27",
      bagdeColor: "danger",
      color: '["--bs-danger", "--bs-transparent"]',
      iconClass: "bxs-user-voice",
    },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Section />

          <ChartSection chartsData={chartsData} />

          <Row>
            <Col xl="12">
              <FullCalendar
                plugins={[BootstrapTheme, dayGridPlugin]}
                handleWindowResize={true}
                themeSystem="bootstrap"
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth",
                }}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardJob;

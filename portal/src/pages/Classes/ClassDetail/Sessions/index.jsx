import "bootstrap/dist/css/bootstrap.min.css";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useMemo, useState } from "react";

//import components
import Breadcrumbs from "../../../../components/Common/Breadcrumb";

import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import urls from "../../../../api/urls";
import ResError from "../../../../components/Common/ResError";
import TableContainer from "../../../../components/Common/TableContainer";
import useApiCall from "../../../../hooks/apiHook";

function Session() {
  //meta title
  document.title = "Sessions | FFU - ATMS";

  const [sessions, setSessions] = useState([]);

  const {
    data,
    isError,
    isLoading,
    errMsg,
    refetch: sessionsRefetch,
  } = useApiCall(
    "SESSION_LIST",
    urls.sessions(),
    {
      payload: {
        isMiniView: false,
        filters: {
          semesterSlug: null,
          classSlug: null,
        },
      },
    },
    false
  );

  const navigate = useNavigate();

  const handleSessionClicks = () => {
    navigate("create");
  };

  useEffect(() => {
    if (data) {
      setSessions(data.data);
    }
  }, [data]);

  const onRefresh = useCallback(() => {
    sessionsRefetch({
      payload: {
        isMiniView: false,
        filters: {
          semesterSlug: "semester_1",
          classSlug: null,
        },
      },
    });
  }, []);

  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "sessionid",
        style: {
          textAlign: "center",
          width: "10%",
          background: "#0000",
        },
        Cell: ({ cell }) => {
          return cell.value;
        },
      },
      {
        Header: "Session Name",
        accessor: "sessionname",
        Cell: ({ cell }) => {
          return cell?.value;
        },
      },
      {
        Header: "Created By",
        accessor: "createdby",
        Cell: ({ cell }) => {
          return `${cell?.value.firstname} ${cell?.value.middlename}`;
        },
      },
      {
        Header: "Semesters",
        accessor: "_count.semesters",
        Cell: ({ cell }) => {
          return cell?.value;
        },
      },
      {
        Header: "Date",
        accessor: "createdat",
        Cell: ({ cell }) => {
          return dayjs(cell?.value).format("YYYY-MM-DD");
        },
      },
      {
        Header: "View",
        accessor: "sessionslug",
        disableFilters: true,
        Cell: ({ cell }) => {
          return (
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              onClick={() =>
                navigate("detail", { state: { sessionSlug: cell?.value } })
              }
            >
              View
            </Button>
          );
        },
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Sessions" breadcrumbItem="Sessions List" />

          {isError && <ResError error={errMsg} />}

          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={sessions || []}
                    isGlobalFilter={false}
                    isAddOptions={true}
                    handleClick={handleSessionClicks}
                    customPageSize={50}
                    className="custom-header-css"
                    isLoading={isLoading && !isError}
                    onRefresh={onRefresh}
                    title="Add New Session"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Session;
// export { default as CreateSession } from "./CreateSession";
// export { default as SessionDetail } from "./SessionDetail";

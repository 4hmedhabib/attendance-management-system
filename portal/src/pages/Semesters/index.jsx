import "bootstrap/dist/css/bootstrap.min.css";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useMemo, useState } from "react";

//import components
import Breadcrumbs from "../../components/Common/Breadcrumb";

import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import urls from "../../api/urls";
import ResError from "../../components/Common/ResError";
import TableContainer from "../../components/Common/TableContainer";
import useApiCall from "../../hooks/apiHook";

function Semester() {
  //meta title
  document.title = "Semesters | FFU - ATMS";

  const [semesters, setSemesters] = useState([]);

  const {
    data,
    isError,
    isLoading,
    errMsg,
    refetch: semestersRefetch,
  } = useApiCall(
    "SEMESTER_LIST",
    urls.semesters(),
    {
      payload: { isMiniView: false },
    },
    false
  );

  const navigate = useNavigate();

  const handleSemesterClicks = () => {
    navigate("create");
  };

  useEffect(() => {
    if (data) {
      setSemesters(data.data);
    }
  }, [data]);

  const onRefresh = useCallback(() => {
    semestersRefetch({
      payload: { isMiniView: false },
    });
  }, []);

  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "semesterid",
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
        Header: "Semester Name",
        accessor: "semestername",
        Cell: ({ cell }) => {
          return cell?.value;
        },
      },
      {
        Header: "Created By",
        accessor: "createdby",
        Cell: ({ cell }) => {
          return `${cell?.value?.firstname} ${cell?.value?.middlename}`;
        },
      },
      {
        Header: "Classes",
        accessor: "_count.classes",
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
        accessor: "semesterslug",
        disableFilters: true,
        Cell: ({ cell }) => {
          return (
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              onClick={() =>
                navigate("detail", { state: { semesterSlug: cell?.value } })
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
          <Breadcrumbs title="Semesters" breadcrumbItem="Semesters List" />

          {isError && <ResError error={errMsg} />}

          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={semesters || []}
                    isGlobalFilter={false}
                    isAddOptions={true}
                    handleClick={handleSemesterClicks}
                    customPageSize={50}
                    className="custom-header-css"
                    isLoading={isLoading && !isError}
                    onRefresh={onRefresh}
                    title="Add New Semester"
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

export default Semester;
export { default as CreateSemester } from "./CreateSemester";
export { default as SemesterDetail } from "./SemesterDetail";

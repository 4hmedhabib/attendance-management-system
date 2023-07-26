import "bootstrap/dist/css/bootstrap.min.css";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import TableContainer from "../../components/Common/TableContainer";

//import components
import Breadcrumbs from "../../components/Common/Breadcrumb";

import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import urls from "../../api/urls";
import ResError from "../../components/Common/ResError";
import useApiCall from "../../hooks/apiHook";

function Faculty() {
  //meta title
  document.title = "Faculties | FFU - ATMS";

  const [faculties, setFaculties] = useState([]);

  const {
    data,
    isError,
    isLoading,
    errMsg,
    refetch: facultiesRefetch,
  } = useApiCall(
    "FACULTY_LIST",
    urls.faculties(),
    {
      payload: { isMiniView: false },
    },
    false
  );

  const navigate = useNavigate();

  const handleFacultyClicks = () => {
    navigate("create");
  };

  useEffect(() => {
    if (data) {
      setFaculties(data.data);
    }
  }, [data]);

  const onRefresh = useCallback(() => {
    facultiesRefetch({
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
        accessor: "facultyid",
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
        Header: "Faculty Name",
        accessor: "facultyname",
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
        accessor: "facultyslug",
        disableFilters: true,
        Cell: ({ cell }) => {
          return (
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              onClick={() =>
                navigate("detail", { state: { facultySlug: cell?.value } })
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
          <Breadcrumbs title="Faculties" breadcrumbItem="Faculties List" />

          {isError && <ResError error={errMsg} />}

          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={faculties || []}
                    isGlobalFilter={false}
                    isAddOptions={true}
                    handleClick={handleFacultyClicks}
                    customPageSize={50}
                    className="custom-header-css"
                    isLoading={isLoading && !isError}
                    onRefresh={onRefresh}
                    title="Add New Faculty"
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

export default Faculty;
export { default as CreateFaculty } from "./CreateFaculty";
export { default as FacultyDetail } from "./FacultyDetail";

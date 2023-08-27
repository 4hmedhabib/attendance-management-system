import "bootstrap/dist/css/bootstrap.min.css";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useMemo, useState } from "react";

//import components
import Breadcrumbs from "../../components/Common/Breadcrumb";

import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import urls from "../../api/urls";
import ResError from "../../components/Common/ResError";
import useApiCall from "../../hooks/apiHook";
import TableContainer from "../../components/Common/TableContainer";

function Teacher() {
  //meta title
  document.title = "Teachers | FFU - ATMS";

  const [teachers, setTeachers] = useState([]);

  const {
    data,
    isError,
    isLoading,
    errMsg,
    refetch: teachersRefetch,
  } = useApiCall(
    "TEACHER_LIST",
    urls.teachers(),
    {
      payload: { isMiniView: false },
    },
    false
  );

  const navigate = useNavigate();

  const handleTeacherClicks = () => {
    navigate("create");
  };

  useEffect(() => {
    if (data) {
      setTeachers(data.data);
    }
  }, [data]);

  const onRefresh = useCallback(() => {
    teachersRefetch({
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
        accessor: "teacherid",
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
        Header: "Teacher ID",
        accessor: "techid",
        Cell: ({ cell }) => {
          return `${cell?.value?.toUpperCase()}`;
        },
      },
      {
        Header: "First Name",
        accessor: "firstname",
        Cell: ({ cell }) => {
          return `${cell?.value}`;
        },
      },
      {
        Header: "Middle Name",
        accessor: "middlename",
        Cell: ({ cell }) => {
          return `${cell?.value}`;
        },
      },
      {
        Header: "Last Name",
        accessor: "lastname",
        Cell: ({ cell }) => {
          return `${cell?.value}`;
        },
      },
      {
        Header: "Mobile No",
        accessor: "mobileno",
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
        Header: "Date",
        accessor: "createdat",
        Cell: ({ cell }) => {
          return dayjs(cell?.value).format("YYYY-MM-DD");
        },
      },
      {
        Header: "View",
        accessor: "techid",
        id: "ViewTechId",
        disableFilters: true,
        Cell: ({ cell }) => {
          return (
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              onClick={() =>
                navigate("detail", { state: { teacherId: cell?.value } })
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
          <Breadcrumbs title="Teachers" breadcrumbItem="Teachers List" />

          {isError && <ResError error={errMsg} />}

          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={teachers || []}
                    isGlobalFilter={false}
                    isAddOptions={true}
                    handleClick={handleTeacherClicks}
                    customPageSize={50}
                    className="custom-header-css"
                    isLoading={isLoading && !isError}
                    onRefresh={onRefresh}
                    title="Add New Teacher"
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

export default Teacher;
export { default as CreateTeacher } from "./CreateTeacher";
export { default as TeacherDetail } from "./TeacherDetail";

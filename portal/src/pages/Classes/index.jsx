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

function Class() {
  //meta title
  document.title = "Classes | FFU - ATMS";

  const [classes, setClasses] = useState([]);

  const {
    data,
    isError,
    isLoading,
    errMsg,
    refetch: classesRefetch,
  } = useApiCall(
    "CLASS_LIST",
    urls.classes(),
    {
      payload: {
        isMiniView: false,
        filters: {
          facultySlug: null,
          shiftSlug: null,
        },
      },
    },
    false
  );

  const navigate = useNavigate();

  const handleClassClicks = () => {
    navigate("create");
  };

  useEffect(() => {
    if (data) {
      setClasses(data.data);
    }
  }, [data]);

  const onRefresh = useCallback(() => {
    classesRefetch({
      payload: {
        isMiniView: false,
        filters: {
          facultySlug: null,
          shiftSlug: null,
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
        accessor: "classid",
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
        Header: "Class Name",
        accessor: "classname",
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
        Header: "Students",
        accessor: "_count.students",
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
        accessor: "classslug",
        disableFilters: true,
        Cell: ({ cell }) => {
          return (
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              onClick={() =>
                navigate("detail", { state: { classSlug: cell?.value } })
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
          <Breadcrumbs title="Classes" breadcrumbItem="Classes List" />

          {isError && <ResError error={errMsg} />}

          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={classes || []}
                    isGlobalFilter={false}
                    isAddOptions={true}
                    handleClick={handleClassClicks}
                    customPageSize={50}
                    className="custom-header-css"
                    isLoading={isLoading && !isError}
                    onRefresh={onRefresh}
                    title="Add New Class"
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

export default Class;
export { default as CreateClass } from "./CreateClass";
export { default as ClassDetail } from "./ClassDetail";

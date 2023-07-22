import "bootstrap/dist/css/bootstrap.min.css";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import TableContainer from "../../../components/Common/TableContainer";

//import components
import Breadcrumbs from "../../../components/Common/Breadcrumb";

import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import urls from "../../../api/urls";
import ResError from "../../../components/Common/ResError";
import useApiCall from "../../../hooks/apiHook";

function Shift() {
  //meta title
  document.title = "Shifts | FFU - ATMS";

  const [shifts, setShifts] = useState([]);

  const {
    data,
    isError,
    isLoading,
    errMsg,
    refetch: shiftsRefetch,
  } = useApiCall(
    "SHIFT_LIST",
    urls.shifts(),
    {
      payload: { isMiniView: false },
    },
    false
  );

  const navigate = useNavigate();

  const handleShiftClicks = () => {
    navigate("create");
  };

  useEffect(() => {
    if (data) {
      setShifts(data.data);
    }
  }, [data]);

  const onRefresh = useCallback(() => {
    shiftsRefetch({
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
        accessor: "shiftid",
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
        Header: "Shift Name",
        accessor: "shiftname",
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
        accessor: "shiftslug",
        disableFilters: true,
        Cell: ({ cell }) => {
          return (
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              onClick={() =>
                navigate("detail", { state: { shiftSlug: cell?.value } })
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
          <Breadcrumbs title="Shifts" breadcrumbItem="Shifts List" />

          {isError && <ResError error={errMsg} />}

          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={shifts || []}
                    isGlobalFilter={false}
                    isAddOptions={true}
                    handleClick={handleShiftClicks}
                    customPageSize={50}
                    className="custom-header-css"
                    isLoading={isLoading && !isError}
                    onRefresh={onRefresh}
                    title="Add New Shift"
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

export default Shift;
export { default as CreateShift } from "./CreateShift";
export { default as ShiftDetail } from "./ShiftDetail";

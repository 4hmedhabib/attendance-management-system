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

function Users() {
  //meta title
  document.title = "Users | FFU - ATMS";

  const [users, setUsers] = useState([]);

  const {
    data,
    isError,
    isLoading,
    errMsg,
    refetch: usersRefetch,
  } = useApiCall(
    "USER_LIST",
    urls.users(),
    {
      payload: {
        isMiniView: true,
        filters: {
          isAdmin: null,
        },
      },
    },
    false
  );

  const navigate = useNavigate();

  const handleUserClicks = () => {
    navigate("create");
  };

  useEffect(() => {
    if (data) {
      setUsers(data.data);
    }
  }, [data]);

  const onRefresh = useCallback(() => {
    usersRefetch({
      payload: {
        isMiniView: true,
        filters: {
          isAdmin: true,
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
        accessor: "userid",
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
        Header: "Username",
        accessor: "username",
        Cell: ({ cell }) => {
          return `${cell?.value?.toLowerCase()}`;
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
        Header: "Group",
        accessor: "group",
        Cell: ({ cell }) => {
          return `${cell?.value?.groupname}`;
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
        accessor: "user_id",
        id: "ViewUserId",
        disableFilters: true,
        Cell: ({ cell }) => {
          return (
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              onClick={() =>
                navigate("detail", { state: { userId: cell?.value } })
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
          <Breadcrumbs title="Users" breadcrumbItem="Users List" />

          {isError && <ResError error={errMsg} />}

          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={users || []}
                    isGlobalFilter={false}
                    isAddOptions={true}
                    handleClick={handleUserClicks}
                    customPageSize={50}
                    className="custom-header-css"
                    isLoading={isLoading && !isError}
                    onRefresh={onRefresh}
                    title="Add New User"
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

export default Users;
export { default as CreateUser } from "./CreateUser";
export { default as UserDetail } from "./UserDetail";

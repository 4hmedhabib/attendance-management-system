import "bootstrap/dist/css/bootstrap.min.css";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { isEmpty } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import * as Yup from "yup";
import TableContainer from "../../components/Common/TableContainer";

//import components
import Breadcrumbs from "../../components/Common/Breadcrumb";

import {
  addNewFaculty as onAddNewFaculty,
  deleteFaculty as onDeleteFaculty,
  getFaculties as onGetFaculties,
  updateFaculty as onUpdateFaculty,
} from "../../store/actions";

//redux
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, Col, Row } from "reactstrap";

const faculties = [
  {
    facultyid: 1,
    facultyname: "ICT/CS",
    facultyslug: "ict-cs",
    description: null,
    createdby: {
      username: "ahmedhabib",
      firstname: "Mohamed",
      middlename: "Haji",
      lastname: "Ali",
    },
    createdat: "2023-07-17T15:12:51.260Z",
    _count: {
      classes: 0,
    },
  },
];

function Faculty() {
  //meta title
  document.title = "Faculties | FFU - ATMS";

  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [orderList, setFacultyList] = useState([]);
  const [order, setFaculty] = useState(null);

  const navigate = useNavigate();

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      orderId: (order && order.orderId) || "",
      billingName: (order && order.billingName) || "",
      orderdate: (order && order.orderdate) || "",
      total: (order && order.total) || "",
      paymentStatus: (order && order.paymentStatus) || "Paid",
      badgeclass: (order && order.badgeclass) || "success",
      paymentMethod: (order && order.paymentMethod) || "Mastercard",
    },
    validationSchema: Yup.object({
      orderId: Yup.string()
        .matches(/[0-9\.\-\s+\/()]+/, "Please Enter Valid Faculty Id")
        .required("Please Enter Your Faculty Id"),
      billingName: Yup.string().required("Please Enter Your Billing Name"),
      orderdate: Yup.string().required("Please Enter Your Faculty Date"),
      total: Yup.string()
        .matches(/[0-9\.\-\s+\/()]+/, "Please Enter Valid Amount")
        .required("Total Amount"),
      paymentStatus: Yup.string().required("Please Enter Your Payment Status"),
      badgeclass: Yup.string().required("Please Enter Your Badge Class"),
      paymentMethod: Yup.string().required("Please Enter Your Payment Method"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updateFaculty = {
          id: order ? order.id : 0,
          orderId: values.orderId,
          billingName: values.billingName,
          orderdate: values.orderdate,
          total: values.total,
          paymentStatus: values.paymentStatus,
          paymentMethod: values.paymentMethod,
          badgeclass: values.badgeclass,
        };
        // update order
        dispatch(onUpdateFaculty(updateFaculty));
        validation.resetForm();
      } else {
        const newFaculty = {
          id: Math.floor(Math.random() * (30 - 20)) + 20,
          orderId: values["orderId"],
          billingName: values["billingName"],
          orderdate: values["orderdate"],
          total: values["total"],
          paymentStatus: values["paymentStatus"],
          paymentMethod: values["paymentMethod"],
          badgeclass: values["badgeclass"],
        };
        // save new order
        dispatch(onAddNewFaculty(newFaculty));
        validation.resetForm();
      }
      toggle();
    },
  });

  const toggleViewModal = () => setModal1(!modal1);

  const dispatch = useDispatch();
  const { orders } = useSelector((state) => ({
    orders: state.ecommerce.orders,
  }));

  useEffect(() => {
    if (orders && !orders.length) {
      dispatch(onGetFaculties());
    }
  }, [dispatch, orders]);

  useEffect(() => {
    setFacultyList(orders);
  }, [orders]);

  useEffect(() => {
    if (!isEmpty(orders) && !!isEdit) {
      setFacultyList(orders);
      setIsEdit(false);
    }
  }, [orders]);

  const toggle = () => {
    if (modal) {
      setModal(false);
      setFaculty(null);
    } else {
      setModal(true);
    }
  };

  const handleFacultyClick = (arg) => {
    const order = arg;
    setFaculty({
      id: order.id,
      orderId: order.orderId,
      billingName: order.billingName,
      orderdate: order.orderdate,
      total: order.total,
      paymentStatus: order.paymentStatus,
      paymentMethod: order.paymentMethod,
      badgeclass: order.badgeclass,
    });

    setIsEdit(true);

    toggle();
  };

  //delete order
  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = (order) => {
    setFaculty(order);
    setDeleteModal(true);
  };

  const handleDeleteFaculty = () => {
    if (order && order.id) {
      dispatch(onDeleteFaculty(order.id));
      setDeleteModal(false);
      setFaculty("");
    }
  };
  const handleFacultyClicks = () => {
    navigate("create");
    setFacultyList("");
    setIsEdit(false);
    toggle();
  };

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
        accessor: "view",
        disableFilters: true,
        Cell: ({ cell }) => {
          return (
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              // onClick={}
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
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={faculties}
                    isGlobalFilter={false}
                    isAddOptions={true}
                    handleFacultyClicks={handleFacultyClicks}
                    customPageSize={50}
                    className="custom-header-css"
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

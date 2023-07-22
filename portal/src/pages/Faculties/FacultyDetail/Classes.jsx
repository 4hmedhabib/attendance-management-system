import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Spinner, Table } from "reactstrap";
import ResError from "../../../components/Common/ResError";

const Classes = ({
  classesData,
  classesErrMsg,
  classesIsLoading,
  classesIsErr,
}) => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    if (classesData) {
      setClasses(classesData.data);
    }
  }, [classesData]);

  if (classesIsLoading) {
    return (
      <div className="page-content ">
        <Col lg={12} className="text-center mt-5">
          <Spinner />
        </Col>
      </div>
    );
  } else if (classesIsErr) {
    return <ResError error={classesErrMsg} />;
  }

  return (
    <Card>
      <CardBody>
        <h4 className="card-title mb-4">Classes</h4>

        <div className="table-responsive">
          <Table className="table table-nowrap align-middle mb-0">
            <thead>
              <tr>
                <th scope="col">Class Name</th>
                <th scope="col">Shifts</th>
                <th scope="col">Students</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {classes?.map((classDetail, idx) => (
                <tr key={idx}>
                  <th scope="row">
                    <div className="d-flex align-items-center">
                      <span>{classDetail?.classname}</span>
                    </div>
                  </th>
                  <td>
                    <h5 className="font-size-14 mb-1">
                      {classDetail?.shift?.shiftname}
                    </h5>
                  </td>
                  <td>
                    <h5 className="font-size-14 mb-1">
                      {classDetail?._count?.students}
                    </h5>
                  </td>
                  <td style={{ width: "120px" }}>
                    <Link to="#" className="btn btn-primary btn-sm w-xs">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
};

export default Classes;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Table } from "reactstrap";

const Classes = ({ facultySlug }) => {
  const [classes, setClasses] = useState([]);

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
              {classes.map((asset, key) => (
                <tr key={key}>
                  <th scope="row">
                    <div className="d-flex align-items-center">
                      <span>{asset.title}</span>
                    </div>
                  </th>
                  <td>
                    <h5 className="font-size-14 mb-1">{asset.title}</h5>
                  </td>
                  <td>
                    <h5 className="font-size-14 mb-1">
                      {parseInt(asset.loansRate * 100)}
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

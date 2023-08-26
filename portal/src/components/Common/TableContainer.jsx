import PropTypes from "prop-types";
import React, { Fragment } from "react";
import {
  useExpanded,
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { Button, Col, Input, Row, Spinner, Table } from "reactstrap";
import { DefaultColumnFilter } from "./filters";

const TableContainer = ({
  columns,
  data,
  handleClick,
  customPageSize,
  className,
  customPageSizeOptions,
  isLoading,
  onRefresh = () => {},
  title = "",
  isHideAdd = false,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: {
        pageIndex: 0,
        pageSize: customPageSize,
        sortBy: [
          {
            desc: true,
          },
        ],
      },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
  );

  const onChangeInSelect = (event) => {
    setPageSize(Number(event.target.value));
  };

  const onChangeInInput = (event) => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    gotoPage(page);
  };
  return (
    <Fragment>
      <Row className="mb-2">
        <Col
          xs="6"
          sm={customPageSizeOptions ? 3 : 3}
          md={customPageSizeOptions ? 3 : 2}
        >
          <select
            className="form-select"
            value={pageSize}
            onChange={onChangeInSelect}
          >
            {[50, 100, 150, 200, 250].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </Col>

        <Col
          xs="6"
          sm="9"
          md="10"
          className="d-flex mb-2 justify-content-end align-items-center"
        >
          <Button
            type="button"
            color="info"
            className="btn-rounded  mb-0 me-2"
            onClick={onRefresh}
          >
            <i className="mdi mdi-reload me-1" />
            Refresh
          </Button>
          {!isHideAdd && (
            <Button
              type="button"
              color="success"
              className="btn-rounded  mb-0 me-2"
              onClick={handleClick}
            >
              <i className="mdi mdi-plus me-1" />
              {title}
            </Button>
          )}{" "}
        </Col>
      </Row>

      <div className="table-responsive react-table overflow-x-auto">
        {isLoading ? (
          <div className="d-flex justify-content-center my-5">
            <Spinner />
          </div>
        ) : (
          <Table ç hover {...getTableProps()} className={className}>
            <thead className="table-light table-nowrap">
              {headerGroups.map((headerGroup) => (
                <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th className="pt-2" key={column.id}>
                      {/* <div className="m-0 p-0" {...column.getSortByToggleProps()}> */}
                      {column.render("Header")}
                      {/* {generateSortingIndicator(column)} */}
                      {/* </div> */}
                      {/* <Filter column={column} /> */}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <Fragment key={row.getRowProps().key}>
                    <tr>
                      {row.cells.map((cell) => {
                        return (
                          <td key={cell.id} {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          </Table>
        )}
      </div>

      <Row className="justify-content-md-end justify-content-center align-items-center">
        <Col className="col-md-auto">
          <div className="d-flex gap-1">
            <Button
              color="primary"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {"<<"}
            </Button>
            <Button
              color="primary"
              onClick={previousPage}
              disabled={!canPreviousPage}
            >
              {"<"}
            </Button>
          </div>
        </Col>
        <Col className="col-md-auto d-none d-md-block">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </Col>
        <Col className="col-md-auto">
          <Input
            type="number"
            min={1}
            style={{ width: 70 }}
            max={pageOptions.length}
            defaultValue={pageIndex + 1}
            onChange={onChangeInInput}
          />
        </Col>

        <Col className="col-md-auto">
          <div className="d-flex gap-1">
            <Button color="primary" onClick={nextPage} disabled={!canNextPage}>
              {">"}
            </Button>
            <Button
              color="primary"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </Button>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

TableContainer.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default TableContainer;

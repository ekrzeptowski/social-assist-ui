import React from "react";

import { useTable, useSortBy, usePagination } from "react-table";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableSortLabel,
} from "@material-ui/core";

import Skeleton from "@material-ui/lab/Skeleton";

const ServerTable = ({
  columns,
  data,
  fetchData,
  loading,
  pageCount,
  count,
  sort,
}) => {
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    getTableBodyProps,
    setPageSize,

    state: { pageIndex, pageSize, sortBy },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 20, sortBy: sort || [] },
      manualPagination: true,
      manualSortBy: true,
      pageCount,
    },
    useSortBy,
    usePagination
  );

  React.useEffect(() => {
    fetchData({ pageIndex, pageSize, sortBy });
  }, [fetchData, pageIndex, pageSize, sortBy]);

  const handleChangePage = (event, newPage) => {
    gotoPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(Number(event.target.value));
  };

  return (
    <TableContainer>
      <Table size="small" {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <>
                  {column.canSort ? (
                    <TableCell
                      {...column.getHeaderProps([
                        column.getSortByToggleProps(),
                        { className: column.className, style: column.style },
                      ])}
                      className={column.className}
                      sortDirection={column.isSortedDesc ? "desc" : false}
                    >
                      <TableSortLabel
                        active={column.isSorted}
                        direction={column.isSortedDesc ? "desc" : "asc"}
                      >
                        {column.render("Header")}
                      </TableSortLabel>
                    </TableCell>
                  ) : (
                    <TableCell
                      {...column.getHeaderProps()}
                      className={column.className}
                    >
                      {column.render("Header")}
                    </TableCell>
                  )}
                </>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {data.length === 0 &&
            [...Array(pageSize)].map((item, i) => (
              <TableRow key={i}>
                {headerGroups.map((headerGroup) =>
                  headerGroup.headers.map((header, i) => (
                    <TableCell {...header.getHeaderProps()}>
                      <Skeleton variant="text"></Skeleton>
                    </TableCell>
                  ))
                )}
              </TableRow>
            ))}
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <TableCell
                      {...cell.getCellProps([
                        {
                          className: cell.column.className,
                          style: cell.column.style,
                        },
                      ])}
                      style={cell.style}
                    >
                      {cell.render(
                        loading ? (
                          <Skeleton
                            variant="text"
                            width={cell.width}
                          ></Skeleton>
                        ) : (
                          "Cell"
                        )
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10, 20, 50, 100]}
              colSpan={3}
              count={count}
              rowsPerPage={pageSize}
              page={pageIndex}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default ServerTable;

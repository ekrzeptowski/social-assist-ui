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
  useTheme,
  useMediaQuery,
  Box,
  MenuItem,
  Button,
  Menu,
} from "@material-ui/core";

import Skeleton from "@material-ui/lab/Skeleton";
import useTableStyles from "./styles";

import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

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

  const theme = useTheme();
  const classes = useTableStyles();
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));

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
      {mobile && (
        <>
          {sortBy[0]?.id ? "Sorting by:" : "Sort by:"}{" "}
          {
            <PopupState variant="popover" popupId="sortByMenu">
              {(popupState) => (
                <>
                  <Button {...bindTrigger(popupState)}>
                    {sortBy[0]?.id ? (
                      <>
                        {headerGroups[0]?.headers[
                          headerGroups[0]?.headers.findIndex(
                            (item) => item.id === sortBy[0]?.id
                          )
                        ].render("Header")}
                        {sortBy[0]?.desc ? (
                          <ArrowDropDownIcon />
                        ) : (
                          <ArrowDropUpIcon />
                        )}
                      </>
                    ) : (
                      "Select item"
                    )}
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    {headerGroups.map((headerGroup) => {
                      return headerGroup.headers.map(
                        (column) =>
                          column.Header.length > 0 && (
                            <MenuItem
                              key={column.id}
                              value={column.id}
                              {...column.getHeaderProps([
                                column.getSortByToggleProps(),
                              ])}
                              onClick={() => {
                                column.toggleSortBy();
                                popupState.close();
                              }}
                            >
                              {column.render("Header")}
                              {column.isSorted &&
                                (column.isSortedDesc ? (
                                  <ArrowDropDownIcon />
                                ) : (
                                  <ArrowDropUpIcon />
                                ))}
                            </MenuItem>
                          )
                      );
                    })}
                  </Menu>
                </>
              )}
            </PopupState>
          }
        </>
      )}
      <Table size="small" {...getTableProps()}>
        {!mobile && (
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) =>
                  column.canSort ? (
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
                  )
                )}
              </TableRow>
            ))}
          </TableHead>
        )}
        <TableBody {...getTableBodyProps()}>
          {data.length === 0 &&
            [...Array(pageSize)].map((item, i) => (
              <TableRow key={i}>
                {headerGroups.map((headerGroup) =>
                  headerGroup.headers.map(
                    (header, i) =>
                      (i <= 1 || !mobile) && (
                        <TableCell
                          {...header.getHeaderProps({
                            className: header.className,
                            style: header.style,
                          })}
                        >
                          {header.id === "user.avatar" ||
                          header.id === "avatar" ? (
                            <Skeleton variant="circle" width={40} height={40} />
                          ) : header.id === "user.name" ||
                            header.id === "name" ? (
                            <div>
                              <Skeleton width={150} />
                              <Skeleton width={100} />
                              {mobile && (
                                <Box display="flex" flexWrap="wrap">
                                  {headerGroup.headers.map(
                                    (header, i) =>
                                      i > 1 && (
                                        <div
                                          key={i}
                                          className={classes.nestedCell}
                                        >
                                          {header.Header}:{" "}
                                          <Box fontWeight={700}>
                                            <Skeleton />
                                          </Box>
                                        </div>
                                      )
                                  )}
                                </Box>
                              )}
                            </div>
                          ) : (
                            !mobile && <Skeleton />
                          )}
                        </TableCell>
                      )
                  )
                )}
              </TableRow>
            ))}
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {mobile
                  ? row.cells.map((cell, index) => {
                      return (
                        index <= 1 && (
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
                                <>
                                  {cell.column.id === "user.avatar" ||
                                  cell.column.id === "avatar" ? (
                                    <Skeleton
                                      variant="circle"
                                      width={40}
                                      height={40}
                                    />
                                  ) : (
                                    cell.column.id === "user.name" ||
                                    (cell.column.id === "name" && (
                                      <div>
                                        <Skeleton width={150} />
                                        <Skeleton width={100} />
                                        <Box display="flex" flexWrap="wrap">
                                          {row.cells.map((cell, index) => {
                                            return (
                                              index > 1 && (
                                                <div
                                                  key={index}
                                                  className={classes.nestedCell}
                                                >
                                                  {cell.column.Header}:{" "}
                                                  <Box fontWeight={700}>
                                                    <Skeleton />
                                                  </Box>
                                                </div>
                                              )
                                            );
                                          })}
                                        </Box>
                                      </div>
                                    ))
                                  )}
                                </>
                              ) : mobile && index === 1 ? (
                                (cell) => (
                                  <>
                                    {cell.cell.render("Cell")}
                                    <Box display="flex" flexWrap="wrap">
                                      {row.cells.map((cell, index) => {
                                        return (
                                          index > 1 && (
                                            <div
                                              key={index}
                                              className={classes.nestedCell}
                                            >
                                              {cell.column.Header}:{" "}
                                              <Box fontWeight={700}>
                                                {cell.render("Cell")}
                                              </Box>
                                            </div>
                                          )
                                        );
                                      })}
                                    </Box>
                                  </>
                                )
                              ) : (
                                "Cell"
                              )
                            )}
                          </TableCell>
                        )
                      );
                    })
                  : row.cells.map((cell) => {
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
                              <>
                                {cell.column.id === "user.avatar" ||
                                cell.column.id === "avatar" ? (
                                  <Skeleton
                                    variant="circle"
                                    width={40}
                                    height={40}
                                  />
                                ) : cell.column.id === "user.name" ||
                                  cell.column.id === "name" ? (
                                  <div>
                                    <Skeleton width={150} />
                                    <Skeleton width={100} />
                                  </div>
                                ) : (
                                  <Skeleton />
                                )}
                              </>
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
              classes={{ toolbar: classes.tablePagination }}
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

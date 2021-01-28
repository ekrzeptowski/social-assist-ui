import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";

import requireAuth from "../../../hoc/requireAuth";
import ServerTable from "../../Table/ServerTable";

import useTableStyles from "../../Table/styles";
import Axios from "axios";

import { formatFollowers } from "../../../helpers/format";
import { Avatar, Name } from "../../Table/Fields";
import SEO from "../../Seo";

const Followers = ({ auth }) => {
  const classes = useTableStyles();

  const columns = React.useMemo(
    () => [
      {
        accessor: "avatar",
        className: classes.avatar,
        width: 40,
        Cell: ({ row: { original } }) => <Avatar user={original} />,
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ row: { original } }) => <Name user={original} />,
      },
      {
        Header: "Followers",
        accessor: "followers_count",
        className: classes.followers,
        width: 60,
        Cell: ({ row: { original } }) =>
          formatFollowers(original.followers_count),
      },
      {
        Header: "Following",
        accessor: "friends_count",
        className: classes.followers,
        width: 60,
        Cell: ({ row: { original } }) =>
          formatFollowers(original.friends_count),
      },
    ],
    [classes.avatar, classes.followers]
  );

  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const fetchData = React.useCallback(
    ({ pageSize, pageIndex, sortBy }) => {
      // Set the loading state
      setLoading(true);

      Axios.get(`/api/followers/followers`, {
        params: {
          page: pageIndex + 1,
          limit: pageSize,
          sort:
            sortBy.length > 0
              ? `${sortBy[0]?.desc ? "-" : ""}${sortBy[0]?.id}`
              : "",
        },
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": auth.token,
        },
      }).then((res) => {
        setData(res.data.docs);
        setPageCount(res.data.totalPages);
        setCount(res.data.totalDocs);
        setLoading(false);
      });
    },
    [auth.token]
  );

  return (
    <>
      <SEO title="Followers" />
      <h1>Followers page</h1>
      
      <ServerTable
        data={data}
        columns={columns}
        fetchData={fetchData}
        loading={loading}
        pageCount={pageCount}
        count={count}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(requireAuth, connect(mapStateToProps))(Followers);

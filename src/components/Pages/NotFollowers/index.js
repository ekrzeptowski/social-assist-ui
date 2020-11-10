import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";

import Loader from "../../Loader/Loader";
import requireAuth from "../../../hoc/requireAuth";
import ServerTable from "../../Table/ServerTable";
import Axios from "axios";
import useTableStyles from "../../Table/styles";
import { formatFollowers } from "../../../helpers/format";
import { Avatar, Name } from "../../Table/Fields";
import SEO from "../../Seo";

const NotFollowers = ({ auth }) => {
  const classes = useTableStyles();

  const columns = React.useMemo(
    () => [
      {
        accessor: "avatar",
        className: classes.avatar,
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
        Cell: ({ row: { original } }) =>
          formatFollowers(original.followers_count),
      },
      {
        Header: "Following",
        accessor: "friends_count",
        className: classes.followers,
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

      Axios.get(`/api/followers/notfollowers`, {
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
      <SEO title="Not following back" />
      <h1>Not following back page</h1>

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

export default compose(requireAuth, connect(mapStateToProps))(NotFollowers);

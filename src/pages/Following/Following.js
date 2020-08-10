import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";

import Layout from "../../layout/Layout";
import Loader from "../../components/Loader/Loader";
import requireAuth from "../../hoc/requireAuth";
import { Grid, Typography, Avatar } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import Link from "@material-ui/core/Link";
import ServerTable from "../../components/Table/ServerTable";
import Axios from "axios";
import useTableStyles from "../../components/Table/styles";

const Following = ({ auth }) => {
  const classes = useTableStyles();

  const columns = React.useMemo(
    () => [
      {
        accessor: "avatar",
        className: classes.avatar,
        Cell: ({ row: { original } }) => (
          <Avatar alt={original.name} src={original.avatar} />
        ),
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ row: { original } }) => (
          <Grid item>
            <Typography>
              {original.name}
              {original.protected && <LockIcon style={{ fontSize: 16 }} />}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              <Link href={`https://twitter.com/${original.screen_name}`}>
                @{original.screen_name}
              </Link>
            </Typography>
          </Grid>
        ),
      },
      {
        Header: "Following",
        accessor: "friends_count",
        className: classes.followers,
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

      Axios.get(`/api/followers/following`, {
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
    <Layout>
      <div className="users">
        <h1>Following page</h1>
        <div className="list">
          {false ? (
            <Loader />
          ) : (
            <>
              <ServerTable
                data={data}
                columns={columns}
                fetchData={fetchData}
                loading={loading}
                pageCount={pageCount}
                count={count}
              />
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(requireAuth, connect(mapStateToProps, {}))(Following);

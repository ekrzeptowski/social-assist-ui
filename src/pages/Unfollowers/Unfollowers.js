import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";

import Loader from "../../components/Loader/Loader";
import requireAuth from "../../hoc/requireAuth";
import { Grid, Typography, Avatar } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import Link from "@material-ui/core/Link";
import ServerTable from "../../components/Table/ServerTable";
import Axios from "axios";
import useTableStyles from "../../components/Table/styles";
import { format, parseISO } from "date-fns";
import { formatFollowers } from "../../helpers/format";

const Unfollowers = ({ auth }) => {
  const classes = useTableStyles();

  const columns = React.useMemo(
    () => [
      {
        accessor: "user.avatar",
        className: classes.avatar,
        width: 40,
        Cell: ({
          row: {
            original: { user },
          },
        }) => <Avatar alt={user?.name} src={user?.avatar} />,
      },
      {
        Header: "Name",
        accessor: "user.name",
        Cell: ({
          row: {
            original: { user },
          },
        }) => (
          <Grid item>
            {user ? (
              <>
                <Typography className={user?.suspended && classes.suspended}>
                  {user?.name}
                  {user?.protected && <LockIcon style={{ fontSize: 16 }} />}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  <Link href={`https://twitter.com/${user?.screen_name}`}>
                    @{user?.screen_name}
                  </Link>
                </Typography>
              </>
            ) : (
              <Typography>You don't have any unfollower</Typography>
            )}
          </Grid>
        ),
      },
      {
        Header: "Following",
        accessor: "user.friends_count",
        className: classes.followers,
        Cell: ({ row: { original } }) =>
          formatFollowers(original?.user?.friends_count),
      },
      {
        Header: "Date of unfollow",
        accessor: "date",
        className: classes.unfollowDate,
        Cell: ({
          row: {
            original: { date },
          },
        }) => (date ? format(parseISO(date), "do MMM") : null),
      },
    ],
    [classes.avatar, classes.followers, classes.suspended, classes.unfollowDate]
  );

  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const fetchData = React.useCallback(
    ({ pageSize, pageIndex, sortBy }) => {
      // Set the loading state
      setLoading(true);

      Axios.get(`/api/followers/unfollowers`, {
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
    <div className="users">
      <h1>Unfollowers page</h1>
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
              sort={[{ id: "date", desc: true }]}
            />
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(requireAuth, connect(mapStateToProps))(Unfollowers);

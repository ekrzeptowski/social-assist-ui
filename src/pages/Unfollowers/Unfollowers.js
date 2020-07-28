import React, { useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";

import { getUnfollowers } from "../../store/actions/followersActions";
import Layout from "../../layout/Layout";
import Loader from "../../components/Loader/Loader";
import requireAuth from "../../hoc/requireAuth";
import PeopleTable from "../../components/Table/Table";
import { Grid, Typography, Avatar, makeStyles } from "@material-ui/core";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles({
  avatar: {
    width: 40,
  },
});

const Unfollowers = ({
  getUnfollowers,
  followers: { unfollowers, isLoading },
}) => {
  const classes = useStyles();

  useEffect(() => {
    if (!unfollowers && !isLoading) {
      getUnfollowers();
    }
  }, []);

  const columns = React.useMemo(
    () => [
      {
        accessor: "user.avatar",
        className: classes.avatar,
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
            <Typography>{user?.name}</Typography>
            <Typography variant="caption" color="textSecondary">
              <Link href={`https://twitter.com/${user?.screen_name}`}>
                @{user?.screen_name}
              </Link>
            </Typography>
          </Grid>
        ),
      },
      {
        Header: "Following",
        accessor: "user.friends_count",
      },
      {
        Header: "Date of unfollow",
        accessor: "date",
      },
    ],
    []
  );

  return (
    <Layout>
      <div className="users">
        <h1>Unfollowers page</h1>
        <div className="list">
          {isLoading ? (
            <Loader />
          ) : (
            unfollowers && (
              <>
                <PeopleTable data={unfollowers} columns={columns} />
              </>
            )
          )}
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  followers: state.followers,
});

export default compose(
  requireAuth,
  connect(mapStateToProps, { getUnfollowers })
)(Unfollowers);

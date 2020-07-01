import React, { useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getFollowers } from "../../store/actions/followersActions";
import Layout from "../../layout/Layout";
import Loader from "../../components/Loader/Loader";
import requireAuth from "../../hoc/requireAuth";
import PeopleTable from "../../components/Table/Table";
import { Grid, Typography, Avatar, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  avatar: {
    width: 40,
  },
});

const Followers = ({ getFollowers, followers: { followers, isLoading } }) => {
  const classes = useStyles();
  
  useEffect(() => {
    if (followers.length == 0 && !isLoading) {
      getFollowers();
    }
  }, []);

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
            <Typography>{original.name}</Typography>
            <Typography variant="caption" color="textSecondary">
              @{original.screen_name}
            </Typography>
          </Grid>
        ),
      },
      {
        Header: "Following",
        accessor: "friends_count",
      },
    ],
    []
  );

  return (
    <Layout>
      <div className="users">
        <h1>Followers page</h1>
        <div className="list">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <PeopleTable data={followers} columns={columns} />
            </>
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
  connect(mapStateToProps, { getFollowers })
)(Followers);

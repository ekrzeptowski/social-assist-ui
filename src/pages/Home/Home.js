import React, { useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import Layout from "../../layout/Layout";
import {
  getFollowers,
  getFollowersHistory,
  getFollowersStats,
} from "../../store/actions/followersActions";

import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid
} from "@material-ui/core";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
});

const Home = ({
  auth,
  // getFollowers,
  getFollowersHistory,
  getFollowersStats,
  followers: {
    // followers,
    isLoading,
    totalFollowers,
    totalFollowing,
    followersHistory,
  },
}) => {
  const classes = useStyles();

  useEffect(() => {
    if (!totalFollowers && !isLoading && auth.isAuthenticated) {
      // getFollowers();
      getFollowersStats();
      getFollowersHistory();
    }
  }, [auth.isAuthenticated]);

  if (!auth.isAuthenticated) return <Redirect to="/login" />;

  return (
    <Layout>
      <div className="home-page">
        {/* <h1>Home page</h1> */}
        {!auth.isAuthenticated ? (
          <div>
            <p>
              Welcome guest!{" "}
              <Link className="bold" to="/login">
                Log in
              </Link>{" "}
              or{" "}
              <Link className="bold" to="/register">
                Register
              </Link>
            </p>
          </div>
        ) : (
          <>
            <Typography variant="h5">Welcome @{auth.me.username}</Typography>
            <Grid container>
              <Grid item>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant="h5">
                      {totalFollowers}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      Followers
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant="h5">{totalFollowing}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      Following
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </>
        )}
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  followers: state.followers,
});

export default compose(
  connect(mapStateToProps, {
    // getFollowers,
    getFollowersHistory,
    getFollowersStats,
  })
)(Home);

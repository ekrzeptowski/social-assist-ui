import React, { useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { connect } from "react-redux";

import { BreedingRhombusSpinner } from "react-epic-spinners";

import { syncData } from "../../store/actions/syncActions";
import SyncProgress from "../../components/SyncProgress";

const useStyles = makeStyles((theme) => ({
  popover: {
    width: theme.spacing(40),
    borderRadius: theme.shape.borderRadius,
  },
  container: {
    display: "flex",
    padding: theme.spacing(2),
    flexDirection: "column",
    alignItems: "center",
  },
  progressContainer: {
    width: "100%",
    maxWidth: 400,
  },
  spinner: {
    margin: "40px 0",
  },
  actions: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const FirstSync = ({
  anchorEl,
  auth: {
    me: { tier },
  },
  onClose,
  followers,
  sync,
  syncData,
  websocket,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  useEffect(() => {
    !followers.fetchedAt && websocket.connected && syncData();
  }, [followers.fetchedAt, websocket.connected, syncData]);

  return (
    <div className={classes.container}>
      <BreedingRhombusSpinner
        color={theme.palette.primary.main}
        className={classes.spinner}
      />
      <Typography variant="h5">
        Please wait while we are preparing app for first use
      </Typography>
      <SyncProgress
        className={classes.progressContainer}
        tier={tier.name}
        fetchedAt={followers.fetchedAt}
        sync={sync}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  followers: state.followers,
  sync: state.sync,
  websocket: state.websocket,
});

export default connect(mapStateToProps, { syncData })(FirstSync);

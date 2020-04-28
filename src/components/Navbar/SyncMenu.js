import React, { useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Avatar, Typography, Button } from "@material-ui/core";
import { Popover } from "@material-ui/core";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import { syncData } from "../../store/actions/syncActions";

dayjs.extend(localizedFormat);

const useStyles = makeStyles(theme => ({
  popover: {
    // background: theme.custom.palette.profilePopColor,
    width: theme.spacing(40),
    borderRadius: theme.shape.borderRadius
  },
  container: {
    display: "flex",
    padding: theme.spacing(2),
    flexDirection: "column",
    alignItems: "center"
  },
  actions: {
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

const SyncMenu = ({ anchorEl, onClose, followers, sync, syncData }) => {
  const classes = useStyles();
  const theme = useTheme();

  useEffect(() => {
    // syncData();
  }, []);

  return (
    <div>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        classes={{
          paper: classes.popover
        }}
      >
        <div className={classes.container}>
          <Typography>Synced at: {dayjs(followers.fetchedAt).format('LLL')}</Typography>
          <Typography>Status: {sync.statusMessage || sync.error}</Typography>
          <div className={classes.actions}>
            <Button variant="contained" color="primary" onClick={() => syncData()}>
              Sync
            </Button>
            <Button variant="contained">Sign-out</Button>
          </div>
        </div>
      </Popover>
    </div>
  );
};

const mapStateToProps = state => ({
  followers: state.followers,
  sync: state.sync
});

export default connect(mapStateToProps, { syncData })(SyncMenu);

import { LinearProgress, makeStyles, Typography } from "@material-ui/core";
import { addHours, formatDistance } from "date-fns";
import React from "react";

const syncStages = {
  FETCHING_FOLLOWERS_IDS: { string: "Updating followers" },
  FETCHED_FOLLOWERS_IDS: { string: "Done updating followers" },
  FETCHING_FOLLOWING_IDS: { string: "Updating following" },
  FETCHED_FOLLOWING_IDS: { string: "Done updating following" },
  PROCESSING_UNFOLLOWERS_DATA: {
    string: "Checking for unfollowers",
    progress: true,
  },
  SAVED_FOLLOWERS_IDS: { string: "Saving followers" },
  PROCESSING_USERS_DATA: { string: "Updating users data", progress: true },
  SAVING_FOLLOWERS_DATA: { string: "Saving users data" },
  SAVING_UNFOLLOWERS_DATA: { string: "Saving unfollowers data" },
  SUCCESS: { string: "Successfully updated data" },
  RATE_LIMIT: {
    string:
      "You've exceeded number of allowed data updates. Please try again in ",
  },
};

const useStyles = makeStyles((theme) => ({
  container: {
    // textAlign: "center",
    width: "100%",
  },
}));

export default function SyncProgress({
  className,
  tier,
  fetchedAt,
  sync: { statusMessage, progress, isLoading, error },
}) {
  const classes = useStyles();
  return (
    <div className={className || classes.container}>
      <Typography gutterBottom>
        {statusMessage && syncStages[statusMessage].string}
        {error && syncStages[error].string}
        {error === "RATE_LIMIT" &&
          formatDistance(
            addHours(new Date(fetchedAt), tier === "Premium" ? 6 : 24),
            new Date()
          )}
      </Typography>
      {progress ? (
        <LinearProgress variant="determinate" value={progress * 100} />
      ) : (
        isLoading && <LinearProgress />
      )}
    </div>
  );
}

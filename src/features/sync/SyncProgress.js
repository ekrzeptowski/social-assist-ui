import { LinearProgress, makeStyles, Typography } from "@material-ui/core";
import { addHours, formatDistance } from "date-fns";
import React from "react";
import { syncStages } from "./syncStages";

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
            new Date(),
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

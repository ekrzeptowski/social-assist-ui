import React from "react";
import OpenWithIcon from "@material-ui/icons/OpenWith";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  grabContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    textAlign: "center",
    "&:hover svg": {
      //   handle: {
      opacity: 1,
      //   },
    },
  },
  handle: {
    marginLeft: "auto !important",
    fontSize: 16,
    cursor: "move",
    opacity: 0.3,
    transition: "0.3s opacity linear",

    // left: "50%",
    // transform: "translateX(-50%)",
  },
});

export function DragHandle() {
  const classes = useStyles();

  return (
    <div className={classes.grabContainer}>
      <OpenWithIcon className={classes.handle + " drag-handle"} />
    </div>
  );
}

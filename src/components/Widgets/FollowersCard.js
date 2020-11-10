import React, { memo } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";

import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Skeleton from "@material-ui/lab/Skeleton";
import { Link } from "gatsby";
import { formatFollowers } from "../../helpers/format";
// import { DragHandle } from "./DragHandle";
import useCardStyles from "./styles";

export default memo(function FollowersCard({
  totalFollowers,
  followersChange,
  children,
  ...props
}) {
  const classes = useCardStyles();
  return (
    <Card {...props}>
      <CardContent className={classes.cardContent}>
        <Typography variant="h5">
          {totalFollowers ? (
            formatFollowers(totalFollowers)
          ) : (
            <Skeleton width={50} />
          )}
          {followersChange > 0
            ? totalFollowers && (
                <>
                  <ArrowDropUpIcon style={{ color: green[500] }} />
                  {followersChange}
                </>
              )
            : followersChange < 0 &&
              totalFollowers && (
                <>
                  <ArrowDropDownIcon style={{ color: red[500] }} />
                  {followersChange}
                </>
              )}
        </Typography>
        {/* <DragHandle /> */}
      </CardContent>
      <CardActions>
        <Button component={Link} to="/followers" size="small" color="primary">
          Followers
        </Button>
      </CardActions>
      {children}
    </Card>
  );
});

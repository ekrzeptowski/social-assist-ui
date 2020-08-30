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

export default memo(function FollowersCard({
  totalFollowers,
  followersChange,
  children,
  ...props
}) {
  return (
    <Card {...props}>
      <CardContent>
        <Typography variant="h5">
          {totalFollowers}
          {followersChange > 0 ? (
            <>
              <ArrowDropUpIcon style={{ color: green[500] }} />
              {followersChange}
            </>
          ) : (
            followersChange < 0 && (
              <>
                <ArrowDropDownIcon style={{ color: red[500] }} />
                {followersChange}
              </>
            )
          )}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Followers
        </Button>
      </CardActions>
      {children}
    </Card>
  );
});

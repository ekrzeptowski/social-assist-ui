import React, { memo } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@material-ui/core";

export default memo(function FollowingCard({
  totalFollowing,
  children,
  ...props
}) {
  return (
    <Card {...props}>
      <CardContent>
        <Typography variant="h5">{totalFollowing}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Following
        </Button>
      </CardActions>
      {children}
    </Card>
  );
});

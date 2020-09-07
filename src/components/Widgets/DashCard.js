import React, { memo } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";

export default memo(function DashCard({
  data,
  link,
  children,
  ...props
}) {
  return (
    <Card {...props}>
      <CardContent>
        <Typography variant="h5">{data ? data : <Skeleton width={50}/>}</Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to={link.to} size="small" color="primary">
          {link.text}
        </Button>
      </CardActions>
      {children}
    </Card>
  );
});

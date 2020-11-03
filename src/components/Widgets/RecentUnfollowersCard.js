import React, { memo } from "react";
import {
  Card,
  CardContent,
  Button,
  CardActions,
  makeStyles,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@material-ui/core";
import clsx from "clsx";
import { Link } from "react-router-dom";
import LockIcon from "@material-ui/icons/Lock";
import Skeleton from "@material-ui/lab/Skeleton";
// import { DragHandle } from "./DragHandle";

const useStyles = makeStyles({
  card: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  cardContent: {
    overflowY: "scroll",
    padding: 0,
    position: "relative",
  },
  title: {
    display: "flex",
    alignItems: "center",
  },
  suspended: {
    color: "#9e9e9e",
  },
});

export default memo(function RecentUnfollowersCard({
  link,
  unfollowers,
  children,
  ...props
}) {
  const classes = useStyles();

  return (
    <Card {...props} className={classes.card}>
      <CardContent className={classes.cardContent}>
        <List dense disablePadding>
          {unfollowers?.length > 0 && unfollowers[0].user
            ? unfollowers.map((user) => (
                <ListItem button divider key={user._id}>
                  <ListItemAvatar>
                    <Avatar src={user?.user?.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    classes={{
                      primary: clsx(
                        classes.title,
                        user?.user?.suspended && classes.suspended
                      ),
                      // secondary: classes.username
                    }}
                    primary={
                      <>
                        {user?.user?.name}
                        {user?.user?.protected && (
                          <LockIcon style={{ fontSize: 16 }} />
                        )}
                      </>
                    }
                    secondary={`@${user?.user?.screen_name}`}
                    secondaryTypographyProps={{ color: "primary" }}
                  />
                </ListItem>
              ))
            : [...Array(5)].map((cur, index) => (
                <ListItem divider key={index}>
                  <ListItemAvatar>
                    <Skeleton variant="circle" height={40} width={40} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Skeleton width={120} />}
                    secondary={<Skeleton width={100} />}
                  />
                </ListItem>
              ))}
        </List>
        {/* <DragHandle/> */}
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

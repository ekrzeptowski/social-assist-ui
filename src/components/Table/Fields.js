import { Avatar as MUIAvatar, Grid, Link, Typography } from "@material-ui/core";
import React from "react";
import LockIcon from "@material-ui/icons/Lock";

export function Avatar({ user }) {
  return <MUIAvatar alt={user?.name} src={user?.avatar} />;
}

export function Name({ user }) {
  return (
    <Grid item>
      <Typography>
        <Link href={`https://twitter.com/${user?.screen_name}`} color="inherit">
          {user?.name}
          {user?.protected && <LockIcon style={{ fontSize: 16 }} />}
        </Link>
      </Typography>
      <Typography variant="caption">
        <Link href={`https://twitter.com/${user?.screen_name}`}>
          @{user?.screen_name}
        </Link>
      </Typography>
    </Grid>
  );
}

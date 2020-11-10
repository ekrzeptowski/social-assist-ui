import { AppBar, Link, Toolbar } from "@material-ui/core";
import React from "react";
import { Link as RouterLink } from "gatsby";

export default function Footer() {
  return (
    <AppBar position="relative">
      <Toolbar>
        {/* Terms of Service |  */}
        <Link color="inherit" component={RouterLink} to="/privacy-policy">
          Privacy policy
        </Link>
      </Toolbar>
    </AppBar>
  );
}

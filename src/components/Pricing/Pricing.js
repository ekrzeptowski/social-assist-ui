import React, { Fragment } from "react";
import {
  Paper,
  Box,
  makeStyles,
  colors,
  Typography,
  Divider,
} from "@material-ui/core";

export const usePricingStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
  },
  item: { width: 280, overflow: "hidden" },
  header: {
    background: (props) =>
      props.current ? colors.blue[500] : colors.grey[500],
    color: "white",
    height: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    textAlign: "center",
  },
  price: {
    margin: "15px 0",
  },
  feature: {
    margin: "10px 0",
  },
});

const Pricing = ({ tier, currentTier }) => {
  const classes = usePricingStyles({ current: currentTier });
  return (
    <Paper className={classes.item} elevation={currentTier ? 9 : 2}>
      <Box className={classes.header}>
        <Typography variant="h4">{tier.name}</Typography>
      </Box>
      <Box className={classes.contentContainer}>
        <Typography className={classes.price} variant="h5">
          {typeof tier.price === "number"
            ? tier.price === 0
              ? "Free"
              : `$${tier.price} / month`
            : tier.price}
        </Typography>
        <Box paddingBottom="1px">
          {tier.features.map((feature, i) => (
            <Fragment key={i}>
              <Typography variant="subtitle1" className={classes.feature}>
                {feature}
              </Typography>
              {i !== tier.features.length - 1 && <Divider />}
            </Fragment>
          ))}
        </Box>
        {/* <Box padding="10px">
          <Button variant="contained">Upgrade</Button>
        </Box> */}
      </Box>
    </Paper>
  );
};

export default Pricing;

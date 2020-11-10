import {
  Typography,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Box,
  Grid,
  Slider,
  makeStyles,
  useTheme,
  useMediaQuery,
  Select,
  MenuItem,
  Link,
} from "@material-ui/core";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { connect } from "react-redux";
import { compose } from "redux";
import { editUser } from "../../../store/actions/userActions";
import Pricing, { usePricingStyles } from "../../Pricing/Pricing";
import { tiers } from "../../../tiers";
import { Link as RouterLink } from "gatsby";
import SEO from "../../Seo";

const chartScale = [
  { value: 0, label: "Infinite" },
  { value: 7, label: "7 days" },
  { value: 14, label: "2 weeks" },
  { value: 30, label: "1 month" },
  { value: 60, label: "2 months" },
];

const useStyles = makeStyles((theme) => ({
  slider: {
    maxWidth: 400,
  },
  hidden: {
    display: "none",
  },
}));

const Settings = ({ auth, editUser }) => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      debug: auth.me.settings?.debug,
    },
  });

  const pricingClasses = usePricingStyles();
  const classes = useStyles();
  const theme = useTheme();

  const mobile = useMediaQuery(theme.breakpoints.down("xs"));

  const onSubmit = (data) => editUser(auth.me.id, { settings: data });

  return (
    <>
      <SEO title="Settings" />
      <Typography variant="h5">Settings</Typography>
      {auth.me && (
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Controller
                name="debug"
                control={control}
                render={(props) => (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={props.value}
                        onChange={(e) => props.onChange(e.target.checked)}
                      />
                    }
                    label="Debug"
                  />
                )}
              />
              <TextField
                inputRef={register}
                defaultValue={auth.me.settings?.debugId}
                name="debugId"
              />
            </Box>
            <Typography display={mobile ? "inline" : "block"} gutterBottom>
              Followers history:{" "}
            </Typography>
            {mobile ? (
              <Controller
                name="chartDays"
                control={control}
                as={
                  <Select>
                    {chartScale.map((cur) => (
                      <MenuItem key={cur.value} value={cur.value}>
                        {cur.label}
                      </MenuItem>
                    ))}
                  </Select>
                }
              />
            ) : (
              <Controller
                name="chartDays"
                defaultValue={auth.me.settings?.chartDays}
                control={control}
                render={(props) => (
                  <Slider
                    {...props}
                    className={classes.slider}
                    classes={{ markLabel: mobile && classes.hidden }}
                    // name="chartDays"
                    valueLabelDisplay={mobile ? "on" : "off"}
                    onChange={(_, value) => props.onChange(value)}
                    step={null}
                    max={60}
                    marks={chartScale}
                  />
                )}
              />
            )}
            <Box marginBottom={2}>
              <Button type="submit" variant="contained">
                Save
              </Button>
            </Box>
          </form>
          <Typography variant="subtitle1" gutterBottom>
            Account type:
          </Typography>
          <Grid container spacing={2} className={pricingClasses.container}>
            {tiers.map((tier) => (
              <Grid item key={tier.name}>
                <Pricing
                  tier={tier}
                  currentTier={auth.me.tier.name === tier.name ? true : false}
                />
              </Grid>
            ))}
          </Grid>
          <Box my={3}>
            <Link component={RouterLink} to="/privacy-policy">
              Privacy policy
            </Link>
          </Box>
        </Box>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(connect(mapStateToProps, { editUser }))(Settings);

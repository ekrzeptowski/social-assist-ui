import {
  Typography,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Box,
  Grid,
  makeStyles,
  useTheme,
  useMediaQuery,
  Container,
} from "@material-ui/core";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { connect } from "react-redux";
import { compose } from "redux";
import { editUser } from "../../store/actions/userActions";
import Pricing, { usePricingStyles } from "../../components/Pricing/Pricing";
import { tiers } from "../../tiers";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: "flex",
    flexWrap: "wrap",
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
      <Typography variant="h5">Settings</Typography>
      {auth.me && (
        <Box>
          <form
            className={classes.formContainer}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Container>
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
            </Container>
            <Container>
              <Button type="submit" variant="contained">
                Save
              </Button>
            </Container>
          </form>
          <Typography variant="subtitle1">Account type:</Typography>
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
        </Box>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(connect(mapStateToProps, { editUser }))(Settings);

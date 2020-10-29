import {
  Typography,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Box,
  Grid,
} from "@material-ui/core";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { connect } from "react-redux";
import { compose } from "redux";
import { editUser } from "../../store/actions/userActions";

const Settings = ({ auth, editUser }) => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      debug: auth.me.settings?.debug,
    },
  });

  const onSubmit = (data) => editUser(auth.me.id, { settings: data });

  return (
    <>
      <Typography variant="h5">Settings</Typography>
      {auth.me && (
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
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
            <Button type="submit" variant="contained">
              Save
            </Button>
          </form>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(connect(mapStateToProps, { editUser }))(Settings);

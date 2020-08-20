import {
  Typography,
  Switch,
  FormControlLabel,
  TextField,
  Button,
} from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { compose } from "redux";
import { editUser } from "../../store/actions/userActions";

const Settings = ({ auth, editUser }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => editUser(auth.me.id, { settings: data });

  return (
    <>
      <Typography variant="h5">Settings</Typography>
      {auth.me && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControlLabel
            control={
              <Switch
                inputRef={register}
                // checked={auth.me.settings?.debug}
                name="debug"
              />
            }
            label="Debug"
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

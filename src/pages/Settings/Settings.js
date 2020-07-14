import {
  Typography,
  Input,
  Switch,
  FormControlLabel,
  TextField,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { connect } from "react-redux";
import { compose } from "redux";
import Layout from "../../layout/Layout";
import { editUser } from "../../store/actions/userActions";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
});

const Settings = ({ auth, editUser }) => {
  const classes = useStyles();
  const { register, handleSubmit, setValue } = useForm();

  // const onSubmit = (data) => console.log(data);
  const onSubmit = (data) => editUser(auth.me.id, { settings: data });

  return (
    <Layout>
      {/* <h1>Home page</h1> */}
      {/* <> */}
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
      {/* </> */}
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(connect(mapStateToProps, { editUser }))(Settings);

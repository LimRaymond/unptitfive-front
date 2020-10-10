import React from "react";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import withStyles from "@material-ui/core/styles/withStyles";
import { Paper, Typography, Button, Grid, TextField } from "@material-ui/core";

const styles = () => ({
  root: {
    backgroundColor: "black",
    height: "100vh",
  },
  background: {
    backgroundColor: "white",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "url(/images/picture-background.jpg)",
    backgroundSize: "cover",
    opacity: 0.8,
    overflowX: "hidden",
    overflowY: "hidden",
  },
  paperLogin: {
    textAlign: "center",
    backgroundColor: "#342C3C",
    flexBasis: "500px",
  },
  titleLogin: {
    color: "white",
    fontWeight: "bold",
    paddingBottom: "3vh",
    paddingTop: "3vh",
    fontSize: "30px",
  },
  textFieldLogin: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#908F91",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#908F91",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "white",
    },
    paddingBottom: "20px",
    width: "400px",
  },
  titleTextFieldLogin: {
    paddingRight: "300px",
    color: "white",
    fontSize: "13px",
    fontWeight: "bold",
  },
});

const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(4, "Votre mot de passe doit contenir au moins 4 caractères")
    .required("Ce champ est obligatoire"),
});

function Login(props) {
  const { classes } = props;
  const history = useHistory();

  const login = () => history.push("/login");
  const register = () => history.push("/register");

  return (
    <div className={classes.root}>
      <div className={classes.background}>
        <Paper className={classes.paperLogin}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <Typography className={classes.titleLogin}>
                Connectez-vous !
              </Typography>
            </Grid>
            <Grid item>
              <form noValidate autoComplete="off">
                <Typography className={classes.titleTextFieldLogin}>
                  Nom de compte
                </Typography>
                <TextField
                  variant="outlined"
                  className={classes.textFieldLogin}
                />
                <Typography className={classes.titleTextFieldLogin}>
                  Mot de passe
                </Typography>
                <TextField
                  variant="outlined"
                  className={classes.textFieldLogin}
                />
              </form>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </div>
  );
}

export default withStyles(styles)(Login);

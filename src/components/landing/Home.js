import React from "react";
import { useHistory } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import { Paper, Typography, Button } from "@material-ui/core";

const styles = () => ({
  root: {
    backgroundColor: "black",
    height: "100vh",
  },
  background: {
    backgroundColor: "white",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "url(/images/picture-background.jpg)",
    backgroundSize: "cover",
    opacity: 0.8,
    overflowX: "hidden",
    overflowY: "hidden",
  },
  titleInnerBackground: {
    textAlign: "center",
    flexBasis: "100px",
    fontSize: "30px",
    color: "white",
  },
  buttonInnerBackground: {
    textAlign: "center",
  },
});

function Home(props) {
  const { classes } = props;
  const history = useHistory();

  const login = () => history.push("/login");
  return (
    <div className={classes.root}>
      <div className={classes.background}>
        <Typography className={classes.titleInnerBackground}>
          Bienvenue sur Un ptit five !
        </Typography>
        <Button
          className={classes.buttonInnerBackground}
          variant="contained"
          onClick={login}
        >
          Se connecter
        </Button>
      </div>
    </div>
  );
}

export default withStyles(styles)(Home);

import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
  app: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
  },
  signInContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "auto",
    marginBottom: "auto",
  },
  imageIcon: {
    [theme.breakpoints.down("xs")]: {
      height: "120px",
    },
    height: "180px",
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(5),
  },
  tagLine: {
    marginBottom: theme.spacing(3),
    fontWeight: "bold",
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.2rem",
    },
  },
  copyright: {
    marginTop: "auto",
    paddingTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

export default styles;

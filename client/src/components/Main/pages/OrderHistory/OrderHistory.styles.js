import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  historyContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  header: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.2rem",
    },
  },
  table: {
    minWidth: 500,
  },
  placeHolder: {
    maxWidth: 500,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center"
  },
  skeleton: {
    minHeight: 300,
    width: "100%",
  },
  icon: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    alignSelf: "center",
    fontSize: "5rem"
  },
  refreshButton: {
    marginTop: theme.spacing(2)
  },
}));

export default styles;
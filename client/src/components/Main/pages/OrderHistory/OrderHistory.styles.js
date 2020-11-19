import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
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
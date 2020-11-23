import { makeStyles } from "@material-ui/core/styles";
import { red } from '@material-ui/core/colors';

const styles = makeStyles((theme) => ({
  todayContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: theme.spacing(3)
  },
  skeleton: {
    minHeight: 322,
    width: "100%"
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  inputSpacing: {
    marginTop: theme.spacing(2)
  },
  editBtn: {
    marginLeft: "auto",
    marginTop: theme.spacing(2),
  },
  saved: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    color: theme.palette.success.main,
    fontWeight: "bold",
  },
  unsaved: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    color: theme.palette.error.main,
    fontWeight: "bold"
  },
  spaceRight: {
    marginRight: theme.spacing(0.5)
  },
  delete: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: theme.spacing(1),
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
    alignSelf: "center"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  header: {
    fontWeight: "bold",
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.2rem",
    },
  },
  subHeader: {
    fontWeight: "bold",
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.9rem",
    },
  },
  alignLeft: {
    textAlign: "left",
  },
  orderList: {
    display: "flex",
    flexDirection: "column"
  },
  bottomBtn: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: theme.spacing(2)
  }
}));

export default styles;

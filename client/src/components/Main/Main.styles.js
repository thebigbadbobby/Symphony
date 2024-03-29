import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;
export const styles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appTitle: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.9rem"
    },
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  hide: {
    display: 'none',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  signOutButton: {
      //   root: {
  //       background: 'inherit',
  //     "&.Mui-selected": {
  //       backgroundColor: "red"
  //     }
  //   },
    fill: "#A958F4",
    marginLeft: "auto",
    marginRight: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    [theme.breakpoints.down("xs")]: {
      visibility: 'hidden',
      fontSize: ".25rem"
    },
  },
  mainContainer: {
    display: "flex",
    flexDirection: "column"
  }
}));

export default styles
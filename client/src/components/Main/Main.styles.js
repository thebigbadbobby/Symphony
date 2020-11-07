import { makeStyles } from '@material-ui/core/styles';

// export const styles = makeStyles((theme) => ({
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//     [theme.breakpoints.down("xs")]: {
//       visibility: 'hidden',
//       fontSize: ".25rem"
//     },
//   },
//   signOutButton: {
//     marginLeft: "auto",
//     marginRight: theme.spacing(2),
//     [theme.breakpoints.down("xs")]: {
//       flexGrow: 2,
//     },
//   }
// }));
const drawerWidth = 240;
export const styles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  // appBarShift: {
  //   width: `calc(100% - ${drawerWidth}px)`,
  //   marginLeft: drawerWidth,
  //   transition: theme.transitions.create(['margin', 'width'], {
  //     easing: theme.transitions.easing.easeOut,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  // },
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
    marginLeft: "auto",
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      flexGrow: 2,
    },
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
}));

export default styles
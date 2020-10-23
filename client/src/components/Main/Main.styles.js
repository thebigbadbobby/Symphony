import { makeStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme) => ({
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
  signOutButton: {
    marginLeft: "auto",
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      flexGrow: 2,
    },
  }
}));

export default styles;
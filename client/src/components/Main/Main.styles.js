import { makeStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  signOutButton: {
    marginLeft: "auto",
    marginRight: theme.spacing(2)
  }
}));

export default styles;
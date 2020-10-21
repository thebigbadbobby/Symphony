import { makeStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme) => ({
  signInContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(2)
  },
  login: {
    marginTop: theme.spacing(2)
  }
}));

export default styles;
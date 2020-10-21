import { makeStyles } from '@material-ui/core/styles';


const styles = makeStyles((theme) => ({
  app: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logIn: {
    //margin: theme.spacing(1),
    //backgroundColor: theme.palette.secondary.main,
  },
  mainContent: {
   // width: '100%', // Fix IE 11 issue.
    //marginTop: theme.spacing(1),
  },
}));

export default styles;
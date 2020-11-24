import { makeStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme) => ({
  pageTitle: {
    position: 'relative',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: theme.spacing(3)
  },
  storeName: {
    position: 'relative',
    fontWeight: 'bold',
    top: '35px',
    textAlign: 'center',
    fontSize: '20px',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    top: '60px',
    width: '500px',
    alignSelf: 'center',
    [theme.breakpoints.down("xs")]: {
      width: '90%',
    },
    textAlign: 'center',
  },
  saveButton: {
    borderRadius: '22px/20px', // round sides!!!
    fontWeight: 'bold',
    borderStyle: 'solid',
    backgroundColor: '#28B67E', // give button green color
    borderColor: '#28B67E',
    height: '45px', // sizing
    width: '120px',
    color: 'white', // give text white color
    display: 'flex',
    margin: 'auto', // center button
    top: '45px',
  }
}));

export default styles;
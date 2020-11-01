import { makeStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',

  },
  storeName: {
    fontWeight: 'bold',
    top: '100px'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    
  },
  firstButton: {
    borderWidth: '5px',
    borderStyle: 'solid',
    fontWeight: 'bold',
    width: '400px',
    top: '20px',
    display: 'block',
    textAlign: 'left',
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
    top: '35px',
  }
}));

export default styles;
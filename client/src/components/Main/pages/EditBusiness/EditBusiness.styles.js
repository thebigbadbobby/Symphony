import { makeStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    top: '35px',
  },
  storeName: {
    fontWeight: 'bold',
    top: '100px'
  },
  // fillinContainer: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   position: 'relative',
  //   top: '20px',
  // },
  // entryFields: {
  //   fontWeight: 'bold',
  //   width: '400px',
  //   display: 'block',
  //   textAlign: 'left',
  //   borderColor: 'black',
  // },
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
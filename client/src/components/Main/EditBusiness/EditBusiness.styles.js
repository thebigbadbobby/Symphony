import { makeStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',

  },
  storeName: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    // not border-width
    display: 'flex',
    flexDirection: 'column',
  },
  firstButton: {
    color: 'blue',
    borderWidth: '5px',
    borderStyle: 'solid',
    borderColor: 'blue',
  }
}));

export default styles;
import { makeStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme) => ({
  pageTitle: {
    color: 'blue',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: theme.spacing(3)
  },
  rectangle9: {
    
position: "auto",
flexDirection: "row",
width: "360px",
height: "372px",


border: "1px solid #000000",
boxSizing: "border-box",
boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)",
borderRadius: "20px",
  }
}
));
  

export default styles;
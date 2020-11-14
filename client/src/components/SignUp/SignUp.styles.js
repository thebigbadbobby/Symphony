import { makeStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme) => ({
signUpContainer: {
  display: "flex",
  flexDirection: "column",
  marginTop: theme.spacing(5)
},
explanation: {
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(5),
  textAlign: "left"
},
form: {
  display: "flex",
  flexDirection: "column",
  alignItems: "left"
},
field: {
  marginBottom: theme.spacing(2)
}
}));

export default styles;
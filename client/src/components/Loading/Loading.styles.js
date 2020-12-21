import { makeStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme) => ({
  loadingContainer: {
    marginTop: "auto",
    marginBottom: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: "20%",
  },
  loadingIcon: {
    width: "60%",
    padding: "10%",
    position: "absolute"
  },
}));

export default styles;
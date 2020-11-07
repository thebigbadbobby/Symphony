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
  loading: {
    position: "absolute"
  },
  loadingIcon: {
    width: "60%",
    marginTop: "12%",
    padding: "10%"
  },
}));

export default styles;
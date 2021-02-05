
import { makeStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme) => ({
  pageTitle: {
    color: 'blue',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: theme.spacing(3)
  },
  rectangle9: { // need to fix the retangle box position, https://www.w3schools.com/css/css_positioning.asp
    position: "relative",
    flexDirection: "row",
    width: "360px",
    height: "372px",
    left: "5px",
    top: "40px",
    display: "inline-block",
    
    border: "1px solid #000000",
    boxSizing: "border-box",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "20px",
  },
  image: {
    position: "relative",
    left: "0%",
    right: "0%",
    top: "0%",
    bottom: "40.05%",
    // background: url(sample.jpg),
    borderRadius: "20px 20px 0px 0px",
  },
  itemName: {  // Name issue
    position: "relative",
    left: "6.67%",
    right: "54.17%",
    top: "72.37%",
    bottom: "26.61%",

    fontFamily: "Romanesco",
    fontStyle: "normal",
    fontWeight: "normal",
    fontsize: "36px",
    lineheight: "41px",

    color: "black",
  },
  rate: {
    position: "relative",
    // left: "74.72%",
    // right: "7.78%",
    // top: "60.17%",
    // bottom: "27.96%",
    margin: "auto",          /* make text in center*/
    display: "flex", 
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    
    fontFamily: "Palanquin Dark",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "18px",
    lineHeight: "40px",
    /* identical to box height */
    // display: "flex",
    // alignitems: "flex-end",
    textTransform: "capitalize",
    color: "rgba(183, 43, 43, 0.93)",

    /* Orange */
    textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
  ellipse: {
    position: "relative",
    left: "82.78%",
    right: "6.11%",
    top: "62.63%",
    bottom: "26.61%",
    height: "40px",
    width: "40px",
    backgroundColor: "rgba(246, 216, 216, 1)",
    borderRadius: "50%",
    display: "inline-block",
  },
  deliveryInfo: {
    position: "relative",
    left: "6.67%",
    right: "33.06%",
    top: "71.18%",
    bottom: "14.52%",

    fontfamily: "Roboto",
    fontstyle: "normal",
    fontweight: "normal",
    fontsize: "14px",
    lineheight: "16px",

    color: "black",
  }
}));

export default styles;
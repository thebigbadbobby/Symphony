import React, {useEffect, useState} from "react";
import styles from "./purchaseHistory.styles";
import {withStyles, makeStyles} from '@material-ui/core/styles';
import { axiosWrap } from '../../../../axios-wrapper';
import logo from "../../../../assets/mint-stacked.svg";
import {
  Container,
  Typography,
  Input,
  FormHelperText,
  Select,
  MenuItem,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.info.light,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

// Beginning of main function
export const PurchaseHistory = (props) => {
  const style = styles();
  const classes = useStyles();
  const todayDate = new Date();
  const [requests, setProducts] = useState(undefined);

  // http route to get all requests from MongoDB
  useEffect( () => {
    const requests= axiosWrap
  .get("/request/all-requests", {
  }).then((result) => {console.log(result)
  setProducts(result.data)})
  },[])

  return(
    //-- initial return to create the top row of the grid
    <React.Fragment>
      <div className={style.pageTitle}>Purchase History</div>
    {requests ?
   <TableContainer component={Paper}>
   <Table className={classes.table} aria-label="customized table">
     <TableHead>
       <TableRow>
         <StyledTableCell>Product</StyledTableCell>
         <StyledTableCell align="right">Price</StyledTableCell>
         <StyledTableCell align="right">Date Requested</StyledTableCell>
         <StyledTableCell align="right">Date Purchased</StyledTableCell>
         <StyledTableCell align="right">Delivery Info</StyledTableCell>
       </TableRow>
     </TableHead>
     <TableBody>
       {/* request content mapping to grid */}
       {requests.map((request) => {
         // checks if today's date is later than last return day, and checks if the request has the correct customerID
         if ( (Date.parse(todayDate) > Date.parse(request.returnOpt[1])) && (request.customerID == props.customer) )
         return (
         <StyledTableRow key={request.name}>
           <StyledTableCell component="th" scope="row">
           {request.itemName}<br></br>
           <img className={style.image} src={logo} alt="kahzum-logo">
             </img>

           </StyledTableCell>
           <StyledTableCell align="right">{request.price}</StyledTableCell>
           <StyledTableCell align="right">{request.date}</StyledTableCell>
           {/* display the trial end date but only the date and not the time */}
           <StyledTableCell align="right">{request.returnOpt[1].substring(0, request.returnOpt[1].indexOf("T"))
           }</StyledTableCell>
           <StyledTableCell align="right">{request.deliveryInfo}</StyledTableCell>
         </StyledTableRow>
       ) ;
          })}
     </TableBody>
   </Table>
 </TableContainer>
            : ""}
    </React.Fragment>
  );
};
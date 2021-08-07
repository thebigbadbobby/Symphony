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
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#A958F4",
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
  .get("/customer/" + props.customer, {
  }).then((result) => {console.log(result)
  setProducts(result.data.invoices)})
  },[])

  return(
    //-- initial return to create the top row of the grid
<React.Fragment>
      <div className={style.pageTitle}>Paid</div>
    {requests ?
   <TableContainer component={Paper}>
   <Table className={classes.table} aria-label="customized table">
     <TableHead>
       <TableRow>
         <StyledTableCell>Invoice Link</StyledTableCell>
         <StyledTableCell align="right">Price</StyledTableCell>
         <StyledTableCell align="right">Email</StyledTableCell>
         <StyledTableCell align="right">Address</StyledTableCell>
         <StyledTableCell align="right">Date Paid</StyledTableCell>
       </TableRow>
     </TableHead>
     <TableBody>
       {/* request content mapping to grid */}
       {requests.map((request) => {
         // checks if today's date is later than last return day, and checks if the request has the correct customerID
         if ( (Date.parse(todayDate) > Date.parse(request.createdAt)))
         return (
         <StyledTableRow key={request._id}>
           <StyledTableCell component="th" scope="row">
           <Router  ><Link to={"/".concat(request._id)} onClick={() => {props.deepChangePage("2", request._id)}}>{request._id}</Link></Router><br></br>
           {/* <img className={style.image} src={logo} alt="kahzum-logo">
             </img> */}

           </StyledTableCell>
           <StyledTableCell align="right">{request.total}</StyledTableCell>
           <StyledTableCell align="right">{request.email}</StyledTableCell>
           {/* display the trial end date but only the date and not the time */}
           <StyledTableCell align="right">{request.address
           }</StyledTableCell>
           <StyledTableCell align="right">{request.updatedAt}</StyledTableCell>
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
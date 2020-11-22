import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import RefreshIcon from '@material-ui/icons/Refresh';
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import { axiosWrap } from "../../../../axios-wrapper";
import { Loading } from "../../../Loading/Loading";
import styles from "./OrderHistory.styles";

// eslint-disable-next-line require-jsdoc
const TablePaginationActions = (props) => {
  const style = styles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={style.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {/* eslint-disable-next-line max-len */}
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

// eslint-disable-next-line require-jsdoc
export const OrderHistory = (props) => {
  // eslint-disable-next-line react/prop-types
  let { business } = props;
  const style = styles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState(undefined);
  const [emptyRows, setEmptyRows] = useState(undefined);
  const [emptyTable, setEmptyTable] = useState(true);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = () => {
    axiosWrap
    .get("/business/completed-orders", { params: { business, N: 10 } })
    .then(function (response) {
      // const rows = orders.sort((a, b) => {
      //   return new Date(b.createdAt) - new Date(a.createdAt);
      // });
      setRows(response.data);
      setEmptyRows(
        rowsPerPage -
          Math.min(rowsPerPage, response.data.length - page * rowsPerPage)
      );
      if (response.data.length !== 0) {
        setEmptyTable(false);
      }
      setLoading(false);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const militaryToStandard = (standard) => {
    if (standard.split(":")[1].length === 1) {
      standard = `${standard.split(":")[0]}:${standard.split(":")[1]}0`;
    }
    if (
      parseInt(standard.split(":")[0], 10) >= 12 &&
      parseInt(standard.split(":")[0], 10) !== 24
    ) {
      if (standard.split(":")[0] !== 12) {
        return `${parseInt(standard.split(":")[0], 10) - 12}:${
          standard.split(":")[1]
        } PM`;
      } else {
        return `12:${standard.split(":")[1]} PM`;
      }
    } else {
      if (
        parseInt(standard.split(":")[0], 10) === 24 ||
        parseInt(standard.split(":")[0], 10) === 0
      ) {
        return `12:${standard.split(":")[1]} AM`;
      } else {
        return `${standard} AM`;
      }
    }
  };
  const makeDateNice = (dateString) => {
    const date = new Date(dateString);
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const dates = {
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      time: `${date.getHours()}:${date.getMinutes()}`,
    };
    return `${monthNames[dates.month - 1]} ${dates.day}, 
    ${dates.year} @ ${militaryToStandard(dates.time)}`;
  };

  return (
    <React.Fragment>
      {loading ? (
        <Loading />
      ) : emptyTable ? (
          <Card>
            <CardContent className={style.placeHolder}>
            <LocalShippingIcon className={style.icon}/>
              <Typography
                variant="h5"
              >
                You haven't completed any orders yet. 
              </Typography>
              <Typography
              >
                Enter an order on the Today's Orders page to schedule your first delivery!
              </Typography>
              <Button variant="contained" color="primary" startIcon={<RefreshIcon />} className={style.refreshButton} onClick={getOrders}>Refresh</Button>
            </CardContent>
          </Card>
          
      ) : (
        <TableContainer component={Paper}>
          <Table className={style.table} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell>Customer Name</TableCell>
                <TableCell align="right">Address</TableCell>
                <TableCell align="right">Phone</TableCell>
                <TableCell align="right">Driver's Name</TableCell>
                <TableCell align="right">Drop Off Image</TableCell>
                <TableCell align="right">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? // eslint-disable-next-line max-len
                  rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((order) => (
                <TableRow
                  hover
                  onClick={() => {
                    // setOrder(order);
                  }}
                  key={order._id}
                >
                  <TableCell style={{ width: 160 }} align="right">
                    {order.customer_name}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {order.address}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {order.customer_phone}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {order.driver.fullName}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    <a href={order.imageUrl} target="_blank">
                      Image url
                    </a>
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {makeDateNice(order.createdAt)}
                  </TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { "aria-label": "rows per page" },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}
    </React.Fragment>
  );
};

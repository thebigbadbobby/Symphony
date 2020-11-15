import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

import {axiosWrap} from '../../../../axios-wrapper';
import {Loading} from '../../../Loading/Loading';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

// eslint-disable-next-line require-jsdoc
function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const {count, page, rowsPerPage, onChangePage} = props;

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
      <div className={classes.root}>
        <IconButton
            onClick={handleFirstPageButtonClick}
            disabled={page === 0}
            aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton onClick={handleBackButtonClick}
                    disabled={page === 0} aria-label="previous page">
          {theme.direction === 'rtl' ?
              <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
            onClick={handleNextButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="next page"
        >
          {/* eslint-disable-next-line max-len */}
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
            onClick={handleLastPageButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
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

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

// eslint-disable-next-line require-jsdoc
export const OrdersTable = (props) => {
  // eslint-disable-next-line react/prop-types
  let {business}= props;
  console.log(business)
    business = "5fa4a33634b8df278531dfd5"
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [loading, setLoading] = useState(true);
  let rows;
  let emptyRows;

  useEffect(() => {
    axiosWrap.get('/business/completed-orders',
        {params: {business, N: 10}},
    )
        .then(function(response) {
          // const rows = orders.sort((a, b) => {
          //   return new Date(b.createdAt) - new Date(a.createdAt);
          // });
          rows = response.data;
          emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
          console.log(response)
          setLoading(false)
        })
        .catch(function(error) {
          console.log(error);
        });
  }, []);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const makeDateNice = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];
    const todays = {day: today.getDate(), month: today.getMonth() + 1,
      year: today.getFullYear()};
    const dates = {day: date.getDate(), month: date.getMonth() + 1,
      year: date.getFullYear(),
      time: `${date.getHours()}:${date.getMinutes()}`};
    if (todays.day === dates.day && todays.month === dates.month &&
        todays.year === dates.year) {
      return `${dates.time}`;
    }
    if (todays.year === dates.year) {
      return `${monthNames[dates.month - 1]} ${dates.day}`;
    }
    return `${dates.year}`;
  };

  return (
      <React.Fragment>
        {loading ? (
            <Loading />
        ) : (
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="custom pagination table">
                <TableBody>
                  {(rowsPerPage > 0 ?
                          // eslint-disable-next-line max-len
                          rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) :
                          rows
                  ).map((order) => (
                      <TableRow hover onClick={() => {
                        // setOrder(order);
                      }} key={order._id}>
                        <TableCell style={{width: 160}} align="right">
                          {order.customer_name}</TableCell>
                        <TableCell style={{width: 160}} align="right">
                          {order.address}</TableCell>
                        <TableCell style={{width: 160}} align="right">
                          {makeDateNice(order.createdAt)}
                        </TableCell>
                      </TableRow>
                  ))}

                  {emptyRows > 0 && (
                      <TableRow style={{height: 53 * emptyRows}}>
                        <TableCell colSpan={6} />
                      </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                        colSpan={3}
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                          inputProps: {'aria-label': 'rows per page'},
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
}

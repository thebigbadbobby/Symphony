import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Input, FormHelperText, Snackbar } from "@material-ui/core";
import { Skeleton, Alert } from '@material-ui/lab';
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import styles from "./TodaysOrders.styles";
import { axiosWrap } from "../../../../axios-wrapper";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import { PhoneNumberMask } from "../../../Shared/PhoneNumberMask"

export const TodaysOrders = (props) => {
  const style = styles();
  // Represents the highest key so far (so we can handle deletes)
  let [highestKey, setHighestKey] = useState(1);
  // Represents the orders
  let [orders, setOrders] = useState([
    {
      key: 0,
      id: null,
      orderSaved: false,
      customer_name: "",
      address: "",
      customer_phone: "",
    },
  ]);
  // we have the business if we need it, just add the variable back here
  let [, setBusinessInfo] = useState(undefined)
  let [pickupInfo, setPickupInfo] = useState(undefined)

  // Error/success states
  let [showSkeleton, setSkeleton] = useState(true);
  let [snackbarError, setSnackbarError] = useState({error: false, message: ""})
  let [snackbarSuccess, setSnackbarSuccess] = useState({success: false, message: ""})

  // What should happen when the snackbar autocloses
  const handleSnackbarClose = () => {
    setSnackbarError({error: false, message: ""})
    setSnackbarSuccess({success: false, message: ""})
  }

  /** Increments the key */
  const incrKey = () => {
    setHighestKey(highestKey + 1);
  };

  /** Adds an order to the list. (this is mostly just a setter function) */
  const addBlankOrder = () => {
    const orderTemp = [...orders];
    orderTemp.push({
      key: highestKey,
      id: null,
      orderSaved: false,
      customer_name: "",
      address: "",
      customer_phone: "",
    });
    // Need to make sure to increment the key!
    incrKey();
    setOrders(orderTemp);
  };

  /** Resets orders to the initial state (1 empty order) */
  const resetOrders = () => {
    setOrders([{
      key: 0,
      id: null,
      customer_name: "",
      orderSaved: false,
      address: "",
      customer_phone: "",
    }])
    setHighestKey(1)
    setSkeleton(false)
  }

  /** Simply checks if any of the fields are empty (takes in an order) */
  const checkEmpty = (val) => val.address === "" || val.customer_name === "" || val.customer_phone === "";


  /** Sets the orders to the incoming variable in the format that matches. */
  const setOrdersTo = (dbOrderInfo) => {
    const orderTemp = orders;
    const changedIndices = [];
    let key = highestKey;
    dbOrderInfo.forEach(orderFromDb => {
      const matchingOrder = orderTemp.find(val => val.id === orderFromDb._id);
      // try to just update the values in an existing order
      if (matchingOrder) {
        const matchingOrderIdx = orderTemp.findIndex(val => val.id === orderFromDb._id);
        
        matchingOrder.customer_name = orderFromDb.customer_name
        matchingOrder.customer_phone = orderFromDb.customer_phone
        matchingOrder.address = orderFromDb.address
        matchingOrder.orderSaved = true;
        orderTemp[matchingOrderIdx] = matchingOrder;
        changedIndices.push(matchingOrderIdx)
        
      } else {
        const emptyOrder = orderTemp.find(checkEmpty);

        // Try to fill up an empty order
        if (emptyOrder) {
          const emptyOrderIdx = orderTemp.findIndex(checkEmpty);
          emptyOrder.customer_name = orderFromDb.customer_name
          emptyOrder.customer_phone = orderFromDb.customer_phone
          emptyOrder.address = orderFromDb.address
          emptyOrder.id = orderFromDb._id
          emptyOrder.orderSaved = true
          orderTemp[emptyOrderIdx] = emptyOrder
          changedIndices.push(emptyOrderIdx);

          // Just push a new order onto the end
        } else {
          orderTemp.push({
            key: key,
            customer_name: orderFromDb.customer_name,
            address: orderFromDb.address,
            customer_phone: orderFromDb.customer_phone,
            id: orderFromDb._id,
            orderSaved: true
          })
          changedIndices.push(orderTemp.length - 1)
          key += 1;
        }
      }
    })

    // we only want the changed orders (the old ones can go away)
    const onlyChanged = orderTemp.filter((_, index) => {
      return changedIndices.includes(index)
    })
    setOrders(onlyChanged)
    setHighestKey(key)
    setSkeleton(false)
  }

  /** takes in an array with 2 numbers (representing military hours) and converts it to a readable time. */
  const getTimesFrom24hrTimes = (arrayMilitaryTime) => {
    const getPostfix = (time) => {
      if (time >= 24) {
        return (time % 24) / 12 >= 1 ? 'pm' : 'am'
      } else if (time < 0) {
        return 
      } else if (time === 0) {
        return 'pm'
      } else {
        return (time / 12) >= 1 ? 'pm' : 'am';
      }
    }

    const convertTime = (timeMilitary) => {
      if (timeMilitary === 12) {
        return 12;
      }
      return timeMilitary % 12;
    }

    const timeRange = arrayMilitaryTime.map(time => {
      const normalizedHour = convertTime(time)
      const postfix = getPostfix(time);
      return {
        hour: normalizedHour,
        postfix,
        miliaryTime: time
      }
    });

    const enterDeadline = {
      hour: convertTime(timeRange[0].miliaryTime - 1) + timeRange[0].postfix,
    }

    const dropoffTime = {
      start: convertTime(timeRange[0].miliaryTime + 2) + timeRange[0].postfix,
      end: convertTime(timeRange[1].miliaryTime + 2) + timeRange[1].postfix,
    }
    const result = {
      pickupTime: timeRange,
      enterDeadline,
      dropoffTime,
    }
    return result;
  }

  /** Deletes an order from the list (and should also from the DB, if it isn't there, it just deletes locally) */
  const deleteOrder = (id, key) => {
    const thisOrder = orders.find(order=> order.id===id);
    if(thisOrder.customer_name && thisOrder.address && thisOrder.customer_phone){
      axiosWrap
        .delete('/order/delete-order', { data: { orderId: id } })
        .then(() => {
          // if this is the only order, we want to wipe it once it is deleted
          if (orders.length === 1) {
            resetOrders();
          } else {
            // fetch the orders again since now there is one less
            fetchOrders()
          }
          setSnackbarSuccess({success: true, message: "Your order has been deleted."})
        })
        .catch(err => {
          // if it isn't in the database, then delete it locally
          const ordersTemp = [...orders]
          const deleteIndex = ordersTemp.findIndex(val => val.id === id);
          ordersTemp.splice(deleteIndex, 1);
          setOrders(ordersTemp)
        })
    }  
    else{
      // if it isn't in the database, then delete it locally
      const ordersTemp = [...orders]
      const deleteIndex = ordersTemp.findIndex(val => val.id === id);
      ordersTemp.splice(deleteIndex, 1);
      setOrders(ordersTemp)
    }
  };

  /** Runs every time the input changes and updates the value in orders. */
  const updateInputValue = (evt, index, field) => {
    evt.preventDefault();
    const orderTemp = [...orders];
    orderTemp[index][field] = evt.target.value;
    // also have to remember to let the user know their changes aren't saved
    orderTemp[index].orderSaved = false
    setOrders(orderTemp);
  };

  /** Get the orders from the backend */
  const fetchOrders = () => {
    if (props.business) {
      axiosWrap.get("/order/my-orders", 
      { params: { business: props.business }})
      .then(res => {
        const existingOrders = res.data;
        if (existingOrders.length === 0) {
          setSkeleton(false)
          return;
        } else {
          setOrdersTo(existingOrders)
        }
      })  
      .catch(err => {
        setSkeleton(false)
        const message = "We couldn't connect to the server. Please check your internet connection and refresh the page."
        setSnackbarError({error: true, message})
        console.log("something went wrong:", err)
      }) 
    }
  }

  /** Handles the axios request for adding orders (or in the future updating them so this is smarter) */
  const saveOrders = () => {
    const submitOrderFormat = orders.filter((order, index) => {
      return !order.orderSaved
    }).map(order => {
      return {
        address: order.address,
        customer_name: order.customer_name,
        customer_phone: order.customer_phone,
        id: order.id
      }
    })
    axiosWrap
      .post("/order/add-orders", {
        business: props.business,
        orders: submitOrderFormat
      }).then(res => {
        // ignore the result because it is what it was previously
        const tempOrders = [...orders]
        res.data.forEach(toAssign => {
          let orderTemp = tempOrders.find(order => order.id === toAssign._id)
          let indexChanged = tempOrders.findIndex(order => order.id === toAssign._id)

          if (!orderTemp) {
            orderTemp = tempOrders.find(order => order.id === null)
            indexChanged = tempOrders.findIndex(order => order.id === null)
          }
          // orderTemp.customer_name = toAssign.customer_name
          // orderTemp.customer_phone = toAssign.customer_phone
          // orderTemp.address = toAssign.address
          orderTemp.orderSaved = true;
          orderTemp.id = toAssign._id
          tempOrders[indexChanged] = orderTemp;
        })
        setOrders(tempOrders)
        setSnackbarSuccess({success: true, message: "Saved your orders successfully!"})
      })
      .catch(function (error) {
        const message = "We couldn't save one of your orders. Please try again or contact us."
        setSnackbarError({error: true, message})
        console.log(error);
      });
  }

  const fetchBusiness = () => {
    axiosWrap.get('business/business-info', 
      { params: { business: props.business }}
    ).then(res => {
      setBusinessInfo(res.data)
      setPickupInfo(getTimesFrom24hrTimes(res.data.pickupTimes24hr))
    }).catch(err => {
      const message = "We couldn't get your business' information. Please check your internet connection"
      setSnackbarError({error: true, message})
    })
  }

  /** Once everything is set up, fetch the orders */
  useEffect(() => {
    if(props.business){
      fetchBusiness();
      fetchOrders();
    }
  }, [props.business]);

  /** The input fields where the customer inputs are collected. */
  const CusInfo = (props) => {
    return (
      <React.Fragment>
        <Card className={style.root}>
          <CardContent className={style.cardContent}>
            {props.order.orderSaved ? (
              <div className={style.saved}>
                <div className={style.spaceRight}>Saved!</div>
                <CheckCircleIcon />
              </div>
            ) : (
              <div className={style.unsaved}>
                <div className={style.spaceRight}>Unsaved Changes</div>
                <PriorityHighIcon />
              </div>
            )}
            <Typography className={[style.subHeader, style.alignLeft].join(' ')} variant="subtitle2">
              Please enter your customer’s order information:
            </Typography>
            <FormHelperText className={style.inputSpacing}>
              Customer Name
            </FormHelperText>
            <Input
              onBlur={(evt) =>
                updateInputValue(evt, props.idx, "customer_name")
              }
              defaultValue={props.order.customer_name}
              placeholder="e.g. Tom Cruise"
            />
            <FormHelperText className={style.inputSpacing}>
              Customer Address
            </FormHelperText>
            <Input
              label="Address"
              onBlur={(evt) =>
                updateInputValue(evt, props.idx, "address")
              }
              defaultValue={props.order.address}
              placeholder="e.g. 1234 Sesame Street, New York, NY, 12345"
            />
            <FormHelperText className={style.inputSpacing}>
              Phone Number
            </FormHelperText>
            <Input
                
                inputComponent={PhoneNumberMask}
                defaultValue={props.order.customer_phone}
                onBlur={(evt) =>
                  updateInputValue(evt, props.idx, "customer_phone")
                }
              />
          </CardContent>
          <Button
            className={style.delete}
            variant="contained"
            disabled={checkEmpty(props.order) && orders.length === 1}
            startIcon={<DeleteIcon />}
            onClick={() => deleteOrder(props.order.id, props.order.key)}
            onMouseOver={() => {document.activeElement.blur()}}
            key={props.order.key}
          >
            Delete this order
          </Button>
        </Card>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Container
        component="div"
        maxWidth={false}
        className={style.todayContainer}
      >
        <Typography className={style.header} variant="h4">
          Today's Orders
        </Typography>
        {pickupInfo ?
        <Typography className={style.subHeader} variant="subtitle2">
          Your scheduled pickup time is between <u>{ pickupInfo.pickupTime[0].hour +  pickupInfo.pickupTime[0].postfix }</u> and <u>{ pickupInfo.pickupTime[1].hour +  pickupInfo.pickupTime[1].postfix }</u>
          <br />
          Your customers can expect their order between <u>{ pickupInfo.dropoffTime.start }</u> and <u>{ pickupInfo.dropoffTime.end }</u>
          <br />
          Enter orders below before <u>{ pickupInfo.enterDeadline.hour }</u> to ensure that we send a driver to pick it up.
        </Typography>
        : null}
        <div className={style.orderList}>
          {showSkeleton ? (<Skeleton variant="rect" className={style.skeleton}/>) : (orders.map((order, index) => (
            <CusInfo order={order} key={order.key} idx={index} />
          )))}
        </div>
      </Container>
      <Button
        className={style.bottomBtn}
        variant="contained"
        color="primary"
        onClick={addBlankOrder}
        onMouseOver={() => {document.activeElement.blur()}}
        startIcon={<AddIcon />}
      >
        Add another order
      </Button>
      <Button
        className={style.bottomBtn}
        variant="contained"
        color="primary"
        onClick={saveOrders}
        onMouseOver={() => {document.activeElement.blur()}}
        startIcon={<SaveIcon />}
      >
        Save Today's Orders
      </Button>
      <Snackbar open={snackbarSuccess.success} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success">
          {snackbarSuccess.message}
        </Alert>
      </Snackbar>
      <Snackbar open={snackbarError.error} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error">
          {snackbarError.message}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

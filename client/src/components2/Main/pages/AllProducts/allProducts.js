import React, {useEffect, useState} from "react";
import logo from "../../../../assets/mint-stacked.svg";
import { axiosWrap } from '../../../../axios-wrapper';
import styles from "./allProducts.styles";
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
} from "@material-ui/core";

// Beginning of main function
export const AllProducts = (props) => {
  const style = styles();
  const [products, setProducts] = useState(undefined);
  /* -- http route to get the list of all products */
  useEffect( () => {
    const products= axiosWrap
  .get("/product/all-products", {
  }).then((result) => {
  setProducts(result.data)})
  },[])
  return(
    <React.Fragment>
    {products ?
    <div className={style.block}>
              <CardContent>
                {/* -- mapping of the products to the UI */}
                {products.map( (product) => {
                    return (
                          <div className={style.rectangle9}>
                            <div className={style.block}>
                                <div className={style.ellipse}>
                            <span className={style.rate}>4.6</span>
                            </div>
                          </div>
                          <img className={style.image} src={logo} alt="kahzum-logo">
                          </img>
                          <div>
                          <div className={style.itemName}>{product.itemName}</div>

                          </div>
                          <div className={style.price}>${product.price}</div>
                          <div className={style.deliveryInfo}>2.99 Delivery Fee*30-40 Min*$$</div>
                          <div className={style.itemDesc}>{product.itemDescription}</div>
                        </div>
                    );
                })}
              </CardContent>
            </div>
            : ""}
    </React.Fragment>
  );
};
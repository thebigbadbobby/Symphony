import React from "react";
import { Button } from "@material-ui/core";
import styles from "./Loading.styles";
import ReactLoading from 'react-loading';
import loadingIcon from '../../assets/mint-icon.svg'

export const Loading = (props) => {
  const style = styles();
  return (
    <React.Fragment>
      <div className={style.loadingContainer}>
        <ReactLoading
          className={style.loading}
          type={"spin"}
          color="#74E3C1"
          height={"100%"}
          width={"100%"}
        />
        <img className={style.loadingIcon} src={loadingIcon} alt="Kahzum" />
      </div>
    </React.Fragment>
  );
};

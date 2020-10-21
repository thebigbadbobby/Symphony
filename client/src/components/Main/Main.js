import React from "react";
import { Container } from '@material-ui/core';
import styles from './Main.styles'

export const Main = (props) => {
  const style = styles()
  console.log("here are the props", props)
 return (
   <React.Fragment>
     <Container component="div" maxWidth="lg" className={style.signInContainer}>
       Main Works!
     </Container>

   </React.Fragment>
 )
}
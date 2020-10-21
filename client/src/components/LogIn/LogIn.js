// ... Any imports you need, here are some examples:
import GoogleLogin from 'react-google-login';
import React from "react";
import { Container, Typography } from '@material-ui/core';
import styles from './LogIn.styles'

// To import a function from a seperate file, you would do import { functionName1, functionName2 } from './../pathToFile'

  
 // Use export const so that you can also import other functions from this file
 export const LogIn = (props) => {
   const style = styles()
  return (
    <React.Fragment>
      <Container component="div" maxWidth="lg" className={style.signInContainer}>
        <Typography variant="h4">
          Sign In
        </Typography>
        <GoogleLogin
            className={style.login}
            prompt='consent'
            clientId="1086476349516-dst8kdd0jq632n50p09p7dn728sihr6j.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={props.responseGoogle}
            onFailure={props.authFailed}
            hasSignedIn={true}
            cookiePolicy={'single_host_origin'}
          />
      </Container>

    </React.Fragment>
  )
 }
 
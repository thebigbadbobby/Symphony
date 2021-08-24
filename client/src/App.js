import React, { useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { LogIn } from "./components/LogIn/LogIn";
import { Main } from "./components/Main/Main";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import styles from "./App.styles";
import logo from "./assets/mint-stacked.svg";
import { Loading } from "./components/Loading/Loading";
import { axiosWrap } from "./axios-wrapper";
import { SignUp } from "./components/SignUp/SignUp";
import { Popup } from "./components/Popup/Popup"
import {
  Button
} from "@material-ui/core";

const Copyright = () => {
  const style = styles();
  return (
    <Typography
      className={style.copyright}
      variant="inherit"
      color="textSecondary"
      align="center"
    >
      {"Copyright © "}
      <Link color="inherit" href="https://kahzum.com/">
        Kahzum
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

/** Helpful for passing child->parent https://medium.com/how-to-react/pass-data-or-event-from-a-child-component-to-parent-component-in-both-functional-and-class-ae2f8b7ccda2 */
const App = (props) => {
  const switchApp = props.props
  /** Set state variables */
  let [signedIn, setSignIn] = useState(false);
  let [auth, setAuth] = useState(undefined);
  let [user, setUser] = useState(undefined);
  let [loading, setLoading] = useState(true);
  let [customerID, setCustomerID] = useState(undefined);
  let [newUser, setNewUser] = useState(undefined);
  let [showErrorDialog, setShowErrorDialog] = useState(false);
  let [popupContent, setPopupContent] = useState({title: "", message: "", button1: "", button1Action: () => {}})
  // creats a global state for all components
  const style = styles();

  /** Create a theme */
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#74d2ad",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#90e0c3",
      },
      default: {
        main: "#ffffff",
      },
    },
  });

  /** Sets the user from the google object so that it is standardized
   * for this application.
   */
  const setUserFromGoogle = (auth) => {
    const profile = auth.currentUser.get().getBasicProfile()
    // This is important because the fields from google change!! This makes it static, appwide
    let usr = {
      id: profile.getId(),
      fullName: profile.getName(),
      familyName: profile.getGivenName(),
      imageUrl: profile.getImageUrl(),
      email: profile.getEmail(),
    }
    setUser(usr);
  }

  /** Initializes sign in for auto log in. */
  useEffect(() => {
    console.log(props)
    console.log(props.props)
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "927100574754-01n7pgbv4m48tvgomdpmla91cco4cfd9.apps.googleusercontent.com",
          scope: "email", // and whatever else passed as a string...
        })
        .then(() => {
          setAuth(window.gapi.auth2.getAuthInstance());
          window.gapi.auth2
            .getAuthInstance()
            .isSignedIn.listen(handleAuthChange);
        }).catch(err => {
          console.log("Likely a cookie or ad blocker problem", err)
          setPopupContent({
            title: "Cookies required to access Kahzum",
            message: "It seems like you are blocking our access to third-party cookies, which is unfortunately required by Google's Sign-in process. Please try disabling any ad blocker you may be using, and make sure that you are using a normal (non-incognito) browser window.",
            button1: "Close",
            button1Action: () => {
              handleSignOut()
            }
          })
          openErrorDialog();
        });
    });
  }, []);

  /** Calls an auth change whenever auth changes */
  useEffect(() => {
    if (auth) {
      handleAuthChange();
    }
  }, [auth]);

  /** Calls sign in when user changes */
  useEffect(() => {
    if (user) {
      let email = user.email
      axiosWrap
        .post("/customer/sign-in", { email: email })
        .then((res) => {
          setNewUser(res.data.newUser);
          setCustomerID(res.data.customerID);
          setLoading(false);
          if (!res.data.newUser) {
            setSignIn(true);
          }
        })
        .catch(function (error) {
          console.log(error)
          setPopupContent({
            title: "Your customer has been deleted.",
            message: "It seems that you once had a customer registered in our system. Your Owner account has not been deleted but your customer has. Please contact us to get this resolved at info@kahzum.com.",
            button1: "Sign Out",
            button1Action: () => {
              handleSignOut()
            }
          })
          openErrorDialog();
        });
    }
  }, [user]);

  /** Handles auth changes (in sign in status) */
  const handleAuthChange = () => {
    if (auth) {
      const gsignIn = auth.isSignedIn.get();
      // gsignIn != prev value prevents infinite loop
      if (gsignIn && gsignIn !== signedIn) {
        setSignIn(auth.isSignedIn.get());
        setUserFromGoogle(auth);
        setAuth(auth);
      } else {
        setLoading(false)
      }
    }
  };

  /** Signs the user in and updates state. */
  const handleSignIn = () => {
    setLoading(true);
    auth
      .signIn()
      .then(() => {
        setUserFromGoogle(auth);
      })
      .catch(() => {
        console.log("Failed to sign in");
        setLoading(false);
      });
  };

  /** Signs the user out and updates state */
  const handleSignOut = () => {
    setLoading(true);
    auth
      .signOut()
      .then(() => {
        setSignIn(false);
        setUser(undefined);
        setLoading(false);
      })
      .catch(() => {
        console.log("Failed to sign out");
        setLoading(false);
      });
  };

  /** When the user creates a customer from the sign up screen, this is called. */
  const customerCreated = (customerId) => {
    setNewUser(false);
    setSignIn(true);
    setCustomerID(customerId)
  }

  /** Handles the opening of the dialog box in the case of an error */
  const openErrorDialog = () => {
    setShowErrorDialog(true);
  };

  /** Handles the closing of the dialog box in the case of an error */
  const closeErrorDialog = () => {
    setShowErrorDialog(false);
  };

  /** Used to decide which screen should be shown to the user */
  const SelectScreen = (props) => {
    if (props.newUser) {
      // show the sign up screen
      return <SignUp user={user} signedIn={signedIn} customerCreated={customerCreated} />
    } else if (props.isSignedIn) {
      // direct them to the app
      return (
        <Main
          isSignedIn={signedIn}
          user={user}
          auth={auth}
          signOut={handleSignOut}
          customer={customerID}
          // newUser={newUser}
        />
      );
    } else {
      // direct them to the splash screen
      return (
       
        <Container
          component="div"
          maxWidth="lg"
          className={style.signInContainer}
        >
           <Button
                                              variant="contained"
                                              color="primary"
                                              onClick={switchApp}
                                              // startIcon={<AddIcon />}
                                            >
                                              Switch
                                            </Button>
          <img className={style.imageIcon} src={logo} alt="kahzum-logo" />
          <Typography className={style.tagLine} variant="h5">
            Local product fulfillment for customers.
          </Typography>
          <LogIn isSignedIn={signedIn} handleSignIn={handleSignIn} />
        </Container>
      );
    }
  };

  return (
    <Container
      className={style.app}
      component="div"
      maxWidth={false}
      disableGutters={true}
    >
      <CssBaseline />
      <Popup open={showErrorDialog} handleClose={closeErrorDialog} title={popupContent.title} message={popupContent.message} button1={popupContent.button1} />
      {loading ? (
        <Loading />
      ) : (
        <ThemeProvider theme={theme}>
          <SelectScreen isSignedIn={signedIn} newUser={newUser} />
          <Copyright />
        </ThemeProvider>
      )}
    </Container>
  );
}
export default App;

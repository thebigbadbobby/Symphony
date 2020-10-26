import React, { useState } from "react";
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
export default function App() {
  /** Set state variables */
  let [signedIn, setSignIn] = useState(false);
  let [auth, setAuth] = useState({});
  let [user, setUser] = useState({});
  let [loading, setLoading] = useState(true);
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

  /** Initializes sign in for auto log in. */
  const initSignIn = () => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "1086476349516-dst8kdd0jq632n50p09p7dn728sihr6j.apps.googleusercontent.com",
          scope: "email", // and whatever else passed as a string...
        })
        .then(() => {
          console.log("signIn initialized");
          auth = window.gapi.auth2.getAuthInstance();
          handleAuthChange();
          setLoading(false);
          auth.isSignedIn.listen(handleAuthChange);
        });
    });
  };

  /** Handles auth changes (in sign in status) */
  const handleAuthChange = () => {
    const gsignIn = auth.isSignedIn.get();
    // gsignIn != prev value prevents infinite loop
    if (gsignIn && gsignIn !== signedIn) {
      setSignIn(auth.isSignedIn.get());
      setUser(auth.currentUser.get());
      setAuth(auth);
    }
  };

  /** Signs the user in and updates state. */
  const handleSignIn = () => {
    auth.signIn().then(() => {
      setSignIn(true);
      setUser(auth.currentUser.get());
    });
  };

  /** Signs the user out and updates state */
  const handleSignOut = () => {
    auth.signOut().then(() => {
      setSignIn(false);
      setUser({});
      setAuth({});
    });
  };

  /** Initialize Sign In setup on boot */
  initSignIn();

  return (
    <Container
      className={style.app}
      component="div"
      maxWidth={false}
      disableGutters={true}
    >
      <CssBaseline />
      {loading ? (
        <Loading />
      ) : (
        <ThemeProvider theme={theme}>
          {signedIn ? (
            <Main
              isSignedIn={signedIn}
              user={user}
              auth={auth}
              signOut={handleSignOut}
            />
          ) : (
            <Container
              component="div"
              maxWidth="lg"
              className={style.signInContainer}
            >
              <img className={style.imageIcon} src={logo} alt="kahzum-logo" />
              <Typography className={style.tagLine} variant="h5">
                Same-day Delivery for Your Small Business
              </Typography>
              <LogIn isSignedIn={signedIn} handleSignIn={handleSignIn} />
            </Container>
          )}
          <Copyright />
        </ThemeProvider>
      )}
    </Container>
  );
}

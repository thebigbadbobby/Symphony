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
  let [auth, setAuth] = useState(undefined);
  let [user, setUser] = useState(undefined);
  let [loading, setLoading] = useState(true);
  let [businessID, setBusinessID] = useState(undefined);
  let [newUser, setNewUser] = useState(undefined);
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
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "1086476349516-dst8kdd0jq632n50p09p7dn728sihr6j.apps.googleusercontent.com",
          scope: "email", // and whatever else passed as a string...
        })
        .then(() => {
          setAuth(window.gapi.auth2.getAuthInstance());
          window.gapi.auth2
            .getAuthInstance()
            .isSignedIn.listen(handleAuthChange);
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
        .post("/business/sign-in", { ownerEmail: email })
        .then((res) => {
          setNewUser(res.data.newUser);
          setBusinessID(res.data.businessID);
          setLoading(false);
          if (!res.data.newUser) {
            setSignIn(true);
          }
        })
        .catch(function (error) {
          alert("error");
          alert(JSON.stringify(error));
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

  /** When the user creates a business from the sign up screen, this is called. */
  const businessCreated = (businessId) => {
    setNewUser(false);
    setSignIn(true);
    setBusinessID(businessId)
  }

  /** Used to decide which screen should be shown to the user */
  const SelectScreen = (props) => {
    if (props.newUser) {
      // show the sign up screen
      return <SignUp user={user} businessCreated={businessCreated} />
    } else if (props.isSignedIn) {
      // direct them to the app
      return (
        <Main
          isSignedIn={signedIn}
          user={user}
          auth={auth}
          signOut={handleSignOut}
          business={businessID}
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
          <img className={style.imageIcon} src={logo} alt="kahzum-logo" />
          <Typography className={style.tagLine} variant="h5">
            Same-day Delivery for Your Small Business
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

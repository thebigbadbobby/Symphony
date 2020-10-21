import React, { useState }from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { LogIn } from "./components/LogIn/LogIn";
import { Main } from "./components/Main/Main";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
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
  let [userObject, setUser] = useState({});

  /** Google login logic */
  const responseGoogle = (response) => {
    const profile = response.getBasicProfile();
    console.log("Fetch from db:", profile);
    setSignIn(true);
    setUser(profile);
  };
  const authFailed = (response) => {
    console.log("Need to handle this case", response);
  };

  return (
    <Container component="div" maxWidth="lg">
      <CssBaseline />
      {signedIn ? (
        <Main user={userObject} />
      ) : (
        <LogIn responseGoogle={responseGoogle} authFailed={authFailed} />
      )}
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

import React from "react";
import "./App.css";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "./index.css";
import HomeScreen from "./Screens/HomeScreen";
import SigninScreen from "./Screens/SigninScreen";
import SignupScreen from "./Screens/SignupScreen";
import AdminScreen from "./Screens/AdminScreen";
import { useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

function App() {
  const classes = useStyles();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  return (
    <BrowserRouter>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Student Administration System
            </Typography>

            {userInfo ? (
              <Link to="/profile">{userInfo.firstname}</Link>
            ) : (
              <Link className="button-link" to="/signin">
                {" "}
                <Button color="inherit">Login</Button>
              </Link>
            )}
          </Toolbar>
        </AppBar>
      </div>
      <main className="main">
        <div className="content">
          <Route path="/" exact={true} component={HomeScreen} />
          <Route path="/admin" component={AdminScreen} />
          <Route path="/signup" component={SignupScreen} />
          <Route path="/signin" component={SigninScreen} />
        </div>
      </main>
      {/* 
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
      </footer> */}
    </BrowserRouter>
  );
}

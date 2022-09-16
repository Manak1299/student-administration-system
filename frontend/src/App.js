import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import SigninScreen from "./Screens/SigninScreen";
import SignupScreen from "./Screens/SignupScreen";
import AdminScreen from "./Screens/AdminScreen";
import RegisterationForm from "./Screens/RegisterationForm";
import StudentinfoadminScreen from "./Screens/StudentinfoadminScreen";
import "./index.css";
import SubjectScreen from "./Screens/SubjectScreen";
const useStyles = makeStyles((theme) => ({}));

function App() {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <AppBar position="relative" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Student Information System
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Route path="/admin" component={AdminScreen} />
        <Route path="/signup" component={SignupScreen} />
        <Route path="/subjects" component={SubjectScreen}/>
        <Route path="/infoform/:id" component={RegisterationForm} />
        <Route path="/stinfoadmin" component={StudentinfoadminScreen} />
        <Route path="/" exact={true} component={SigninScreen} />
      </main>
      {/* <AppBar position="relative" className="footer" color="primary">
        <Toolbar>
          <Typography variant="body1" color="inherit">
            @Manak
          </Typography>
        </Toolbar>
      </AppBar> */}
    </BrowserRouter>
  );
}

export default App;

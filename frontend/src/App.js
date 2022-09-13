import "./App.css";
import { useEffect} from "react";
import Header from "./components/layout/header/Header.js";
import Home from "./components/layout/home/Home.js";
import Footer from "./components/layout/Footer/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import { useSelector } from "react-redux";
import { loadUser } from "./actions/userAction";
import store from "./store";
import Student from "./components/pages/Students";
import Profile from "./components/user/Profile";

function App() {

  const { isAuthenticated } = useSelector(state => state.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
  }, []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <>
        <Router>
            <Header />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/student/list" component={Student} />
                <Route exact path="/profile" component={Profile} />
            </Switch>
            <Footer/>
        </Router>
    </>
      
  );
}

export default App;

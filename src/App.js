import React, { useEffect } from "react";
import { HashRouter, Route, Router } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./components/signup/signup";
import Navigation from "./components/navbar/navbar";
import Login from "./components/login/login";
import RecoverPass from "./components/recoverPassword/recoverPass";
import DataTable from "./components/dataTable/dataTable";
import ContactUs from "./components/contactUs/contactUs";
import { addUser, removeUser } from "./actions/action";
import store from "./redux";
import { Provider } from "react-redux";
import Rout from "./components/router";

function App() {
  useEffect(() => {
    fetch("/users/authenticate")
      .then(res => res.json())
      .then(res => {
        // console.log(res);
        var user = res;
        if (user.authenticated) {
          console.log("yes");
          store.dispatch(addUser(user.user));
        } else {
          console.log("No");
          store.dispatch(removeUser());
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
  return (
    <Provider store={store}>
      <div className="App">
        <Rout/>
      </div>
    </Provider>
  );
}

export default App;

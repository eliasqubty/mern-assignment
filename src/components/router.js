import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Login from "./login/login";
import Signup from "./signup/signup";
import RecoverPass from "./recoverPassword/recoverPass";
import dataTable from "./dataTable/dataTable";
import ContactUs from "./contactUs/contactUs";
import Navigation from "./navbar/navbar";
import { connect } from "react-redux";

function Rout(props) {
  return (
    <HashRouter>
      <Navigation />
      {props.user !== null ? (
        <Switch>
          <Route path="/contact_us" component={ContactUs} />
          <Route path="/data" component={dataTable} />
          <Route path="/" component={dataTable} />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/register" component={Signup} />
          <Route exact path="/forget_pass" component={RecoverPass} />
          <Route exact path="/contact_us" component={ContactUs} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Login} />
        </Switch>
      )}
    </HashRouter>
  );
}
const mapStateToProps = store => {
  return {
    user: store.userReducer
  };
};
export default connect(mapStateToProps)(Rout);

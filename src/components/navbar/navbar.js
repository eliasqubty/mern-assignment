import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { removeUser } from "../../actions/action";
import { Link } from "react-router-dom";
import Logo from "./images/logo.png";
import "./navbar.css";
import { connect } from "react-redux";
class Navigati extends React.Component {
  state = {
    collapsed: true
  };
  openNav = () => {
    document.getElementById("myNav").style.display = "block";
  };
  openNav2 = () => {
    document.getElementById("myNav").style.width = "0%";
    document.getElementById("myNav2").style.width = "100%";
  };

  closeNav = () => {
    document.getElementById("myNav").style.display = "none";
    document.getElementById("myNav2").style.width = "0%";
  };
  closeNav2 = () => {
    document.getElementById("myNav2").style.width = "0%";
  };

  render() {
    return (
      <div className="navigation">
        {/* <div id="myNav" className="overlay">
          <a  className="closebtn" onClick={this.closeNav}>
            &times;
          </a>
          <div className="overlay-content">
            <Link to="/" onClick={this.closeNav}>Home</Link>
            <Link to="/profile" onClick={this.closeNav}>My Profile</Link>
            <Link to="/dashboard" onClick={this.closeNav}>Dashboard</Link>
            <a  onClick={this.openNav2}>Instructions</a>
            <Link to="/blog" onClick={this.closeNav}>Blog</Link>
            <Link to="/Store" onClick={this.closeNav}>Store</Link>
            <Link to="/login" onClick={this.closeNav}>Login</Link>
            <Link to="/login" onClick={this.closeNav}>Logout</Link>
          </div>
        </div>
        <div id="myNav2" className="overlay nav-overlay2">
          <a  className="closebtn" onClick={this.closeNav}>
            &times;
          </a>
          <div className="overlay-content">
            <Link to="/" onClick={this.closeNav}>Home</Link>
            <Link to="/how-to-eat" onClick={this.closeNav}>How to Eat </Link>
            <Link to="/what-to-eat" onClick={this.closeNav}>What to Eat</Link>
            <Link to="/how-to-exercise" onClick={this.closeNav}>How to do excercise</Link>
            <Link to="/how-to-take-photoshot" onClick={this.closeNav}>How to take photoshot</Link>
            <Link to="/how-to-eat-portion" onClick={this.closeNav}>How to eat on Dish</Link>
            <Link to="/how-to-drink" onClick={this.closeNav}>How to Drink</Link>
          </div>
        </div>
        <Link to="/">
          <img className="nav-logo" src={Logo} />
        </Link>
        <span
          className="open-nav-btn"
          style={{ fontSize: "30px", cursor: "pointer" }}
          onClick={this.openNav}
        >
          &#9776;
        </span> */}
      </div>
    );
  }
}

//  Nav;

const Navigation = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    // console.log();
    if (window.screen.width < 768) setIsOpen(!isOpen);
  };
  const logout = () => {
    fetch("/users/logout")
      .then(res => res.text())
      .then(response => {
        props.dispatch(removeUser());
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div className="nav-container">
      <Navbar className="navbar-abs bg-dark" color="dark" light expand="md">
        <Link to="/">
          <NavbarBrand>
            <h3>Assignment</h3>
          </NavbarBrand>
        </Link>
        <NavbarToggler onClick={toggle}></NavbarToggler>
        {/* <hr/> */}
        <Collapse isOpen={isOpen} navbar>
          {props.user !== null ? (
            <Nav className="ml-auto rightNav" navbar>
              <NavItem onClick={toggle}>
                <Link to="/data">
                  <NavLink>Data Table</NavLink>
                </Link>
              </NavItem>
              <NavItem onClick={toggle}>
                <Link to="/contact_us">
                  <NavLink>Contact Us</NavLink>
                </Link>
              </NavItem>
              <NavItem
                onClick={() => {
                  toggle();
                  logout();
                }}
              >
                <Link to="/">
                  <NavLink>Logout</NavLink>
                </Link>
              </NavItem>
            </Nav>
          ) : (
            <Nav className="ml-auto rightNav" navbar>
              <NavItem onClick={toggle}>
                <Link to="/contact_us">
                  <NavLink>Contact Us</NavLink>
                </Link>
              </NavItem>
              <NavItem onClick={toggle}>
                <Link to="/register">
                  <NavLink>Register</NavLink>
                </Link>
              </NavItem>
              <NavItem onClick={toggle}>
                <Link to="/login">
                  <NavLink>Login</NavLink>
                </Link>
              </NavItem>
            </Nav>
          )}

          {/* <NavbarText>Simple Text</NavbarText> */}
        </Collapse>
      </Navbar>
    </div>
  );
};
const mapStateToProps = store => {
  return {
    user: store.userReducer
  };
};

export default connect(mapStateToProps)(Navigation);

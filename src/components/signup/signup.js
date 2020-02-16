import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { validate } from "../validation/emailvalidate";
import { addUser } from '../../actions/action';
import { connect } from "react-redux"
import './signup.css'

function Signup(props) {
  const [err, setErr] = useState("");
  const [values, setValues] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    confirmPassword: ""
  })


  function handleInput(e) {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!(values.fName && values.lName && values.email && values.password && values.confirmPassword)) {
      setErr("Please fill all fields")
    }
    else if (!(/[0-9]/.test(values.password) && /[a-z]/.test(values.password) && /[A-Z]/.test(values.password) && values.password.length > 7)) {
      setErr("Passwords must contain at least 8 characters, including uppercase, lowercase letters and numbers.")
    }
    else if (values.password !== values.confirmPassword) {
      setErr("Password does not match");
    }
    else if (!validate(values.email)) {
      setErr("Please enter a valid email")
    }
    else {
      setErr("");
      var options = {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        }
      }

      fetch('/users/signup', options)
        .then(res => res.json())
        .then(response => {
          console.log(response)
          if (response.success) {
            options = {
              method: 'POST', // or 'PUT'
              body: JSON.stringify({ username: values.email, password: values.password }), // data can be `string` or {object}!
              headers: {
                'Content-Type': 'application/json'
              }
            }
            fetch('/users/login', options)
              .then(res => res.json())
              .then(response => {
                console.log(response)
                props.dispatch(addUser(response));
                props.history.push('/data')
              })
              .catch(error => console.error('Error:', error));
          }
          if (response.exist) {
            setErr(response.msg)
          }
        })
        .catch(error => console.error('Error:', error));

    }
    // console.log(object)
  };

  console.log(values);
  return (
    <div className="signup">
      <div className="row con-row">
        <div className="col-lg-4 col-sm-8 mx-auto">
          <form class="text-center su-form border border-light p-5">
            <p class="h4 mb-4">Sign Up</p>
            <div class="form-row mb-4">
              <div class="col">
                <input type="text" onChange={handleInput} name="fName" class="form-control" placeholder="First name" />
              </div>
              <div class="col">
                <input type="text" onChange={handleInput} name="lName" class="form-control" placeholder="Last name" />
              </div>
            </div>

            <input type="email" onChange={handleInput} name="email" class="form-control mb-4" placeholder="E-mail" />
            <input type="password" onChange={handleInput} name="password" class="form-control mb-4" placeholder="Password" aria-describedby="defaultRegisterFormPasswordHelpBlock" />
            <input type="password" onChange={handleInput} name="confirmPassword" class="form-control" placeholder="Confirm Password" aria-describedby="defaultRegisterFormPasswordHelpBlock" />
            <small class="form-text text-muted mb-4">
              {/* At least 8 characters and 1 digit */}
              {err}
            </small>
            <button onClick={handleSubmit} class="btn btn-info my-4 btn-block" >Create my account</button>

            <p>
              <em>Already a member?</em> <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
const mSTP = (store) => {
  return { user: store.userReducer }
}
export default connect(mSTP)(Signup);
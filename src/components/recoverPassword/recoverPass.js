import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { validate } from '../validation/emailvalidate';
import './forgetPass.css'

function RecoverPass(props) {
  const [err, setErr] = useState("")
  const [state, setState] = useState(1);
  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
    otp: "",
    email: "",
  })
  function handleInput(e) {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  function handleSubmit1(e) {
    setErr("");

    e.preventDefault();
    if (!values.email) {
      setErr("Enter your email address");
    }
    else if (!validate(values.email)) {
      setErr("Enter a valid email address");
    }
    else {
      setErr("Please Wait..");
      fetch(`/users/send_otp?email=${values.email}`)
        .then(res => res.json())
        .then(res => {
          console.log(res);
          if (res.success && res.user) {
            setErr("");
            setState(2);
          }
          if (res.success && !res.user) {
            setErr("No user registered with this email")
          }
        })
        .catch(err => { console.log(err) })
    }


  }
  function handleSubmit2(e) {
    e.preventDefault();
    // setState(3);
    fetch(`/users/confirm_otp?email=${values.email}&otp=${values.otp}`)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.success && res.match) {
          setState(3);
        }
        if (res.success && !res.match) {
          setErr("Incorrect Code")
        }
      })
      .catch(err => { console.log(err) })
  }
  function handleSubmit3(e) {
    e.preventDefault();
    if (!(values.password && values.confirmPassword)) {
      setErr("Enter new password")
    }
    else if (!values.confirmPassword) {
      setErr("Confirm your new password")
    }
    else if (values.password !== values.confirmPassword) {
      setErr("Password does not match")
    }
    else {
      fetch(`/users/reset_pass?email=${values.email}&password=${values.password}`)
        .then(res => res.json())
        .then(res => {
          console.log(res);
          if (res.success) {
            props.history.push("/login");
          }
        })
        .catch(err => { console.log(err) })
    }

  }
  console.log(values);
  return (
    <div className="signup">
      <div className="row con-row">
        <div className="col-lg-4 col-sm-8 mx-auto">
          {state === 1 &&
            <form class="text-center su-form border border-light p-5">
              <p class="h4 mb-4">Enter your email address</p>
              <input type="email" onChange={handleInput} name="email" class="form-control mb-4" placeholder="E-mail" />
              <small class="form-text text-muted mb-4">
                {err}
              </small>
              <button onClick={handleSubmit1} class="btn btn-info my-4 btn-block" >Continue</button>
              <p>
                <em>Need an account?</em> <Link to="/register">Sign up</Link>
              </p>
            </form>}
          {state === 2 &&
            <form class="text-center su-form border border-light p-5">
              <p class="h4 mb-4">Check your email</p>
              <input type="text" onChange={handleInput} name="otp" class="form-control mb-4" placeholder="6 digit Code from your email" />
              <small class="form-text text-muted mb-4">
                {err}
              </small>
              <button onClick={handleSubmit2} class="btn btn-info my-4 btn-block" >Continue</button>
              <p>
                <em>Need an account?</em> <Link to="/register">Sign up</Link>
              </p>
            </form>
          }
          {state === 3 &&
            <form class="text-center su-form border border-light p-5">
              <p class="h4 mb-4">Set New Password</p>
              <input type="password" onChange={handleInput} name="password" class="form-control mb-4" placeholder="New password" />
              <input type="password" onChange={handleInput} name="confirmPassword" class="form-control mb-4" placeholder="Confirm new password" />
              {/* <small class="form-text text-muted mb-4">
              At least 8 characters and 1 digit
            </small> */}
              <button onClick={handleSubmit3} class="btn btn-info my-4 btn-block" >Reset Password</button>
            </form>}
        </div>
      </div>
    </div>
  );
}
export default RecoverPass;
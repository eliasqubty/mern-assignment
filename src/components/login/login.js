import React,{useState} from 'react';
import {Link} from 'react-router-dom'
import {validate} from '../validation/emailvalidate';
import {addUser} from '../../actions/action'
import {connect} from "react-redux";
import './login.css'

function Login(props) {

  const [err, setErr]=useState("")
  const [values, setValues]=useState({
    username:"",
    password:""
  })
  function handleInput(e){
    setValues({...values,[e.target.name]:e.target.value})
  }
  const handleLogin = (e) => {
    e.preventDefault();
    setErr("")
    if (!values.username && !values.password) {
      setErr("Enter your email and password")
    }
    else if (!values.username) {
      setErr("Enter your email first")
    }
    else if (!values.password) {
      setErr("Enter your password first")
    }
    else if (!validate(values.username)) {
      setErr("Email you entered is not valid")
    }
    else {
      const options = {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json"
        }
      }
      fetch('/users/login', options)
        .then(res => res.json())
        .then(data => {
          // console.log('Success:', JSON.stringify(data))
          props.dispatch(addUser(data))
          props.history.push('/')
        })
        .catch(error => {
          setErr("Email or password is incorrect");
          console.error('Error:', error)
        })
    }
  }
  // function handleSubmit(e){
  //   e.preventDefault();
  // }
  console.log(values);
  return (
    <div className="signup">
      <div className="row con-row">
        <div className="col-lg-4 col-sm-8 mx-auto">
          <form class="text-center su-form border border-light p-5">
            <p class="h4 mb-4">Log in to your account</p>
            
            <input type="email" onChange={handleInput} name="username" class="form-control mb-4" placeholder="E-mail" />
            <input type="password" onChange={handleInput} name="password" class="form-control" placeholder="Password" aria-describedby="defaultRegisterFormPasswordHelpBlock" />
            <small class="form-text text-muted mb-4">
              {/* At least 8 characters and 1 digit */}
              {err}
            </small>
            <button onClick={handleLogin} class="btn btn-info my-4 btn-block" >Login</button>

            <p>
            <em><Link to="/forget_pass">Forget Password?</Link></em>
            </p>
            <p>
              <em>Need an account?</em> <Link to="/register">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
const mSTP=(store)=>{
  return {user:store.userReducer}
  }
export default connect(mSTP)(Login);
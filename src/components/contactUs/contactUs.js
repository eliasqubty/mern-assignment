import React, { useState } from "react"
import { validate } from "../validation/emailvalidate"
import "./contactUs.css"
export default function ContactUs() {
  const [err, setErr] = useState("");
  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  function handleInput(e) {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  // function handleArea(e){
  //   console.log(e.target.name)
  // }
  function handleSubmit(e) {
    e.preventDefault();
    setErr("")
    if (!(values.name && values.email && values.subject && values.message)) {
      setErr("Please fill all fields")
    }
    else if (!validate(values.email)) {
      setErr("Enter a valid email address")
    }
    else {
      fetch(`/users/contact_us?name=${values.name}&email=${values.email}&subject=${values.subject}&message=${values.message}`)
        .then(res => res.json())
        .then(res => {
          console.log(res);
          if (res.success) {
            setErr("Thanks for contacting us we will contact you soon")
          }
        })
        .catch(err => { console.log(err) })
    }
  }
  return (
    <div className="signup">
      <div className="row con-row">
        {/* <div className="col-lg-2 col-sm-8"></div> */}
        <div className="col-lg-4 mx-auto col-sm-8">
          <form style={{ margin: "50px 0 0 0" }} class="text-center border border-light p-5" >

            <p class="h4 mb-4">Contact us</p>
            <input type="text" name="name" onChange={handleInput} id="defaultContactFormName" class="form-control mb-4" placeholder="Name" />

            <input type="email" name="email" onChange={handleInput} id="defaultContactFormEmail" class="form-control mb-4" placeholder="E-mail" />
            <label>Brand Name</label>
            <select onChange={handleInput} name="subject" class="browser-default custom-select mb-4">
              <option value="" disabled>Choose option</option>
              <option value="Feedback" defaultValue>Feedback</option>
              <option value="Report a bug">Report a bug</option>
              <option value="Feature request">Feature request</option>
            </select>

            <div class="form-group">
              <textarea onChange={handleInput} name="message" class="form-control rounded-0" id="exampleFormControlTextarea2" rows="3" placeholder="Message"></textarea>
            </div>
            <small class="form-text text-muted mb-4">
              {err}
            </small>
            <button onClick={handleSubmit} class="btn btn-info btn-block">Send</button>

          </form>
        </div>
        <div className="col-lg-4 col-sm-8 mx-auto ">
          <div className="contacts">
            <a href="mailto:elias-m-q92@hotmail.com"><button className="btn contact-s-btn">Contact Support</button></a>
            <p>Tel: <a href="tel:0528888889">052-8888889</a></p>
            <p>Em@il: <a href="mailto:elias-m-q92@hotmail.com">elias-m-q92@hotmail.com</a></p>
            <p>Country: kfar Yassif 24908</p>
          </div>
        </div>
      </div>
    </div>

  )
}
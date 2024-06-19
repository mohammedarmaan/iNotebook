import {React, useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = ( props ) => {
    const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""})

    const navigate = useNavigate()
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
      const {name, email, password, cpassword } = credentials
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              },
            body: JSON.stringify({ name, email, password}),
          });
          const json = await response.json(); // auth token
          console.log(json);

          // if(password !== cpassword){
          //   alert("passwords dont match")
          // }

          if (json.success){                 // redirect to the notes page
            // Save the auth token
            localStorage.setItem("token", json.authtoken)
            // Redirect
            navigate("/")
            props.showAlert("Successfully signed up", "success")
          }
          else{
            props.showAlert("Invaild credentials", "danger")
           
          }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
      };
  return (
    <>
   <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          placeholder="Jason Statham"
          value={credentials.name}
        onChange={onChange}
        required
        />
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          placeholder="name@example.com"
          value={credentials.email}
        onChange={onChange}
        required
        minLength={5}
        />
      </div>
      <label htmlFor="password" className="form-label">
        Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        className="form-control"
        aria-describedby="passwordHelpBlock"
        value={credentials.password}
        onChange={onChange}
        required
        minLength={5}
        />
      <label htmlFor="cpassword" className="form-label">
        Confirm Password
      </label>
      <input
        type="password"
        id="cpassword"
        name="cpassword"
        className="form-control"
        aria-describedby="passwordHelpBlock"
        value={credentials.cpassword}
        onChange={onChange}
        required
        minLength={5}
      />

      <button type="submit" className="btn btn-primary my-2 ">sign-up</button>
      </form>
    
    </>
  )
}

export default Signup
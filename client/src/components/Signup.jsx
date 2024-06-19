import {React, useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Signup = ( props ) => {
    const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""})

    const navigate = useNavigate()
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
      const {name, email, password, cpassword } = credentials
        const response = await fetch(`https://notebook-api-orpin.vercel.app/api/auth/createuser`, {
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
            localStorage.setItem("uname", json.uname)
            // Redirect
            navigate("/")
            props.showAlert("Successfully signed up", "success")
          }
          else{
            props.showAlert("User with this email already exists", "danger")
           
          }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
      };
  return (
    <>
    
      <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Create an Account</h2>
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
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
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
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    value={credentials.password}
                    onChange={onChange}
                    required
                    minLength={5}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="cpassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="cpassword"
                    name="cpassword"
                    className="form-control"
                    value={credentials.cpassword}
                    onChange={onChange}
                    required
                    minLength={5}
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Sign Up
                  </button>
                </div>
              </form>
              <p className="text-center mt-3">
                Already have an account?  <Link to="/signin">Sign In</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Signup
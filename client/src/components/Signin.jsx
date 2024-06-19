import { React, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signin = ({ showAlert }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`https://notebook-api-orpin.vercel.app/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json(); // auth token
    console.log(json);

    if (json.success) {
      // redirect to the notes page
      // Save the auth token
      localStorage.setItem("token", json.authtoken);
      localStorage.setItem("uname", json.uname)
      // Redirect
      navigate("/");
      showAlert("successfully signed in", "success");
    } else {
      // alert("wrong credentials")
      showAlert("Wrong credentials", "danger");
    }
  };
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
              <h2 className="card-title text-center mb-4">Login to Continue</h2>
              <form onSubmit={handleSubmit}>
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
                    aria-describedby="passwordHelpBlock"
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={onChange}
                    required
                    minLength={5}
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Sign In
                  </button>
                </div>
              </form>
              <p className="text-center mt-3">
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Signin;

import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = ({ showAlert }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
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
      <div className="container mt-2">
        <h2>Login to continue....</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
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
          />

          <button type="submit" className="btn btn-primary my-2 ">
            signin
          </button>
        </form>
      </div>
    </>
  );
};

export default Signin;

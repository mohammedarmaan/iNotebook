import { React } from "react";
import Notes from "./Notes";

const Home = ({ showAlert }) => {
  return (
    <>
      {localStorage.getItem("token") ? (
        <Notes showAlert={showAlert} />
      ) : (
        <div className="container mt-5">
          <div className="jumbotron text-center">
            <h1 className="display-4">Welcome to MyApp</h1>
            <p className="lead">
              This is a simple, elegant, and responsive React home page using
              Bootstrap.
            </p>
            <hr className="my-4" />
            <p>Explore our features and enjoy a great user experience.</p>
            <a href="/signup" className="btn btn-primary mx-1">
              sign up
            </a>
            <a href="/signin" className="btn btn-primary">
              sign in
            </a>
          </div>

          <section id="features" className="mt-5">
            <h2 className="text-center mb-4">Features</h2>
            <div className="row">
              <div className="col-md-4">
                <div className="card mb-4 shadow-sm">
                  <img
                    src="https://via.placeholder.com/150"
                    className="card-img-top"
                    alt="Feature 1"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Feature 1</h5>
                    <p className="card-text">Description of feature 1.</p>
                    <a href="#" className="btn btn-primary">
                      Learn more
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4 shadow-sm">
                  <img
                    src="https://via.placeholder.com/150"
                    className="card-img-top"
                    alt="Feature 2"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Feature 2</h5>
                    <p className="card-text">Description of feature 2.</p>
                    <a href="#" className="btn btn-primary">
                      Learn more
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4 shadow-sm">
                  <img
                    src="https://via.placeholder.com/150"
                    className="card-img-top"
                    alt="Feature 3"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Feature 3</h5>
                    <p className="card-text">Description of feature 3.</p>
                    <a href="#" className="btn btn-primary">
                      Learn more
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Home;

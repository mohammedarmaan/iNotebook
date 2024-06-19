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
            <h1 className="display-4">Welcome to Notebook</h1>
            <p className="lead">
              Notebook lets users keep notes in a secure place
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

          
        </div>
      )}
    </>
  );
};

export default Home;

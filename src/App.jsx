import {
  BrowserRouter as BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState.jsx";
import Alert from "./components/Alert.jsx";
import Signin from "./components/Signin.jsx";
import Signup from "./components/Signup.jsx";


function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          
          <Alert message="Hey there" />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;

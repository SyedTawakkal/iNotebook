import React, { useState } from "react";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./components/About";
import NoteState from "./context/notes/noteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar title="iNotebook" showAlert={showAlert} />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route
                exact
                path="/"
                element={<Home showAlert={showAlert} />}
              ></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route
                exact
                path="/login"
                element={<Login showAlert={showAlert} />}
              ></Route>
              <Route
                exact
                path="/signup"
                element={<Signup showAlert={showAlert} />}
              ></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;


import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./SignIn";
import Register from "./Register";
import Reset from "./Reset";
import Application from "./Application";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element={<Application />} />
        </Routes>
      </Router>
    </div>
  
  );
}
export default App;
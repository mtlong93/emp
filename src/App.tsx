import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserList } from "./components/UserList";
import { Test } from "./components/Test";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<UserList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

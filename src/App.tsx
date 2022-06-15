import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import { UserList } from "./components/UserList";
import { Wellcome } from "./components/Wellcome";
import { Login } from "./components/Login";
import { Button } from "@progress/kendo-react-buttons";

function App() {
  return (
    <div className="App">
      <nav>
      
      </nav>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Wellcome />} />
          <Route path="login" element={<Login />} />
          <Route path="admin" element={<UserList />} />
        </Routes>        
      </BrowserRouter>
    </div>
  );
}

export default App;

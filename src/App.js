import "./App.css";
import "./reportWebVitals";
import React, { useState, useEffect } from "react";
import PrimeTable from "./components/Table/PrimeTable";
import LoginComponent from "./Layouts/Login/LoginComponent";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./Layouts/Dashboard/Welcome";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  console.log("app", loggedInUser);

  
  const handleLoginSuccess = (loginData) => {
    setLoggedInUser(loginData);
    // Navigate to prime-table on successful login (using history API)
    if (loginData.status == true) {
      console.log("status", loginData.status);
      const history = window.history;
      history.pushState({}, "", "/prime-table"); // Update URL and state
      window.location.reload();
    }
  };
  
  

  return (
    <div className="App">
      <BrowserRouter basename="/SME-Review">
        <Routes>
        <Route
            path="/"
            element={<LoginComponent onLoginSuccess={handleLoginSuccess} />}
          />
          <Route path="/prime-table" element={<PrimeTable />} />
          <Route path="/dashboard" element={<Welcome />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

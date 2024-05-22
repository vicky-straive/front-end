import "./App.css";
import "./reportWebVitals";
import React, { useState, useEffect } from "react";
import PrimeTable from "./components/Table/PrimeTable";
import LoginComponent from "./Layouts/Login/LoginComponent";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./Layouts/Dashboard/Welcome";
import DetailsPanel from "./components/Panel/DetailsPanel"

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/SME-Review">
        <Routes>
          <Route path="/" element={<LoginComponent />} />
          <Route
            path="/job_review"
            element={
              <>
                <NavBar />
                <DetailsPanel/>
                <PrimeTable />
              </>
            }
          />
          <Route
            path="/job_details"
            element={
              <>
                <NavBar />
                <Welcome />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

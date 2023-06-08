import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import './App.css';
import AppRoutes from "./routes-nav/Routes";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="*" element={<AppRoutes />}></Route>
        <Route path="*" element={<Navigate to="/" replace />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

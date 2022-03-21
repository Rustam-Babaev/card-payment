import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Payment from "../Payment/Payment";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Payment />} />
      </Routes>
    </div>
  );
}

export default App;

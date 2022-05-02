import React from "react";
import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";
import Login from "../views/login/Login";
import Sandbox from "../views/sandbox/Sandbox";
import Sandbox2 from "../views/sandbox/Sandbox2";

export default function IndexRouter() {
  return (
    <BrowserRouter>
      <Routes>
      {/* <Route index element={<Sandbox />} /> */}
        <Route path="login" element={<Login />} />
        <Route
          path="*"
          element={
            localStorage.getItem("token") ? (
              <Sandbox />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

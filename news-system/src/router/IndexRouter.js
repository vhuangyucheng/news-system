import React,{useEffect} from "react";
import { BrowserRouter, Route, Routes, Link, Navigate} from "react-router-dom";
import Login from "../views/login/Login";
import Sandbox from "../views/sandbox/Sandbox";
import Child from "../Child";

export default function IndexRouter() {
  useEffect(() => {
    console.log("token",localStorage.getItem("token"))
  }, []);
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
            // <Sandbox />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App"
import PrivateRoute from "./PrivateRoute";
import Login from "./routes/Login";
import Matches from "./routes/Matches";
import Profile from "./routes/Profile";
import Register from "./routes/Register";

render(
  <BrowserRouter>
    <div className="flex flex-col h-screen">
      {/* Main Content */}
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <App />
            </PrivateRoute>
          }
        />
        <Route
          path="profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="matches"
          element={
            <PrivateRoute>
              <Matches />
            </PrivateRoute>
          }
        />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);

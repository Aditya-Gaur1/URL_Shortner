import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "../pages/Homepage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}

        <Route path="/" element={<Homepage />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* PROTECTED ROUTES */}

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

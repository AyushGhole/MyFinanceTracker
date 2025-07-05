// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        transition={Slide}
        theme="colored"
        toastClassName={() =>
          "backdrop-blur-md bg-white/30 p-3 rounded-lg border border-white/20 text-white shadow-lg"
        }
      />

      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </>
  );
}

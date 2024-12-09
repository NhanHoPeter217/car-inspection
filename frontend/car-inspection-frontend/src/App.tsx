import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CarList from "./components/CarList";
import CriteriaForm from "./components/CriteriaForm";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-gray-100 p-5">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Car Inspection</h1>
            <CarList />
          </div>
        } />
        <Route path="/:carId" element={<CriteriaForm />} />
      </Routes>
    </Router>
  );
};

export default App;

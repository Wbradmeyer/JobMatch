import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SeekerRegister from "./components/SeekerRegister";
import CompanyRegister from "./components/CompanyRegister";
import CompanyDashboard from "./components/CompanyDashboard";
import JobCreate from "./components/JobCreate";

function App() {
  return (
    <div>
      <h1>Job Match</h1>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/seekerRegister" element={<SeekerRegister />} />
        <Route path="/companyRegister" element={<CompanyRegister />} />
        <Route path="/company/dashboard" element={<CompanyDashboard />} />
        <Route path="/jobs/create" element={<JobCreate />} />
      </Routes>
    </div>
  );
}

export default App;

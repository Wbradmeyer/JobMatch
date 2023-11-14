import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SeekerRegister from "./components/SeekerRegister";
import CompanyRegister from "./components/CompanyRegister";
import CompanyDashboard from "./components/CompanyDashboard";
import JobCreate from "./components/JobCreate";
import SeekerDashboard from "./components/SeekerDashboard";
import JobView from "./components/JobView";
import JobUpdate from "./components/JobUpdate";

function App() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Job Match</h1>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/seekerRegister" element={<SeekerRegister />} />
        <Route path="/companyRegister" element={<CompanyRegister />} />
        <Route path="/company/dashboard" element={<CompanyDashboard />} />
        <Route path="/seeker/dashboard" element={<SeekerDashboard />} />
        <Route path="/jobs/create" element={<JobCreate />} />
        <Route path="/jobs/display/:id" element={<JobView />} />
        <Route path="/jobs/update/:id" element={<JobUpdate />} />
      </Routes>
    </div>
  );
}

export default App;

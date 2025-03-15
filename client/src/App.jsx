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
import Logo from "./assets/jobMatchLogo.png";

function App() {
  return (
    <div>
      <img src={Logo} alt="Job Match Logo" className="w-1/4 mt-20 ml-20" />
      <Routes>
        <Route index element={<Home />} />
        {/* <Route path="/seekerRegister" element={<SeekerRegister />} /> */}
        <Route path="/seekers/register" element={<SeekerRegister />} />
        {/* <Route path="/companyRegister" element={<CompanyRegister />} /> */}
        <Route path="/companies/register" element={<CompanyRegister />} />
        <Route path="/companies/dashboard" element={<CompanyDashboard />} />
        <Route path="/seekers/dashboard" element={<SeekerDashboard />} />
        <Route path="/jobs/create" element={<JobCreate />} />
        <Route path="/jobs/display/:id" element={<JobView />} />
        <Route path="/jobs/update/:id" element={<JobUpdate />} />
      </Routes>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const [allCompanyJobs, setAllCompanyJobs] = useState([]);

  useEffect(() => {
    axios.get("").then((res) => {
      console.log(res);
      setAllCompanyJobs(res.data);
    });
  }, []);

  return (
    <div>
      {/* nav bar */}
      <div>
        <h1>Company Name</h1>
        <button>
          <Link to={"/company/logout"}>Logout</Link>
        </button>
      </div>
      {/* company profile card/on the left */}
      <div>
        <h2>logo</h2>
        <p>Description</p>
      </div>
      {/* show job postings */}
      <div>
        <button>
          <Link to={"/jobs/new"}>Post a New Job</Link>
        </button>
        <table>
          <thead>
            <tr>
              <th>Jobs Posted</th>
              <th># Interested</th>
              <th>Filled</th>
            </tr>
          </thead>
          {/* map all job posts from this company into new row*/}
          <tbody>
            <tr>Backend Dev</tr>
            <tr>40</tr>
            <tr>check</tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyDashboard;

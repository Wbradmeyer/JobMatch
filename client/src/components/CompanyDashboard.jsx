import React, { useEffect, useState, useContext } from "react";
import { userContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const CompanyDashboard = () => {
  const { currentUser, setCurrentUser } = useContext(userContext);
  const navigate = useNavigate();
  const [allCompanyJobs, setAllCompanyJobs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/jobs")
      .then((res) => {
        // console.log(res);
        setAllCompanyJobs(
          // res.data
          res.data.filter((job) => job.companyId == currentUser._id)
        );
      })
      .catch((err) => console.log(err));
  }, [allCompanyJobs]);

  const logoutUser = () => {
    axios
      .post(
        "http://localhost:8000/company/logout",
        {},
        { withCredentials: true }
      )
      .then((res) => {
        navigate("/");
        localStorage.clear("currentUser");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {/* nav bar */}
      <div>
        <h1>{currentUser.name}</h1>
        <button onClick={logoutUser}>Logout</button>
      </div>
      {/* company profile card/on the left */}
      <div>
        <h2>logo</h2>
        <p>{currentUser.aboutUs}</p>
      </div>
      {/* show job postings */}
      <div>
        <button>
          <Link to={"/jobs/create"}>Post a New Job</Link>
        </button>
        <table>
          <thead>
            <tr>
              <th>Jobs Posted</th>
              <th># Interested</th>
              <th>Filled</th>
            </tr>
          </thead>
          <tbody>
            {allCompanyJobs.map((thisJob) => (
              <tr key={thisJob._id}>
                <td>
                  <Link to={`/jobs/display/${thisJob._id}`}>
                    {thisJob.jobTitle}
                  </Link>
                </td>
                <td>40</td>
                <td>check</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyDashboard;

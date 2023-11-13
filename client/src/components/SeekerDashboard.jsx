import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../context/UserContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SeekerDashboard = () => {
  const { currentUser, setCurrentUser } = useContext(userContext);
  const [allJobs, setAllJobs] = useState([]);
  const [allCompanies, setAllCompanies] = useState([]);
  const navigate = useNavigate();
  const [filteredJobs, setFilteredJobs] = useState([]);
  // const { id } = useParams()

  // Create a logout component to import all needed pages
  const logoutUser = () => {
    axios
      .post(
        "http://localhost:8000/seeker/logout",
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

  // useEffect with axios call to get all jobs: setJobs
  useEffect(() => {
    axios
      .get("http://localhost:8000/jobs")
      .then((res) => {
        console.log(res.data);
        setAllJobs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // useEffect with axios call to get all companies: setCompanies
  useEffect(() => {
    axios
      .get("http://localhost:8000/companies")
      .then((res) => {
        console.log(res.data);
        setAllCompanies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // useEffect(() => {
  //   if (allJobs) {
  //     const filtered = allJobs.filter((job) => {
  //       return (
  //         currentUser.languages.includes(job.languages) &&
  //         currentUser.frameworks.includes(job.frameworks)
  //       );
  //     });
  //     setFilteredJobs(filtered);
  //   }
  // }, []);

  // const handleInterestedJobsButton = (e) => {

  // }

  return (
    <div>
      <Link to={"/"} onClick={logoutUser}>
        Logout
      </Link>
      <h2>{currentUser.name}'s Dashboard</h2>
      <div>
        <div>
          <p>Skills/Experience:</p>
          {currentUser.languages.map((language, index) => {
            return <p key={index}>{language}</p>;
          })}
          {currentUser.frameworks.map((framework, index) => {
            return <p key={index}>{framework}</p>;
          })}
        </div>
        <div>
          <p>Bio:</p>
          <p>{currentUser.bio}</p>
        </div>
      </div>
      <div>
        {/* Add filter button for interested jobs here */}
        <table>
          <thead>
            <tr>
              <th>Jobs Available</th>
              <th>Company</th>
              <th>Interested</th>
            </tr>
          </thead>
          <tbody>
            {allJobs.map((job, index) => {
              const associatedCompany = allCompanies.find(
                (company) => company._id == job.companyId
              );
              return (
                <tr key={index}>
                  {/* Display each job */}
                  {<Link to={`/jobs/display/${job._id}`}>{job.jobTitle}</Link>}
                  {/* <td>{job.jobTitle}</td> */}
                  {/* For Company: If job.company._id == company._id display company.name */}
                  <td>{associatedCompany ? associatedCompany.name : "N/A"}</td>
                  <td>
                    <input type="checkbox" name="interested" id="interested" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SeekerDashboard;

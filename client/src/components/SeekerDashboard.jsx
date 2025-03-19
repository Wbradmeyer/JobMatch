import React, { useContext, useEffect, useState, useMemo } from "react";
import { userContext } from "../context/UserContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SeekerDashboard = () => {
  console.log("Test");
  const { currentUser, setCurrentUser } = useContext(userContext);
  const [allJobs, setAllJobs] = useState([]);
  const [allCompanies, setAllCompanies] = useState([]);
  const combinedUserSkills = useMemo(() => {
    return (currentUser.languages || []).concat(currentUser.frameworks || []);
  }, [currentUser]);
  const navigate = useNavigate();
  console.log(currentUser);
  // const [interestedJobs, setInterestedJobs] = useState([]);
  // const [filteredJobs, setFilteredJobs] = useState([]);
  // const { id } = useParams()

  // Create a logout component to import all needed pages
  const logoutUser = () => {
    axios
      .post(
        "http://localhost:8000/seekers/logout",
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

        let jobs = res.data.map((job, index) => {
          const combinedJobSkills = job.languages.concat(job.frameworks);
          let count = combinedJobSkills.filter((skill) =>
            combinedUserSkills.includes(skill)
          ).length;
          const percentage =
            combinedJobSkills.length !== 0
              ? Math.ceil((count / combinedJobSkills.length) * 100)
              : 0;
          return { ...job, matchPercentage: percentage };
        });

        // Sort jobs by match percentage in descending order
        jobs.sort((a, b) => b.matchPercentage - a.matchPercentage);

        setAllJobs(jobs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [combinedUserSkills]);

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

  return (
    <div className="ml-10">
      <div className="flex justify-end w-1/2 mx-auto">
        <Link
          to={"/"}
          onClick={logoutUser}
          className="font-medium text-xl text-blue-600 dark:text-blue-500 hover:underline py-2 px-2 bg-slate-400 rounded-lg"
        >
          Logout
        </Link>
      </div>
      {/* put a transparent background behind this */}
      <div className="flex justify-around w-1/2 mx-auto my-5 py-5 bg-white/60 rounded-lg">
        <div>
          <h2 className="text-4xl font-bold sub my-3">{currentUser.name}</h2>
          <div>
            <p className="text-xl font-medium">Bio:</p>
            <p>{currentUser.bio}</p>
          </div>
          <div>
            <p className="text-xl font-medium mt-3">Location:</p>
            <p>{currentUser.location}</p>
          </div>
        </div>
        <div>
          <p className="text-xl font-medium mt-16">Skills/Experience:</p>
          <div className="flex justify-start">
            <div className="w-1/2">
              {currentUser.languages.map((language, index) => {
                return <p key={index}>{language}</p>;
              })}
            </div>
            <div className="w-1/2">
              {currentUser.frameworks.map((framework, index) => {
                return <p key={index}>{framework}</p>;
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="relative overflow-x-auto flex justify-center">
        {/* Add filter button for interested jobs here */}
        <table className="w-1/2 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Jobs Available</th>
              <th className="px-6 py-3">Company</th>
              <th className="px-6 py-3">Percent Match</th>
            </tr>
          </thead>
          <tbody>
            {allJobs.map((job, index) => {
              const associatedCompany = allCompanies.find(
                (company) => company._id == job.companyId
              );
              return (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  {/* Display each job */}
                  <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {
                      <Link to={`/jobs/display/${job._id}`}>
                        {job.jobTitle}
                      </Link>
                    }
                  </th>
                  {/* For Company: If job.company._id == company._id display company.name */}
                  <td className="px-6 py-4">
                    {associatedCompany ? associatedCompany.name : "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    {job.matchPercentage}
                    {/* <input type="checkbox" name="interested" id="interested" /> */}
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

import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../context/UserContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SeekerDashboard = () => {
  const { currentUser, setCurrentUser } = useContext(userContext);
  const [allJobs, setAllJobs] = useState([]);
  const [allCompanies, setAllCompanies] = useState([]);
  const combinedUserSkills = (currentUser.languages || []).concat(
    currentUser.frameworks || []
  );
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  console.log(currentUser)
  // const [interestedJobs, setInterestedJobs] = useState([]);
  // const [filteredJobs, setFilteredJobs] = useState([]);
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

        let percents = [];
        for (let i = 0; i < res.data.length; i++) {
          const combinedJobSkills = res.data[i].languages.concat(
            res.data[i].frameworks
          );
          let count = 0;
          for (let j = 0; j < combinedJobSkills.length; j++) {
            if (combinedUserSkills.includes(combinedJobSkills[j])) {
              count++;
            }
          }
          percents.push(
            `${Math.ceil((count / combinedJobSkills.length) * 100)}%`
          );
        }
        setMatches(percents);
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
    <div className="ml-10">
      <div className="flex justify-end w-3/4 mx-auto">
        <Link
          to={"/"}
          onClick={logoutUser}
          className="font-medium text-xl text-blue-600 dark:text-blue-500 hover:underline"
        >
          Logout
        </Link>
      </div>
      <div className="flex justify-around w-3/4 mx-auto my-10">
        <div>
          <h2 className="text-4xl font-bold sub">{currentUser.name}</h2>
          <div>
            <p className="text-xl font-medium">Bio:</p>
            <p>{currentUser.bio}</p>
          </div>
          <div>
            <p className="text-xl font-medium">Location:</p>
            <p>{currentUser.location}</p>
          </div>
        </div>
        <div>
          <p className="text-xl font-medium">Skills/Experience:</p>
          <div className="flex justify-evenly">
            <div>
              {currentUser.languages.map((language, index) => {
                return (
                  <p className="mt-5" key={index}>
                    {language}
                  </p>
                );
              })}
            </div>
            <div>
              {currentUser.frameworks.map((framework, index) => {
                return (
                  <p className="mt-5" key={index}>
                    {framework}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="relative overflow-x-auto flex justify-center">
        {/* Add filter button for interested jobs here */}
        <table className="w-3/4 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                  {/* <td>{job.jobTitle}</td> */}
                  {/* For Company: If job.company._id == company._id display company.name */}
                  <td className="px-6 py-4">
                    {associatedCompany ? associatedCompany.name : "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    {matches[index]}
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

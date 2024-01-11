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
    <div className="ml-10">
      {/* nav bar */}
      <div className="flex justify-end w-1/2 mx-auto">
        <Link
          to={"/"}
          onClick={logoutUser}
          className="font-medium text-xl text-blue-600 dark:text-blue-500 hover:underline py-2 px-2 bg-slate-400 rounded-lg"
        >
          Logout
        </Link>
      </div>
      {/* company profile card/on the left */}
      <div className="flex justify-center w-1/2 mx-auto my-5">
        <div className="px-5 py-5 bg-white/60 py-1 rounded-lg">
          <div>
            <h2 className="text-4xl font-bold sub">{currentUser.name}</h2>
          </div>
          <div className="flex gap-36 mt-10">
            <div className="w-1/2">
              <p className="text-xl font-medium">About Us:</p>
              <p>{currentUser.aboutUs}</p>
            </div>
            <div>
              <p className="text-xl font-medium">Location:</p>
              <p>{currentUser.location}</p>
            </div>
          </div>
        </div>
      </div>
      {/* show job postings */}
      <div>
        <div className="relative overflow-x-auto flex justify-end w-1/2 mx-auto">
          <Link
            to={"/jobs/create"}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            + Post a New Job
          </Link>
        </div>
        <div className="relative overflow-x-auto flex justify-center">
          <table className="w-1/2 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Jobs Posted</th>
                <th className="px-6 py-3">Description</th>
              </tr>
            </thead>
            <tbody>
              {allCompanyJobs.map((thisJob) => (
                <tr
                  key={thisJob._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">
                    <Link to={`/jobs/display/${thisJob._id}`}>
                      {thisJob.jobTitle}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <p>{thisJob.description}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;

import React from "react";
import { useEffect, useState, useContext, useMemo } from "react";
import { userContext } from "../context/UserContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

const JobView = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(userContext);
  const { id } = useParams();
  const [thisJob, setThisJob] = useState({});
  const combinedJobSkills = useMemo(() => {
    return (thisJob.languages || []).concat(thisJob.frameworks || []);
  }, [thisJob]);
  const [allSeekers, setAllSeekers] = useState([]);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/jobs/${id}`)
      .then((res) => {
        console.log(res);
        setThisJob(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/seekers")
      .then((res) => {
        console.log(res.data);

        let seekers = res.data.map((seeker, index) => {
          const combinedUserSkills = seeker.languages.concat(seeker.frameworks);
          let count = combinedUserSkills.filter((skill) =>
            combinedJobSkills.includes(skill)
          ).length;
          const percentage =
            combinedJobSkills.length !== 0
              ? Math.ceil((count / combinedJobSkills.length) * 100)
              : 0;
          return { ...seeker, matchPercentage: percentage };
        });

        seekers.sort((a, b) => b.matchPercentage - a.matchPercentage);

        setAllSeekers(seekers);
      })
      .catch((err) => console.log(err));
  }, [combinedJobSkills]);

  const handleDelete = (e, id) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:8000/jobs/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    navigate("/companies/dashboard");
  };

  return (
    <div className="ml-10 my-4">
      <div>
        <div className="w-1/2 mx-auto px-10 bg-white/60 py-1 rounded-lg">
          <div className="flex justify-start mx-auto my-5">
            <h1 className="text-4xl font-bold sub">{thisJob.jobTitle}</h1>
          </div>
          <div className="flex justify-start mx-auto my-5">
            <div className="w-1/2 mx-2">
              <p className="text-xl font-medium">Job Description:</p>
              <p>{thisJob.description}</p>
            </div>
            <div className="w-1/2 mx-2">
              <p className="text-xl font-medium">Location:</p>
              <p>{currentUser.location}</p>
            </div>
          </div>
          <div className="flex justify-start mx-auto my-5">
            <div className="w-1/2 mx-2">
              <p className="text-xl font-medium">Languages Required:</p>
              {thisJob.languages && thisJob.languages.join(", ")}
            </div>
            <div className="w-1/2 mx-2">
              <p className="text-xl font-medium">Frameworks Required:</p>
              {thisJob.frameworks && thisJob.frameworks.join(", ")}
            </div>
          </div>
        </div>
      </div>
      {thisJob.companyId == currentUser._id ? (
        <div>
          <div className="flex justify-start w-1/2 mx-auto mt-5 mb-2">
            <h3 className="text-xl font-medium">Available Talent</h3>
          </div>
          <div className="relative overflow-x-auto flex justify-center">
            <table className="w-1/2 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Percent Match</th>
                </tr>
              </thead>
              <tbody>
                {allSeekers.map((seeker, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4">{seeker.name}</td>
                    <td className="px-6 py-4">{seeker.matchPercentage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-around w-1/2 mx-auto my-5">
            <button className="my-5 font-medium text-xl text-green-600 dark:text-blue-500 hover:underline py-2 px-2 bg-slate-400 rounded-lg">
              <Link to={`/jobs/update/${id}`}>Edit Job Post</Link>
            </button>
            <button
              onClick={(e) => handleDelete(e, thisJob._id)}
              className="my-5 font-medium text-xl text-red-600 dark:text-red-500 hover:underline py-2 px-2 bg-slate-400 rounded-lg"
            >
              Delete Job
            </button>
            <button className="my-5 font-medium text-xl text-blue-600 dark:text-blue-500 hover:underline py-2 px-2 bg-slate-400 rounded-lg">
              <Link to={"/companies/dashboard"}>Back to Dashboard</Link>
            </button>
          </div>
        </div>
      ) : (
        <button className="ml-60 flex justify-start my-5 font-medium text-xl text-blue-600 dark:text-blue-500 hover:underline py-2 px-2 bg-slate-400 rounded-lg">
          <Link to={"/seekers/dashboard"}>Back to Dashboard</Link>
        </button>
      )}
    </div>
  );
};

export default JobView;

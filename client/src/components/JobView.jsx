import React from "react";
import { useEffect, useState, useContext } from "react";
import { userContext } from "../context/UserContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

const JobView = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(userContext);
  const { id } = useParams();
  const [thisJob, setThisJob] = useState({});
  const [combinedJobSkills, setCombinedJobSkills] = useState([]);
  const [allSeekers, setAllSeekers] = useState([]);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/jobs/${id}`)
      .then((res) => {
        console.log(res);
        setThisJob(res.data);
        setCombinedJobSkills(res.data.languages.concat(res.data.frameworks));
        // console.log(combinedJobSkills);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/seekers")
      .then((res) => {
        // console.log(res.data);
        setAllSeekers(res.data);

        let percents = [];
        for (let i = 0; i < res.data.length; i++) {
          const combinedUserSkills = res.data[i].languages.concat(
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
      .catch((err) => console.log(err));
  }, [combinedJobSkills, allSeekers]);

  const handleDelete = (e, id) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:8000/jobs/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    navigate("/company/dashboard");
  };

  return (
    <div className="ml-10 my-4">
      <div>
        <div className="w-3/4 mx-auto px-10 bg-white/60 py-1 rounded-lg">
          <div className="flex justify-start mx-auto my-5">
            <h1 className="text-4xl font-bold sub">{thisJob.jobTitle}</h1>
          </div>
          <div className="flex justify-start mx-auto my-5">
            <div className="w-1/2">
              <p className="text-xl font-medium">Job Description:</p>
              <p>{thisJob.description}</p>
            </div>
            <div>
              <p className="text-xl font-medium">Location:</p>
              <p>{currentUser.location}</p>
            </div>
          </div>
          <div className="flex justify-start mx-auto my-5">
            <div className="w-1/2">
              <p className="text-xl font-medium">Languages Required:</p>
              {thisJob.languages && thisJob.languages.join(", ")}
            </div>
            <div className="w-1/2">
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
                    <td className="px-6 py-4">{matches[index]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-around w-1/2 mx-auto my-5">
            <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
              <Link to={`/jobs/update/${id}`}>Edit Job Post</Link>
            </button>
            <button
              onClick={(e) => handleDelete(e, thisJob._id)}
              className="font-medium text-red-600 dark:text-red-500 hover:underline"
            >
              Delete Job
            </button>
            <button className="border-2 border-black rounded-xl px-2 py-2 bg-amber-200">
              <Link to={"/company/dashboard"}>Back to Dashboard</Link>
            </button>
          </div>
        </div>
      ) : (
        <button className="flex justify-start my-5 font-medium text-xl text-blue-600 dark:text-blue-500 hover:underline py-2 px-2 bg-slate-400 rounded-lg">
          <Link to={"/seeker/dashboard"}>Back to Dashboard</Link>
        </button>
      )}
    </div>
  );
};

export default JobView;

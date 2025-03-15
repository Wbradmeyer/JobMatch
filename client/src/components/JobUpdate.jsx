import { React, useEffect, useState, useContext } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import { userContext } from "../context/UserContext";

const JobUpdate = () => {
  const { currentUser, setCurrentUser } = useContext(userContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [checkedLanguages, setCheckedLanguages] = useState([]);
  const [checkedFrameworks, setCheckedFrameworks] = useState([]);
  const [job, setJob] = useState({
    jobTitle: "",
    description: "",
    languages: [],
    frameworks: [],
    companyId: currentUser._id,
  });
  const [error, setError] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8000/jobs/${id}`)
      .then((res) => {
        console.log(res);
        setJob(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleVals = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
    // console.log(job);
  };

  const handleLanguagesCheckedBoxes = (e) => {
    if (e.target.checked) {
      setCheckedLanguages((prevLanguages) => [
        ...prevLanguages,
        e.target.value,
      ]);
      setJob((prevJob) => ({
        ...prevJob,
        languages: [...prevJob.languages, e.target.value],
      }));
    } else {
      setCheckedLanguages((prevLanguages) =>
        prevLanguages.filter((lang) => lang !== e.target.value)
      );
      setJob((prevJob) => ({
        ...prevJob,
        languages: prevJob.languages.filter((lang) => lang !== e.target.value),
      }));
    }
  };

  const handleFrameworksCheckedBoxes = (e) => {
    if (e.target.checked) {
      setCheckedFrameworks((prevFrameworks) => [
        ...prevFrameworks,
        e.target.value,
      ]);
      setJob((prevJob) => ({
        ...prevJob,
        frameworks: [...prevJob.frameworks, e.target.value],
      }));
    } else {
      setCheckedFrameworks((prevFrameworks) =>
        prevFrameworks.filter((framework) => framework !== e.target.value)
      );
      setJob((prevJob) => ({
        ...prevJob,
        frameworks: prevJob.frameworks.filter(
          (framework) => framework !== e.target.value
        ),
      }));
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:8000/jobs/${id}`, job)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        navigate("/companies/dashboard");
      })
      .catch((err) => {
        console.log(err.response.data.error.errors);
        setError(err.response.data.error.errors);
      });
  };

  return (
    <div className="ml-10">
      <div className="flex items-center my-4">
        <h1 className="mb-2 mt-0 text-5xl font-medium leading-tight">
          Edit This Job
        </h1>
        <div className="flex justify-end w-1/4">
          <p className="text-sm font-medium text-gray-900">
            <Link
              to={"/companies/dashboard"}
              className="my-5 font-medium text-xl text-blue-600 dark:text-blue-500 hover:underline py-2 px-2 bg-slate-400 rounded-lg"
            >
              Back to Dashboard
            </Link>
          </p>
        </div>
      </div>
      <div className="w-1/2 bg-white/80 rounded-lg px-10 py-5">
        <form onSubmit={onSubmitHandler}>
          <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <p className="text-xl font-medium">Job Title</p>
          </label>
          {error.jobTitle ? <p>{error.jobTitle.message}</p> : null}
          <input
            type="text"
            name="jobTitle"
            className="border border-black text-sm rounded-lg w-full focus:border-blue-500 block p-2.5"
            value={job.jobTitle}
            onChange={handleVals}
          />
          {/* if lang and frame in job, make checked to start */}
          <div className="mt-5">
            <p className="text-xl font-medium">Select Languages Required</p>
            <input
              type="checkbox"
              name="Java"
              value="Java"
              className="mx-1"
              onChange={handleLanguagesCheckedBoxes}
              checked={job.languages.includes("Java")}
            />
            <label className="mr-5">Java</label>
            <input
              type="checkbox"
              name="javascript"
              value="JavaScript"
              className="mx-1"
              onChange={handleLanguagesCheckedBoxes}
              checked={job.languages.includes("JavaScript")}
            />
            <label className="mr-5">JavaScript</label>
            <input
              type="checkbox"
              name="python"
              value="Python"
              className="mx-1"
              onChange={handleLanguagesCheckedBoxes}
              checked={job.languages.includes("Python")}
            />
            <label className="mr-5">Python</label>
            <input
              type="checkbox"
              name="typeScript"
              value="TypeScript"
              className="mx-1"
              onChange={handleLanguagesCheckedBoxes}
              checked={job.languages.includes("TypeScript")}
            />
            <label className="mr-5">TypeScript</label>
          </div>
          <div className="mt-5">
            <p className="text-xl font-medium">Select Frameworks Required</p>
            <input
              type="checkbox"
              name="flask"
              value="Flask"
              className="mx-1"
              onChange={handleFrameworksCheckedBoxes}
              checked={job.frameworks.includes("Flask")}
            />
            <label className="mr-5">Flask</label>
            <input
              type="checkbox"
              name="django"
              value="Django"
              className="mx-1"
              onChange={handleFrameworksCheckedBoxes}
              checked={job.frameworks.includes("Django")}
            />
            <label className="mr-5">Django</label>
            <input
              type="checkbox"
              name="springBoot"
              value="SpringBoot"
              className="mx-1"
              onChange={handleFrameworksCheckedBoxes}
              checked={job.frameworks.includes("SpringBoot")}
            />
            <label className="mr-5">Spring Boot</label>
            <input
              type="checkbox"
              name="react"
              value="React"
              className="mx-1"
              onChange={handleFrameworksCheckedBoxes}
              checked={job.frameworks.includes("React")}
            />
            <label className="mr-5">React</label>
          </div>
          <div className="mt-5">
            <label className="text-xl font-medium">Description</label>
            {error.description ? <p>{error.description.message}</p> : null}
            <textarea
              type="text"
              name="description"
              rows="5"
              className="border border-black text-sm rounded-lg focus:border-blue-500 block w-full p-2.5"
              value={job.description}
              onChange={handleVals}
            />
            <input type="hidden" name="companyId" value={currentUser._id} />
            <button
              type="submit"
              className="mt-5 bg-sky-300 hover:bg-sky-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Update This Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobUpdate;

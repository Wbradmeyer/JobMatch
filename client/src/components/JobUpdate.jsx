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
        navigate("/company/dashboard");
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
        <div className="flex justify-end w-1/2 mx-auto">
          <p className="text-sm font-medium text-gray-900">
            <Link
              to={"/company/dashboard"}
              className="my-5 font-medium text-xl text-blue-600 dark:text-blue-500 hover:underline py-2 px-2 bg-slate-400 rounded-lg"
            >
              Back to Dashboard
            </Link>
          </p>
        </div>
      </div>
      <div>
        <form onSubmit={onSubmitHandler}>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <p className="text-xl font-medium">Job Title</p>
          </label>
          {error.jobTitle ? <p>{error.jobTitle.message}</p> : null}
          <input
            type="text"
            name="jobTitle"
            className="border border-black text-sm rounded-lg  focus:border-blue-500 block w-full w-auto p-2.5"
            value={job.jobTitle}
            onChange={handleVals}
          />
          {/* if lang and frame in job, make checked to start */}
          <div className="flex gap-4 mt-10">
            <p className="text-xl font-medium">Select Languages Required</p>
            <input
              type="checkbox"
              name="Java"
              value="Java"
              onChange={handleLanguagesCheckedBoxes}
              checked={job.languages.includes("Java")}
            />
            <label>Java</label>
            <input
              type="checkbox"
              name="javascript"
              value="JavaScript"
              onChange={handleLanguagesCheckedBoxes}
              checked={job.languages.includes("JavaScript")}
            />
            <label>JavaScript</label>
            <input
              type="checkbox"
              name="python"
              value="Python"
              onChange={handleLanguagesCheckedBoxes}
              checked={job.languages.includes("Python")}
            />
            <label>Python</label>
            <input
              type="checkbox"
              name="typeScript"
              value="TypeScript"
              onChange={handleLanguagesCheckedBoxes}
              checked={job.languages.includes("TypeScript")}
            />
            <label>TypeScript</label>
          </div>
          <div className="flex gap-4 mt-10">
            <p className="text-xl font-medium">Select Frameworks Required</p>
            <input
              type="checkbox"
              name="flask"
              value="Flask"
              onChange={handleFrameworksCheckedBoxes}
              checked={job.frameworks.includes("Flask")}
            />
            <label>Flask</label>
            <input
              type="checkbox"
              name="django"
              value="Django"
              onChange={handleFrameworksCheckedBoxes}
              checked={job.frameworks.includes("Django")}
            />
            <label>Django</label>
            <input
              type="checkbox"
              name="springBoot"
              value="SpringBoot"
              onChange={handleFrameworksCheckedBoxes}
              checked={job.frameworks.includes("SpringBoot")}
            />
            <label>Spring Boot</label>
            <input
              type="checkbox"
              name="react"
              value="React"
              onChange={handleFrameworksCheckedBoxes}
              checked={job.frameworks.includes("React")}
            />
            <label>React</label>
          </div>
          <div className="flex gap-4 mt-10">
            <label className="text-xl font-medium">Description</label>
            {error.description ? <p>{error.description.message}</p> : null}
            <textarea
              type="text"
              name="description"
              cols="65"
              rows="5"
              className="border border-black text-sm rounded-lg  focus:border-blue-500 block w-full w-auto p-2.5"
              value={job.description}
              onChange={handleVals}
            />
            <input type="hidden" name="companyId" value={currentUser._id} />
            <button
              type="submit"
              className="rounded bg-neutral-800 px-6 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
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

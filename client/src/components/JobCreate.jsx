import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { userContext } from "../context/UserContext";

const JobCreate = () => {
  const { currentUser, setCurrentUser } = useContext(userContext);
  const navigate = useNavigate();
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
      .post("http://localhost:8000/jobs/new", job)
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
      {/* nav-bar */}      
        <h1 className="mb-2 mt-0 text-5xl font-medium leading-tight">Post a New Job</h1>
        <div className="flex justify-end w-3/4 mx-auto">
        <p className="text-sm font-medium  text-gray-900">
          <Link to={"/company/dashboard"}   className="inline-block rounded-full border-2 border-neutral-800 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-neutral-800 transition duration-150 ease-in-out hover:border-neutral-800 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-800 focus:border-neutral-800 focus:text-neutral-800 focus:outline-none focus:ring-0 active:border-neutral-900 active:text-neutral-900 dark:border-neutral-900 dark:text-neutral-900 dark:hover:border-neutral-900 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10 dark:hover:text-neutral-900 dark:focus:border-neutral-900 dark:focus:text-neutral-900 dark:active:border-neutral-900 dark:active:text-neutral-900">
            back to dashboard
          </Link>
        </p>&nbsp;&nbsp;
      </div>
      <div >
        <form onSubmit={onSubmitHandler}>
          <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          ><p className="text-xl font-medium">Job Title</p> </label>
          {error.jobTitle ? <p>{error.jobTitle.message}</p> : null}
          <input type="text" className="border border-black text-sm rounded-lg  focus:border-blue-500 block w-full w-auto p-2.5" name="jobTitle" onChange={handleVals} />
          <div className="flex gap-4 mt-10">
            <p className="text-xl font-medium">Select Languages Required</p>
            <input
              type="checkbox"
              name="java"
              value="java"
              onChange={handleLanguagesCheckedBoxes}
            />
            <label>Java</label>
            <input
              type="checkbox"
              name="javascript"
              value="javascript"
              onChange={handleLanguagesCheckedBoxes}
            />
            <label>JavaScript</label>
            <input
              type="checkbox"
              name="python"
              value="python"
              onChange={handleLanguagesCheckedBoxes}
            />
            <label>Python</label>
            <input
              type="checkbox"
              name="typeScript"
              value="typeScript"
              onChange={handleLanguagesCheckedBoxes}
            />
            <label>TypeScript</label>
          </div>
          <div className="flex gap-4 mt-10">
            <p className="text-xl font-medium">Select Frameworks Required</p>
            <input
              type="checkbox"
              name="flask"
              value="flask"
              onChange={handleFrameworksCheckedBoxes}
            />
            <label>Flask</label>
            <input
              type="checkbox"
              name="django"
              value="django"
              onChange={handleFrameworksCheckedBoxes}
            />
            <label>Django</label>
            <input
              type="checkbox"
              name="springBoot"
              value="springBoot"
              onChange={handleFrameworksCheckedBoxes}
            />
            <label>Spring Boot</label>
            <input
              type="checkbox"
              name="react"
              value="react"
              onChange={handleFrameworksCheckedBoxes}
            />
            <label>React</label>&nbsp;&nbsp;
          </div>
          
          <div className="flex gap-4 mt-10">
            <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> <p className="text-xl font-medium">Description </p></label>
            {error.description ? <p>{error.description.message}</p> : null}
            <textarea
              type="text"
              name="description"
              cols="65"
              rows="5"
              className="border border-black text-sm rounded-lg  focus:border-blue-500 block w-full w-auto p-2.5"
              onChange={handleVals}
            />

            <input type="hidden" name="companyId" value={currentUser._id} />
            <button type="button"
                    className="rounded bg-neutral-800 px-6 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"                    
            >Post This Job</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobCreate;

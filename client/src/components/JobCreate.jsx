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
    <div>
      {/* nav-bar */}
      <div>
        <h1>Post a New Job</h1>
        <p>
          <Link to={"/company/dashboard"}>back to dashboard</Link>
        </p>
      </div>
      <div>
        <form onSubmit={onSubmitHandler}>
          <label>Job Title</label>
          {error.jobTitle ? <p>{error.jobTitle.message}</p> : null}
          <input type="text" name="jobTitle" onChange={handleVals} />

          <label>Description</label>
          {error.description ? <p>{error.description.message}</p> : null}
          <textarea
            type="text"
            name="description"
            cols="30"
            rows="10"
            onChange={handleVals}
          />
          <div>
            <p>Select Languages Required</p>
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
          <div>
            <p>Select Frameworks Required</p>
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
            <label>React</label>
          </div>
          <input type="hidden" name="companyId" value={currentUser._id} />
          <button>Post This Job</button>
        </form>
      </div>
    </div>
  );
};

export default JobCreate;

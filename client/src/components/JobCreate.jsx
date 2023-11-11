import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const JobCreate = () => {
  const navigate = useNavigate();
  // const { allJobs, setAllJobs } = props;
  const [job, setJob] = useState({
    jobTitle: "",
    description: "",
  });
  const [error, setError] = useState({});

  const handleVals = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/jobs/new", job)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        // setAllJobs([...allJobs], res.data);
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
            <input type="checkbox" name="java" value={java} />
            <label>Java</label>
            <input type="checkbox" name="javascript" value={javascript} />
            <label>Java</label>
            <input type="checkbox" name="python" value={python} />
            <label>Java</label>
            <input type="checkbox" name="typeScript" value={typeScript} />
            <label>Java</label>
          </div>
          <div>
            <p>Select Frameworks Required</p>
            <input type="checkbox" name="flask" value={flask} />
            <label>Java</label>
            <input type="checkbox" name="django" value={django} />
            <label>Java</label>
            <input type="checkbox" name="springBoot" value={springBoot} />
            <label>Java</label>
            <input type="checkbox" name="react" value={react} />
            <label>Java</label>
          </div>
          <button>Post This Job</button>
        </form>
      </div>
    </div>
  );
};

export default JobCreate;

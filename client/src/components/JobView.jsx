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

  useEffect(() => {
    axios
      .get(`http://localhost:8000/jobs/${id}`)
      .then((res) => {
        console.log(res);
        setThisJob(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

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
    <div>
      <div>
        <h1>{thisJob.jobTitle}</h1>
        <p>{thisJob.description}</p>
      </div>
      <div>
        <p>Languages Required</p>
        {thisJob.languages && thisJob.languages.join(", ")}
      </div>
      <div>
        <p>Frameworks Required</p>
        {thisJob.frameworks && thisJob.frameworks.join(", ")}
      </div>

      {thisJob.companyId == currentUser._id ? (
        <div>
          <button>
            <Link to={`/jobs/update/${id}`}>Edit Job Post</Link>
          </button>
          <button onClick={(e) => handleDelete(e, thisJob._id)}>
            Delete Job
          </button>
          <button>
            <Link to={"/company/dashboard"}>Back to Dashboard</Link>
          </button>
        </div>
      ) : (
        <button>
          <Link to={"/seeker/dashboard"}>Back to Dashboard</Link>
        </button>
      )}
    </div>
  );
};

export default JobView;

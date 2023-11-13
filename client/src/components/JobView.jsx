import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const JobView = () => {
  const { id } = useParams();
  const [thisJob, setThisJob] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/jobs/${id}`)
      .then((res) => {
        console.log(res);
        setThisJob(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>{thisJob.name}</h1>
      <p>{thisJob.description}</p>
      <ol>
        {thisJob.languages.map((lang) => (
          <li key={id}>{lang}</li>
        ))}
      </ol>
      <p>
        <Link to={`/jobs/update/${id}`}>Edit</Link>
      </p>
    </div>
  );
};

export default JobView;

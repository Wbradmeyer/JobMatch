import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CompanyRegister = () => {
  const navigate = useNavigate();
  const [error, setError] = useState({})
  const [companyUser, setCompanyUser] = useState({
    name: "",
    location: "",
    aboutUs: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegisterChange = (e) => {
    setCompanyUser({
      ...companyUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/company/register", companyUser, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        navigate("/company/dashboard");
      })
      .catch((err) => {
        console.log(err);
        // Set errors for Validations here
        setError(err.response.data.error.errors)
      });
  };

  return (
    <div>
      <h2>Register</h2>
      <div>
        <form onSubmit={handleRegisterSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleRegisterChange}
            />
            {
              error.name ? <p className='text-red-600'>{error.name.message}</p> : null
            }
          </div>
          <div>
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              name="location"
              id="location"
              onChange={handleRegisterChange}
            />
            {
              error.location ? <p className='text-red-600'>{error.location.message}</p> : null
            }
          </div>
          <div>
            <label htmlFor="aboutUs">About Us:</label>
            <textarea
              name="aboutUs"
              id="aboutUs"
              cols="30"
              rows="10"
              onChange={handleRegisterChange}
            ></textarea>
            {
              error.aboutUs ? <p className='text-red-600'>{error.aboutUs.message}</p> : null
            }
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="text" id='email' name='email' onChange={handleRegisterChange} />
            {
              error.email ? <p className='text-red-600'>{error.email.message}</p> : null
            }
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id='password' name='password' onChange={handleRegisterChange} />
            {
              error.password ? <p className='text-red-600'>{error.password.message}</p> : null
            }
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" id='confirmPassword' name='confirmPassword' onChange={handleRegisterChange} />
            {
              error.confirmPassword ? <p className='text-red-600'>{error.confirmPassword.message}</p> : null
            }
          </div>
          <button>Register</button>
        </form>
      </div>
    </div>
  );
};

export default CompanyRegister;

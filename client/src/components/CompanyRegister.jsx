import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/UserContext";

const CompanyRegister = () => {
  const { setCurrentUser } = useContext(userContext);
  const navigate = useNavigate();
  const [error, setError] = useState({});
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
      .post("http://localhost:8000/companies/register", companyUser, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        setCurrentUser(res.data);
        navigate("/companies/dashboard");
      })
      .catch((err) => {
        console.log(err);
        // Set errors for Validations here
        setError(err.response.data.error.errors);
      });
  };

  return (
    <div className="container mx-auto my-10">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4 space-y-4 md:space-y-4 sm:p-8">
          <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Register a Company
          </h2>
          <div>
            <form
              onSubmit={handleRegisterSubmit}
              className="flex justify-between space-y-4 space-x-4 md:space-y-6"
            >
              <div className="place-items-start">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name:
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    onChange={handleRegisterChange}
                    className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {error.name ? (
                    <p className="text-red-600">{error.name.message}</p>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="location"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Location:
                  </label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    onChange={handleRegisterChange}
                    className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {error.location ? (
                    <p className="text-red-600">{error.location.message}</p>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="aboutUs"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    About Us:
                  </label>
                  <textarea
                    name="aboutUs"
                    id="aboutUs"
                    cols="30"
                    rows="10"
                    onChange={handleRegisterChange}
                    className="h-28 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  ></textarea>
                  {error.aboutUs ? (
                    <p className="text-red-600">{error.aboutUs.message}</p>
                  ) : null}
                </div>
              </div>
              <div className="place-items-start">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email:
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    onChange={handleRegisterChange}
                    className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {error.email ? (
                    <p className="text-red-600">{error.email.message}</p>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password:
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={handleRegisterChange}
                    className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {error.password ? (
                    <p className="text-red-600">{error.password.message}</p>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password:
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={handleRegisterChange}
                    className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {error.confirmPassword ? (
                    <p className="text-red-600">
                      {error.confirmPassword.message}
                    </p>
                  ) : null}
                </div>
                <button className="w-full mt-5 bg-sky-300 hover:bg-sky-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyRegister;

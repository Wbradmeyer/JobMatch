import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/UserContext";

const SeekerRegister = () => {
  const { setCurrentUser } = useContext(userContext);
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [checkedLanguages, setCheckedLanguages] = useState([]);
  const [checkedFrameworks, setCheckedFrameworks] = useState([]);
  const [seekerUser, setSeekerUser] = useState({
    name: "",
    location: "",
    bio: "",
    languages: checkedLanguages,
    frameworks: checkedFrameworks,
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLanguagesCheckedBoxes = (e) => {
    if (e.target.checked) {
      setCheckedLanguages((prevLanguages) => [
        ...prevLanguages,
        e.target.value,
      ]);
      setSeekerUser((prevUser) => ({
        ...prevUser,
        languages: [...prevUser.languages, e.target.value],
      }));
    } else {
      setCheckedLanguages((prevLanguages) =>
        prevLanguages.filter((lang) => lang !== e.target.value)
      );
      setSeekerUser((prevUser) => ({
        ...prevUser,
        languages: prevUser.languages.filter((lang) => lang !== e.target.value),
      }));
    }
  };

  const handleFrameworksCheckedBoxes = (e) => {
    if (e.target.checked) {
      setCheckedFrameworks((prevFrameworks) => [
        ...prevFrameworks,
        e.target.value,
      ]);
      setSeekerUser((prevUser) => ({
        ...prevUser,
        frameworks: [...prevUser.frameworks, e.target.value],
      }));
    } else {
      setCheckedFrameworks((prevFrameworks) =>
        prevFrameworks.filter((framework) => framework !== e.target.value)
      );
      setSeekerUser((prevUser) => ({
        ...prevUser,
        frameworks: prevUser.frameworks.filter(
          (framework) => framework !== e.target.value
        ),
      }));
    }
  };

  const handleRegisterChange = (e) => {
    setSeekerUser({
      ...seekerUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/seekers/register", seekerUser, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        setCurrentUser(res.data);
        navigate("/seekers/dashboard");
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
            Register
          </h2>
          <div>
            <form className="w-full max-w-lg" onSubmit={handleRegisterSubmit}>
              <div className="container mx-auto my-5">
                <div className="col mr-2">
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
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      htmlFor="location"
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
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      htmlFor="bio"
                    >
                      Bio:
                    </label>
                    <textarea
                      name="bio"
                      id="bio"
                      cols="30"
                      rows="4"
                      onChange={handleRegisterChange}
                      className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    ></textarea>
                    {error.bio ? (
                      <p className="text-red-600">{error.bio.message}</p>
                    ) : null}
                  </div>
                </div>

                <div className="col ml-2">
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
                  &nbsp;
                </div>
              </div>
              <p className="text-xl font-medium">Languages</p>
              <div className="flex justify-start">
                <div className="mx-3">
                  <label htmlFor="java" className="mr-1">
                    Java
                  </label>
                  <input
                    type="checkbox"
                    value={"Java"}
                    id="java"
                    name="java"
                    onChange={handleLanguagesCheckedBoxes}
                  />
                </div>
                <div className="mx-3">
                  <label htmlFor="javaScript" className="mr-1">
                    JavaScript
                  </label>
                  <input
                    type="checkbox"
                    value={"JavaScript"}
                    id="javaScript"
                    name="javaScript"
                    onChange={handleLanguagesCheckedBoxes}
                  />
                </div>
                <div className="mx-3">
                  <label htmlFor="python" className="mr-1">
                    Python
                  </label>
                  <input
                    type="checkbox"
                    value={"Python"}
                    id="python"
                    name="python"
                    onChange={handleLanguagesCheckedBoxes}
                  />
                </div>
                <div className="mx-3">
                  <label htmlFor="typeScript" className="mr-1">
                    TypeScript
                  </label>
                  <input
                    type="checkbox"
                    value={"TypeScript"}
                    id="typeScript"
                    name="typeScript"
                    onChange={handleLanguagesCheckedBoxes}
                  />
                </div>
              </div>
              &nbsp;
              <p className="text-xl font-medium">Frameworks</p>
              <div className="flex justify-start">
                <div className="mx-3">
                  <label htmlFor="flask" className="mr-1">
                    Flask
                  </label>
                  <input
                    type="checkbox"
                    value={"Flask"}
                    id="flask"
                    name="flask"
                    onChange={handleFrameworksCheckedBoxes}
                  />
                </div>
                <div className="mx-3">
                  <label htmlFor="django" className="mr-1">
                    Django
                  </label>
                  <input
                    type="checkbox"
                    value={"Django"}
                    id="django"
                    name="django"
                    onChange={handleFrameworksCheckedBoxes}
                  />
                </div>
                <div className="mx-3">
                  <label htmlFor="springBoot" className="mr-1">
                    SpringBoot
                  </label>
                  <input
                    type="checkbox"
                    value={"SpringBoot"}
                    id="springBoot"
                    name="springBoot"
                    onChange={handleFrameworksCheckedBoxes}
                  />
                </div>
                <div className="mx-3">
                  <label htmlFor="react" className="mr-1">
                    React
                  </label>
                  <input
                    type="checkbox"
                    value={"React"}
                    id="react"
                    name="react"
                    onChange={handleFrameworksCheckedBoxes}
                  />
                </div>
              </div>
              <div>
                <button className="w-1/4 mt-5 bg-sky-300 hover:bg-sky-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
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

export default SeekerRegister;

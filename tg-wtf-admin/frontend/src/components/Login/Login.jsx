import React, { useState } from "react";
import axios from "../../axios";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

const Login = ({setIsLoggedIn}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated()

  const signIn = useSignIn();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  if (isAuthenticated()) {
    navigate('/')
  }

  const handleLogin = () => {
    axios
      .post("/loginUser", {
        username: username,
        password: password,
      })
      .then((response) => {
        signIn({
          auth: {
            token: response.data.token,
            type: "Bearer",
          },
        });
        setIsLoggedIn(true)
        navigate('/')
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 font-semibold mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-semibold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:bg-blue-600"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;

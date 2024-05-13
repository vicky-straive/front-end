import React, { useState, useEffect, useContext } from 'react';
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { useSessionStorage } from 'primereact/hooks';
import { Link } from "react-router-dom";


import "primereact/resources/themes/lara-light-cyan/theme.css";
import "/node_modules/primeflex/primeflex.css";
import './logIn.css'

import axios from "axios";

function LoginComponent(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginCred, setlogincred] = useState("")
  const [loginError, setLoginError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState();
  const [token, setToken] = useSessionStorage('', 'token');

  // console.log("token", token);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setLoginError(null);

    try {
      const response = await axios.post("https://10.93.10.186/SME-Review/api/login", {
        email,
        password,
      });

      console.log("Login successful:", response.data);
      // console.log("Token data:", response.data.token);
      setlogincred(response.data)
      setToken(response.data.token)
      if (props.onLoginSuccess) {
        props.onLoginSuccess(response.data);
      }
    } catch (error) {
      setLoginError(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className=" flex align-items-center justify-content-center pt-6 log-form">
          <div className=" logIn-form surface-card p-4 shadow-2 border-round w-full lg:w-6">
            <div className="text-center mb-5">
              {/* <img src="" alt="hyper" height={50} className="mb-3" /> */}
              <div className="text-900 text-3xl font-medium mb-3">
                SME-Review
              </div>
              <span className="text-600 font-medium line-height-3">
              Srtive Employee? 
              </span>
              <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer srtive">
              <Link className='link' to="/prime-table">Login here!</Link>
              </a>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-900 font-medium mb-2"
              >
                Email
              </label>
              <InputText
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="text"
                placeholder="Email address"
                className="w-full mb-3 input-field"
              />

              <label
                htmlFor="password"
                className="block text-900 font-medium mb-2"
              >
                Password
              </label>
              <InputText
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                type="password"
                placeholder="Password"
                className="w-full mb-3 input-field"
              />

              <div className="flex align-items-center justify-content-between mb-6">
                <div className="flex align-items-center">
                  <Checkbox
                    id="rememberme"
                    onChange={(e) => setChecked(e.checked)}
                    checked={checked}
                    className="mr-2 check"
                  />
                  <label htmlFor="rememberme">Remember me</label>
                </div>
                <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">
                  Forgot your password?
                </a>
              </div>

              <Button
                type="submit"
                onSubmit={handleSubmit}
                label="Sign In"
                icon="pi pi-user"
                className="w-full sub-btn"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginComponent;

import React, { useState, useEffect, useContext, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { useSessionStorage } from "primereact/hooks";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import "/node_modules/primeflex/primeflex.css";
import "./logIn.css";

import axios from "axios";
import atob from "atob";
import { useMountEffect } from "primereact/hooks";

function LoginComponent(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginCred, setlogincred] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState();
  const [token, setToken] = useSessionStorage("", "token");
  const [error, setError] = useState(null); 
  const msgs = useRef(null);
  const toast = useRef(null);
  const [userName, setUserName] = useState(null)

  const url = window.location.href.split("?")[1];
  const urlParams = new URLSearchParams(url);
  const navigate = useNavigate();
  console.log("url", url);

  const getToken = () => {
    window.location.href = "http://localhost/sme-review/login/with-o365";
    setToken(url);
    handlePostCall();
  };

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Login Success",
      detail: `Welcome ${userName}`,
      life: 3000,
    });
  };

  const handlePostCall = async (token) => {
    console.log("TOKEN", token);
    try {
      const formData = new FormData();
      const apiUrl = "http://127.0.0.1:8000/api/azure-level";
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
      });
      formData.append("accessToken", token);
      console.log("API response:", response.status);

      if (response.status === 200) {
        console.log("Sucess", response);
        const name = response.data.name
        setUserName(name)
        console.log("Name", name);
        showSuccess();
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      } else {
        console.error("Login failed:", response);
        // alert("login Failed");
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error making API call:", error);
      alert("API err");
      setLoginError("Error making API call");
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const newArr = [];
    for (const [key] of urlParams) {
      newArr.push(atob(key));
    }
    if (newArr[0] != null) {
      localStorage.setItem("token", newArr[0]);
      handlePostCall(newArr[0]);
      if (newArr[0] != null) {
        console.log("new", newArr);
      }
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setLoginError(null);

    try {
      const response = await axios.post(
        "https://10.93.10.186/SME-Review/api/login",
        {
          email,
          password,
        }
      );

      console.log("Login successful:", response.data);
      setlogincred(response.data);
      setToken(response.data.token);
      if (props.onLoginSuccess) {
        props.onLoginSuccess(response.data);
        navigate("/prime-table");
      }
    } catch (error) {
      setLoginError(
        error.response?.data?.message ||
          "An error occurred during login. Please try again."
      );
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
                <Link className="link" onClick={getToken}>
                  Click here!
                </Link>
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
                loading={isLoading}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </form>
      <div className="card flex justify-content-center">
        <Toast ref={toast} />
      </div>
      {/* {loginError && (
          <Messages ref={msgs}>
            <Messages severity="error" content={loginError} />
          </Messages>
        )} */}
    </div>
  );
}
export default LoginComponent;

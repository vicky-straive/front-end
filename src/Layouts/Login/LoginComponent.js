import React, { useState, useEffect, useContext, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { useSessionStorage } from "primereact/hooks";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import API_CONSTANTS from "../../Service/API_Configs";
import { FloatLabel } from "primereact/floatlabel";
import MSIcon from "../../Asset/Login/ms-icon.png";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import "/node_modules/primeflex/primeflex.css";
import "./logIn.css";
import { ProgressSpinner } from "primereact/progressspinner";
import bgHGif from "../../Asset/Login/BG-H.gif";

import axios from "axios";
import atob from "atob";

const GifComponent = () => {
  return (
    <div className="gif-container">
      <img
        src={bgHGif}
        alt="Background GIF"
        className="gif-card"
        loop={false}
      />
    </div>
  );
};

function LoginComponent() {
  // API Connections
  const { BASE_CONNECTION, BASE_TOKEN_CONNECTION, SER_BASE_CONNECTION } =
    API_CONSTANTS;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState();
  const [token, setToken] = useSessionStorage("", "token");
  const [userName, setUserName] = useState();

  const url = window.location.href.split("?")[1];
  const urlParams = new URLSearchParams(url);
  const navigate = useNavigate();
  const toast = useRef(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^.{8,}$/;
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);

  const getToken = () => {
    window.location.href = `${SER_BASE_CONNECTION}/login/with-o365`;
  };

  const showSuccess = (name) => {
    toast.current.show({
      severity: "success",
      summary: "Login Success",
      detail: `Welcome ${name}`,
      life: 3000,
    });
  };

  const showErr = (err) => {
    toast.current.show({
      severity: "error",
      summary: "An Error Occured",
      detail: `${err}, Please try again later`,
      life: 3000,
    });
  };

  const handlePostCall = async (token) => {
    try {
      const formData = new FormData();
      const url = window.location.href.split("?")[1];
      setToken(url);

      const apiUrl = `${SER_BASE_CONNECTION}/api/azure-level`;
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
      });
      formData.append("accessToken", token);

      if (response.status === 200) {
        const name = response?.data?.name;
        setUserName(name);
        showSuccess(name);
        setIsLoginSuccessful(true);
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      } else {
        showErr("Login failed. Please check your credentials.");
      }
    } catch (error) {
      showErr(error?.message);
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
    }
  }, [urlParams]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setLoginError(null);

    try {
      const response = await axios.post(
        `${SER_BASE_CONNECTION}/api/login`,
        {
          email,
          password,
        }
      );

      setToken(response.data.token);
      console.log("res", response);
      const name = response.data.name;
      if (response.data.status == true) {
        setIsLoading(true);
        showSuccess(name);
        setIsLoginSuccessful(true);
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      } else {
        showErr(response?.data?.message);
      }
    } catch (error) {
      console.log("err", error.message);
      showErr(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-container-form">
        <div className=" flex align-items-center justify-content-center  log-form">
          <div
            className={`logIn-form surface-card shadow-2 border-round w-full lg:w-9 grid ${
              isLoginSuccessful ? "hidden" : ""
            }`}
          >
            <div class="col col-left">
              <div className="text-center mb-5">
                <div className="text-900 text-3xl font-medium mb-3"></div>
              </div>
            </div>
            <div class="col col-right p-5">
              <div>
                <h2 className="col title">SME Review</h2>
              </div>
              <div className="col-right-signIn-cont">
              <h2 className="col log-title">Log In</h2>
              <div className="col-right-sign-form ">
                <FloatLabel className="mt-6 f-label">
                  <InputText
                    id="username"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setIsEmailValid(emailRegex.test(e.target.value));
                    }}
                    className={`${!isEmailValid ? "p-invalid" : ""}`}
                  />
                  <label htmlFor="username">Username</label>
                  {!isEmailValid && (
                    <small className="p-error">
                      Please enter a valid email address.
                    </small>
                  )}
                </FloatLabel>
                <FloatLabel className="mt-6 f-label">
                  <InputText
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setIsPasswordValid(passwordRegex.test(e.target.value));
                    }}
                    className={`${!isPasswordValid ? "p-invalid" : ""}`}
                  />
                  <label htmlFor="username">Password</label>
                  {!isPasswordValid && (
                    <small className="p-error">
                      Password must be at least 8 characters long.
                    </small>
                  )}
                </FloatLabel>

                <div className="flex align-items-center justify-content-between mb-6">
                  <div className="flex align-items-center mt-6">
                    {/* <Checkbox
                      id="rememberme"
                      onChange={(e) => setChecked(e.checked)}
                      checked={checked}
                      className="mr-2 check "
                    />
                    <label htmlFor="rememberme">Keep me logged in</label> */}
                  </div>
                  <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer mt-6">
                    Forgot your password?
                  </a>
                </div>

                <Button
                  type="submit"
                  onSubmit={handleSubmit}
                  label="Sign In"
                  className="w-full sub-btn"
                  loading={isLoading}
                  disabled={
                    !isEmailValid || !isPasswordValid || !email || !password
                  }
                />
              </div>
              <div className="hr-c grid">
                <hr className="hr hr-l col-5 "/>
                <span className="col-2 hr-text">OR</span>
                <hr className="hr hr-r col-5  "/>

              </div>
              <div className="ms-btn-container grid mt-6 ml-1">
                <span className="text-600 font-medium ms-text straive">
                  Straive Employee?
                  <span className="text-600 font-medium ms-text ml-1">
                    Sign in with
                  </span>
                </span>
                <div
                  className="ms-icon-container mt-3 cursor-pointer"
                  onClick={getToken}
                  loading={isLoading}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ProgressSpinner
                      className="spinner ml-2"
                      style={{}}
                      strokeWidth="8"
                      fill="var(--surface-ground)"
                      animationDuration=".5s"
                    />
                  ) : (
                    <img src={MSIcon} className="ms-icon" />
                  )}
                  {/* <img src={MSIcon} className="ms-icon" /> */}
                  <span className="text-600 font-medium ms-icon-text ml-1">
                    Microsoft
                  </span>
                  {/* <ProgressSpinner className="spinner ml-2" style={{}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" /> */}
                </div>
              </div>
              </div>
            </div>
          </div>
          {isLoginSuccessful && <GifComponent className="gifbg" />}
        </div>
      </form>
      <div className="card flex justify-content-center">
        <Toast ref={toast} />
      </div>
    </div>
  );
}
export default LoginComponent;

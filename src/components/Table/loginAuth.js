import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios"; // Import Axios
import atob from "atob";

import { useSessionStorage } from "primereact/hooks";

function LoginAuth() {
  const navigate = useNavigate();
  const [error, setError] = useState(null); // State for error handling
  const [token, setToken] = useSessionStorage("", "token");

  const url = window.location.href.split("?")[1];
  const urlParams = new URLSearchParams(url);

  const handlePostCall = (token) => {
    const formData = new FormData();
    formData.append("accessToken", token);
    const apiUrl = "http://127.0.0.1:8000/api/azure-level";

    if (token !== "") {
      axios({
        method: "post",
        url: apiUrl,
        data: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.data.status_code === 200) {
            // localStorage.setItem('user_id', response.data.data.user.user_id);
            // localStorage.setItem('display_name', response.data.data.user.display_name);
            //  localStorage.setItem('accessToken', response.data.data.token);
            const userID = response.data.data.user.user_id;
            const redirectURL = response.data.data.user.roles[0].redirect_url;
            // let menu = [];
            //  menu = response.data.data.user.roles[0].menus;

            // localStorage.setItem("menu", JSON.stringify(menu));
            // localStorage.setItem("roleId", response.data.data.user.roles[0].id);
            // localStorage.setItem("redirectURL", redirectURL);

            let roleHasMenu = [];
            roleHasMenu = response.data.data.user.menus;
            // localStorage.setItem("roleHasMenus", JSON.stringify(roleHasMenu));
            // dispatch(setUserDetails(response.data.data));
            // dispatch(setIsAuthenticated(true));
            if (userID != null) navigate("/dashboard");
          } else {
            // setErrorMessages({ name: "pass", message: response.data.message });
          }
        })
        .catch((err) => {
          console.log("error", err.response.data);
          // setErrorMessages({ name: "pass", message: err.response.data.message });
        });
    } else {
      // Username not found
      // setErrorMessages({ name: "pass", message: "Please enter login credentials!!!" });
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
      //  if(userid!=null){
      //     navigate(`/${redirecturl}`, { replace: true });
      //  }
    }
  }, []); // ... existing useEffect to retrieve token from URL params ...

  return <div></div>;
}

export default LoginAuth;

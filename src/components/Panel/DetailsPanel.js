import React, { useRef, useEffect, useState } from "react";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import { useLocation } from "react-router-dom";
import "./panel.css";
import axios from "axios";
import API_CONSTANTS from "../../Service/API_Configs";
import { useSessionStorage } from "primereact/hooks";

export default function TemplateDemo({}) {
  const configMenu = useRef(null);
  const location = useLocation();
  const rowData = location.state;
  const { BASE_TOKEN_CONNECTION, SER_BASE_CONNECTION } = API_CONSTANTS;
  const [token, setToken] = useSessionStorage("", "token"); // Empty dependency array to run the effect only once on mount

  console.log("dataRE", rowData);

  const submit = async () => {
    try {
      // Make an API call to save the updated data
      const apiUrl = `${SER_BASE_CONNECTION}/api/submitReviewDetails `;
      const payload = rowData.ID;
      console.log("pay", payload);
      const response = await axios.post(
        apiUrl,
        { payload },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Row data saved successfully");
      } else {
        console.error("Failed to save row data");
      }
    } catch (error) {
      console.error("Error saving row data:", error);
    }
  };

  const headerTemplate = (options) => {
    const className = `${options.className} justify-content-space-between`;

    return (
      <div className={className}>
        <div className="flex align-items-center gap-2 panel_conatiner">
          <p className="m-0">Job ID: {rowData?.JOB_ID}</p>
          <p className="m-0">Job Title: {rowData?.JOB_TITLE}</p>
          <p className="m-0">Chapter ID: {rowData?.CHAPTER_ID}</p>
          <p className="m-0">Chapter Name: {rowData?.CHAPTER_NAME}</p>
        </div>
        <Button label="Submit" onClick={submit} />
      </div>
    );
  };

  return <Panel headerTemplate={headerTemplate} toggleable />;
}

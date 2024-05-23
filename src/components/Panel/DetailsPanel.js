import React, { useRef, useEffect, useState } from "react";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import { useLocation } from "react-router-dom";
import "./panel.css";


export default function TemplateDemo({}) {
  const configMenu = useRef(null);
  const location = useLocation();
  const rowData = location.state;

  // console.log("dataRE", rowData);

 ; // Empty dependency array to run the effect only once on mount

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
        <Button label="Save" />
      </div>
    );
  };

  return <Panel headerTemplate={headerTemplate} toggleable />;
}

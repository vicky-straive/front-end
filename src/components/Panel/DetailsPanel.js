import React, { useRef } from "react";
import { Panel } from "primereact/panel";
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import { useLocation } from "react-router-dom";
import "./panel.css";

export default function TemplateDemo({}) {
  const configMenu = useRef(null);
  const location = useLocation();
  const rowData = location.state;


  console.log("dataRE", rowData);

  const headerTemplate = (options) => {
    const className = `${options.className} justify-content-space-between`;

    return (
      <div className={className}>
        <div className="flex align-items-center gap-2 panel_conatiner">
          <span className="font-bold">Job Details</span>
          <p className="m-0">Job ID: {rowData?.JOB_ID}</p>
          <p className="m-0">Job ID: {rowData?.JOB_TITLE}</p>
          <p className="m-0">Job ID: {rowData?.CHAPTER_ID}</p>
          <p className="m-0">Job ID: {rowData?.CHAPTER_NAME}</p>
        </div>
      </div>
    );
  };

  return <Panel headerTemplate={headerTemplate} toggleable />;
}

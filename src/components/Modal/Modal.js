import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import "./Modal.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
// import "primereact/resources/themes/lara-dark-blue/theme.css"

import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";

export default function ResponsiveDemo(rowData) {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(rowData.data.machineLanguage);

  console.log("data", rowData.data);

  return (
    <div className="card flex justify-content-center">
      <Button
        className="edit-icon"
        label=""
        icon={<CreateOutlinedIcon />}
        onClick={() => setVisible(true)}
      />
      <Dialog
        header="Modify"
        className="db-box"
        visible={visible}
        onHide={() => setVisible(false)}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <div className="db-content">
          <div className="db-sl">
            <h4 className="m-0">Source Language</h4>
            <p className="m-0">{rowData.data.sourceLanguage}</p>
          </div>
          <div className="db-ml">
            <h4 className="m-0">Machine Language</h4>
            <div className="card flex justify-content-center">
              <InputTextarea
                autoResize
                value={value}
                onChange={(e) => setValue(e.target.value)}
                rows={5}
                cols={30}
              />
            </div>
          </div>
        </div>
        <div className="db-footer">
          <Button
            className="db-confirm-btn"
            label="Confirm"
            severity="success"
            outlined
          />
        </div>
      </Dialog>
    </div>
  );
}

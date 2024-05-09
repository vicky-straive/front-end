import * as React from "react";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import "./DataTable.css";

const DataTable = () => {
  const [rows, setRows] = React.useState([
    {
      id: 1,
      sourceContent: "Smartcat enables smooth, efficient teamwork and doesn’t charge to add new users",
      MtContent: "Language",
      HeContent: "Smartcat permite un trabajo en equipo fluido y eficiente y no cobra por agregar nuevos usuarios",
      verified: "false",
    },
    {
      id: 2,
      sourceContent: "English ",
      MtContent: "Language",
      HeContent: "Translated Language",
      verified: "active",
    },
    {
      id: 3,
      sourceContent: "English ",
      MtContent: "Language",
      HeContent: "Translated Language",
      verified: "active",
    },
    {
      id: 4,
      sourceContent: "English ",
      MtContent: "Language",
      HeContent: "Translated Language",
      verified: "active",
    },
    {
      id: 5,
      sourceContent: "English ",
      MtContent: "Language",
      HeContent: "Translated Language",
      verified: "false",
    },
    {
      id: 6,
      sourceContent: "English ",
      MtContent: "Language",
      HeContent: "Translated Language",
      verified: "active",
    },
    {
      id: 7,
      sourceContent: "English ",
      MtContent: "Language",
      HeContent: "Translated Language",
      verified: "flase",
    },
    {
      id: 8,
      sourceContent: "English ",
      MtContent: "Language",
      HeContent: "Translated Language",
      verified: "active",
    },
    {
      id: 9,
      sourceContent: "English ",
      MtContent: "Language",
      HeContent: "Translated Language",
      verified: "flase",
    },
    {
      id: 10,
      sourceContent: "English ",
      MtContent: "Language",
      HeContent: "Translated Language",
      verified: "flase",
    },
    {
      id: 11,
      sourceContent: "English ",
      MtContent: "Language",
      HeContent: "Translated Language",
      verified: "flase",
    },
  ]);

  const columns = [
    { field: "id", headerName: "#", width: 100 },
    { field: "sourceContent", headerName: "Source Content", width: 300 },
    // {
    //   field: "MtContent",
    //   headerName: "Machine Translated Contnet",
    //   width: 300,
    // },
    {
      field: "HeContent",
      headerName: "Machine Translated Content",
      width: 500,
      padding: 10,
      editable: true,
      renderCell: (params) => {
        return (
          <div style={{ whiteSpace: 'normal' }}>
            <input
              className="edit-field"
              type="text"
              value={params.value}
              onChange={(event) => {
                const updatedRows = rows.map((row) => {
                  if (row.id === params.row.id) {
                    return { ...row, HeContent: event.target.value };
                  }
                  return row;
                });
                setRows(updatedRows);
              }}
            />
          </div>
        );
      },
    },

    {
      field: "editIcon",
      headerName: "Verified by Human",
      width: 200,
      renderCell: (params) => {
        const icon =
          params.row.verified === "active" ? (
            <DoneAllOutlinedIcon className="dbl-tick" />
          ) : (
            <DoneOutlinedIcon />
          );
        return (
          <div className="verify" onClick={() => handleEditClick(params.row)}>
            {icon}
          </div>
        );
      },
    },
  ];

  const handleEditClick = (row) => {
    const updatedRows = rows.map((r) => {
      if (r.id === row.id) {
        return { ...r, verified: "active" };
      }
      return r;
    });
    setRows(updatedRows);
  };
  const handleHebrewChange = (event, params) => {
    const updatedRows = rows.map((row) => {
      if (row.id === params.row.id) {
        return { ...row, HeContent: event.target.value };
      }
      return row;
    });
    setRows(updatedRows);
  };

  return (
    <div style={{ height: "auto", width: "auto", margin: "auto" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 50, 100]}
        // checkboxSelection
      />
    </div>
  );
};

export default DataTable;

import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import API_CONSTANTS from "../../Service/API_Configs";
import { useSessionStorage } from "primereact/hooks";
import axios from "axios";
import "./dash.css";
import DetailsPanel from "../../components/Panel/DetailsPanel";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const [products, setProducts] = useState([]);
  const { SER_BASE_CONNECTION } = API_CONSTANTS;
  const [token] = useSessionStorage("", "token");
  const [selectedRow, setSelectedRow] = useState(null);
  const navigate = useNavigate();

  const handleRowClick = (rowData) => {
    setSelectedRow(rowData);
  };

  const columns = [
    { field: "JOB_ID", header: "Job ID" },
    { field: "JOB_TITLE", header: "Job Title" },
    { field: "CHAPTER_ID", header: "Chapter ID" },
    { field: "CHAPTER_NAME", header: "Chapter Name" },
    {
      field: "review",
      header: "Actions",
      body: (rowData) => ( 
        <Button
          className="review-btn"
          label="Review"
          onClick={() => {
            navigate("/job_review", { state: rowData });
          }}
        />
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `${SER_BASE_CONNECTION}/api/GetJobDetailsData`;
        const response = await axios.post(
          apiUrl,
          {},
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("data", response);
        // Ensure response data is an array and correctly nested
        if (
          response.data &&
          response.data.data &&
          Array.isArray(response.data.data.data)
        ) {
          setProducts(response.data.data.data);
        } else {
          console.error("Unexpected response data format:", response.data);
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setProducts([]);
      }
    };

    fetchData();
  }, [SER_BASE_CONNECTION, token]);

  return (
    <div className="card">
      <DataTable
        value={products}
        tableStyle={{ minWidth: "50rem" }}
        className="dash-table"
      >
        {columns.map((col) => (
          <Column
            key={col.field}
            field={col.field}
            header={col.header}
            body={col.body}
          />
        ))}
      </DataTable>
      {selectedRow && <DetailsPanel rowData={selectedRow} />}
    </div>
  );
}

export default Welcome;

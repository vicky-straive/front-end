
import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import { ProductService } from "../../Service/DataService";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";
import "./DataTable.css";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useRowEditingState } from "primereact/hooks";
import { useLocation } from "react-router-dom";
import API_CONSTANTS from "../../Service/API_Configs";
import axios from "axios";
import moment from 'moment';

export default function RowEditingDemo() {
  const [products, setProducts] = useState(null);
  // const [statuses] = useState(["MODIFIED", "NOT MODIFIED"]);
  const [modDate, setModData] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [rowEditorState, setRowEditorState] = useState(null);
  const location = useLocation();
  const rowData = location.state;
  const { SER_BASE_CONNECTION, BASE_TOKEN_CONNECTION } = API_CONSTANTS;
  const [IDMLData, setIDMLData] = useState(null);
  // console.log("data in Prime", rowData);
  console.log("IDML data", IDMLData);
  // console.log("IDML data node", IDMLData.data.SOURCE_CONTENT);

  useEffect(() => {
    const getRowIDMLData = async (rowData) => {
      try {
        const apiUrl = `${SER_BASE_CONNECTION}/api/getIDMLData`;
        const response = await axios.post(
          apiUrl,
          { id: rowData.ID },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              // Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data ) {
          const flattenedData = response.data.data.data.map((item) => ({
            ...item,
            id: item.ID, // Assuming the table expects an 'id' field
          }));
          console.log("res", response);
          setIDMLData(flattenedData);
        } else {
          console.error("Unexpected response data format:", response.data);
          setIDMLData(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setIDMLData(null);
      }
    };

    // Call the function with rowData on component mount
    if (rowData) {
      getRowIDMLData(rowData);
    }
  }, []);

  useEffect(() => {
    ProductService.getProductsMini().then((data) => setProducts(data));
  }, []);

  const allowEdit = (rowData) => {
    if (rowData) {
      setSelectedRow(rowData);
    }
    return rowData.name !== " Band";
  };

  const getSeverity = (value) => {
    switch (value) {
      case "MODIFIED":
        return "success";

      case "NOT MODIFIED":
        return "warning";

      default:
        return null;
    }
  };
  
  const onRowEditComplete = (e) => {
    if (IDMLData) {
      let _IDMLData = [...IDMLData];
      let { newData, index } = e;
  
      // Compare the original content with the modified content
      const isContentModified = _IDMLData[index].TRANSLATED_CONTENT !== newData.TRANSLATED_CONTENT;
  
      // Check if CREATED_DATE and MODIFIED_DATE are the same
      const createdDate = moment(_IDMLData[index].CREATED_DATE);
      const modifiedDate = moment(_IDMLData[index].MODIFIED_DATE);
      const isDateModified = !createdDate.isSame(modifiedDate);
      setModData(isDateModified)
  
      // Update the inventoryStatus based on content and date modification
      if (isContentModified || isDateModified) {
        console.log("moded");
        newData.inventoryStatus = "MODIFIED";
      } else {
        newData.inventoryStatus = "NOT MODIFIED";
        console.log("notModed");

      }
  
      // Update the MODIFIED_DATE with the current timestamp if modified
      if (newData.inventoryStatus === "MODIFIED") {
        newData.MODIFIED_DATE = moment().format('YYYY-MM-DD HH:mm:ss');
      }
  
      _IDMLData[index] = newData;
      setIDMLData(_IDMLData);
  
      // try {
      //   // Make an API call to save the updated data
      //   const response = await axios.put(`/api/products/${newData.id}`, newData);
  
      //   if (response.status === 200) {
      //     console.log('Row data saved successfully');
      //   } else {
      //     console.error('Failed to save row data');
      //   }
      // } catch (error) {
      //   console.error('Error saving row data:', error);
      // }
    }
  };

  const textEditor = (options) => {
    return (
      <InputTextarea
        autoResize
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  console.log("da", modDate);

  const checker = (rowData) => {
    const isRowEditing = rowData === rowEditorState;
    return (
      <div>
        {!isRowEditing && rowData.inventoryStatus === "MODIFIED" && modDate && (
          <i
            className="pi pi-check"
            style={{ color: "#0ac50a", position: "relative", right: "80px" }}
          ></i>
        )}
        <i className=""></i>
      </div>
    );
  };



  const pdfViewer = (rowData) => {
    return (
      <div>
        <PictureAsPdfIcon />
      </div>
    );
  };

  

  return (
    <div className="card p-fluid db-table">
      <DataTable
        scrollable
        scrollHeight="90vh"
        value={IDMLData}
        dataKey="id"
        rows={10}
        paginator
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} pages"
        rowsPerPageOptions={[10, 25, 50]}
        editMode="row"
        onRowEditComplete={onRowEditComplete}
        tableStyle={{ minWidth: "50rem", maxWidth: "100%" }}
        onRowEditInit={(event) => setRowEditorState(event.data)}
        onRowEditCancel={() => setRowEditorState(null)}
        // ...
      >
        {/* <Column field="id" header="Page No" style={{ width: "0%" }}></Column> */}

            <Column
              field="SOURCE_CONTENT"
              header="Source Content"
              style={{ width: "20%" }}
            ></Column>
            <Column
              field="TRANSLATED_CONTENT"
              header="Machine Translated Content"
              editor={(options) => textEditor(options)}
              style={{ width: "20%" }}
            ></Column>
            <Column
              header="Modify"
              headerStyle={{ width: "0%", minWidth: "8rem" }}
              rowEditor={allowEdit}
              bodyStyle={{ textAlign: "" }}
            ></Column>
            <Column
              body={checker}
              headerStyle={{ width: "0%", minWidth: "rem" }}
              bodyStyle={{ textAlign: "" }}
            ></Column>
            <Column
              header="PDF View"
              body={pdfViewer}
              headerStyle={{
                width: "20%",
                minWidth: "rem",
                textAlign: "center",
              }}
              bodyStyle={{ textAlign: "center" }}
            ></Column>
         
      </DataTable>
    </div>
  );
}

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
// import Modal from "../Modal/Modal";

export default function RowEditingDemo() {
  const [products, setProducts] = useState(null);
  // const [statuses] = useState(["MODIFIED", "NOT MODIFIED"]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [rowEditorState, setRowEditorState] = useState(null);

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
    let _products = [...products];
    let { newData, index } = e;

    // Compare the original content with the modified content
    if (_products[index].machineLanguage !== newData.machineLanguage) {
      newData.inventoryStatus = "MODIFIED";
    } else {
      newData.inventoryStatus = "NOT MODIFIED";
    }
    _products[index] = newData;
    setProducts(_products);
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

  const checker = (rowData) => {
     const isRowEditing = rowData === rowEditorState;
    return (
      <div>
        {!isRowEditing && rowData.inventoryStatus === "MODIFIED" && (
          <i
            className="pi pi-check"
            style={{ color: "#0ac50a", position: "relative", right: "80px" }}
          ></i>
        )}
        <i className=""></i>
      </div>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.inventoryStatus}
        severity={getSeverity(rowData.inventoryStatus)}
      ></Tag>
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
        value={products}
        rows={10}
        paginator
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} pages"
        rowsPerPageOptions={[10, 25, 50]}
        editMode="row"
        dataKey="id"
        onRowEditComplete={onRowEditComplete}
        tableStyle={{ minWidth: "50rem", maxWidth: "100%" }}
        onRowEditInit={(event) => setRowEditorState(event.data)}
        onRowEditCancel={() => setRowEditorState(null)}
        // ...
      >
        {/* <Column field="id" header="Page No" style={{ width: "0%" }}></Column> */}
        <Column
          field="sourceLanguage"
          header="Source Content"
          style={{ width: "20%" }}
        ></Column>
        <Column
          field="machineLanguage"
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
          headerStyle={{ width: "20%", minWidth: "rem", textAlign: "center" }}
          bodyStyle={{ textAlign: "center" }}
        ></Column>
      </DataTable>
    </div>
  );
}

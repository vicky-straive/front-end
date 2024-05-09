import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import { ProductService } from "../../Service/ProductService";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import './DataTable.css'
import Modal from '../Modal/Modal'

export default function RowEditingDemo() {
  const [products, setProducts] = useState(null);
  const [statuses] = useState(["MODIFIED", "NOT MODIFIED", "OUTOFSTOCK"]);

  useEffect(() => {
    ProductService.getProductsMini().then((data) => setProducts(data));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getSeverity = (value) => {
    switch (value) {
      case "MODIFIED":
        return "success";

      case "NOT MODIFIED":
        return "warning";

      case "OUTOFSTOCK":
        return "danger";

      default:
        return null;
    }
  };

  const onRowEditComplete = (e) => {
    let _products = [...products];
    let { newData, index } = e;

    _products[index] = newData;

    setProducts(_products);
  };

  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  const statusEditor = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.editorCallback(e.value)}
        placeholder="Select a Status"
        itemTemplate={(option) => {
          return <Tag value={option} severity={getSeverity(option)}></Tag>;
        }}
      />
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

  const allowEdit = (rowData) => {
    return rowData.name !== "Blue Band";
  };

  return (
    <div className="card p-fluid">
      <DataTable
        scrollable scrollHeight="90vh"
        value={products}
        rows={10}
        paginator
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        rowsPerPageOptions={[10, 25, 50]}
        editMode="row"
        dataKey="id"
        onRowEditComplete={onRowEditComplete}
        tableStyle={{ minWidth: "50rem", maxWidth: "100%" }}
      >
        <Column field="id" header="Number" style={{ width: "0%" }}></Column>
        <Column
          field="sourceLanguage"
          header="Source Language"
          style={{ width: "30%" }}
        ></Column>
        <Column
          field="machineLanguage"
          header="Machine Language"
          editor={(options) => textEditor(options)}
          style={{ width: "30%" }}
        ></Column>
        <Column
          header="Modify"
          rowEditor={allowEdit}
          headerStyle={{ width: "10%", minWidth: "8rem" }}
          //   bodyStyle={{ textAlign: "center" }}
        >
        </Column>
        <Column
          headerStyle={{ width: "10%", minWidth: "8rem" }}
          field="inventoryStatus"
          header="Status"
          body={statusBodyTemplate}
          style={{ width: "20%" }}
        ></Column>
      </DataTable>
      <Modal/>

    </div>
  );
}

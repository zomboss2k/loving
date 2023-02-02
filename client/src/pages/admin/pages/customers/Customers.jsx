import React from "react";
import Datatable from "../../components/datatable/Datatable";
import Sidebar from "../../components/sidebar/Sidebar";
import Header from "./../../components/headerAdmin/HeaderAdmin";
import "./customers.scss";

const Customers = () => {
  return (
    <div className="customers">
      <Sidebar />
      <div className="customersContainer">
        <Header />
        <Datatable />
      </div>
    </div>
  );
};

export default Customers;

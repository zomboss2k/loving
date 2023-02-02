import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/headerAdmin/HeaderAdmin";
import "./product.scss";
import MessageTable from "../../components/productable/MessageTable";
import { Link } from "react-router-dom";
import axios from "axios";
import { getAllMessages } from "../../../../utils/APIRoutes";

const ListMessage = () => {
  const [allMessages, setAllMessages] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      document.title = "Danh sách tinh nhắn";
      const data = await axios.get(`${getAllMessages}`);
      setAllMessages(data.data);
    };
    fetchData();
  }, []);
  return (
    <div className="list-Message">
      <Sidebar />
      <div className="messageContainer">
        <Header />
        <div className="messageList">
          <div className="datatableTitle">
            <span>Danh sách tin nhắn</span>
            <Link
              to="/products/productId/new"
              style={{ textDecoration: "none" }}
            >
              {/* <span className="link">Add New </span> */}
            </Link>
          </div>
          <MessageTable allMessages={allMessages} />
        </div>
      </div>
    </div>
  );
};

export default ListMessage;

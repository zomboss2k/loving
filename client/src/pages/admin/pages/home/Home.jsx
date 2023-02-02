import React, { useEffect, useState } from "react";
import { allUsersRoute, getAllMessages } from "../../../../utils/APIRoutes";
import axios from "axios";
import "./home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import HeaderAdmin from "../../components/headerAdmin/HeaderAdmin";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";

const Home = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [totalUser, setTotalUser] = useState([]);
  const [totalMessages, setTotalMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setCurrentUser(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY || "dating")
        )
      );
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getAllUser = async () => {
      document.title = "Admin";
      if (currentUser) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setTotalUser(data.data);
      }
      const data = await axios.get(`${getAllMessages}`);
      setTotalMessages(data.data);
    };
    getAllUser();
  }, [currentUser]);

  return (
    <div className="home">
      <>
        <Sidebar />
        <div className="homeContainer">
          <HeaderAdmin />
          <div className="widgets">
            <Widget type="customer" totalUser={totalUser} />
            <Widget type="message" totalMessages={totalMessages} />
          </div>
          <div className="charts">
            <Featured />
            <Chart title="Số lượng người online trong ngày" aspect={2 / 1} />
          </div>
        </div>
      </>
    </div>
  );
};

export default Home;

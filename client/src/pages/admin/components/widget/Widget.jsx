import React from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import "./widget.scss";
import { Link } from "react-router-dom";

const Widget = ({ type, totalUser, totalMessages }) => {
  let data;
  const diff = 30;

  switch (type) {
    case "customer":
      data = {
        title: "NGƯỜI DÙNG",
        amount: totalUser.length,
        link: (
          <Link
            to="/users"
            style={{ textDecoration: "none", color: "#616161" }}
          >
            See details
          </Link>
        ),
        icon: (
          <PersonOutlineOutlinedIcon
            className="icon"
            style={{ color: "crimson", backgroundColor: "#ff000033" }}
          />
        ),
      };
      break;
    case "message":
      data = {
        title: "TIN NHẮN",
        amount: totalMessages.length,
        link: (
          <Link
            to="/allMessage"
            style={{ textDecoration: "none", color: "#616161" }}
          >
            See details
          </Link>
        ),
        icon: (
          <MailOutlineIcon
            className="icon"
            style={{ color: "goldenrod", backgroundColor: "#daa52033" }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.amount}</span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff}%
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;

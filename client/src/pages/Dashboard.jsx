import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, getGenderUser, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import CardProfile from "../components/CardProfile";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";

export default function Dashboard() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  // useEffect(() => {
  //   document.title = "Dating";
  //   toast.warning(
  //     `Vui lòng bạn điền câu trả lời câu hỏi trong phần Questions nhé!. Cảm ơn ❤️`,
  //     toastOptions
  //   );
  // }, [1000]);

  useEffect(() => {
    const fetchData = async () => {
      if (
        !localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY || "dating")
      ) {
        navigate("/login");
      } else {
        setCurrentUser(
          await JSON.parse(
            localStorage.getItem(
              process.env.REACT_APP_LOCALHOST_KEY || "dating"
            )
          )
        );
      }
    };
    fetchData();
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const getAllUser = async () => {
      if (currentUser) {
        if (currentUser?.gender_like === "every") {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          const data = await axios.get(`${getGenderUser}`, {
            params: { gender_like: currentUser.gender_like },
          });
          setContacts(data.data.users);
        }
      }
    };
    getAllUser();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
      <Container>
        <div className="container">
          <Navbar contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <CardProfile contacts={contacts} currentUser={currentUser} />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </Container>
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

// import React from "react";

// const Dashboard = () => {
//   return <div>Dashboard</div>;
// };

// export default Dashboard;

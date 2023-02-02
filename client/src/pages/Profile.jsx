import React, { useEffect, useState } from "react";
import "./admin/pages/new/new.scss";
import defaultProfile from "./admin/assets/person/DefaultProfile.jpg";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getProfileUser } from "../utils/APIRoutes";
import styled from "styled-components";

const Profile = ({ title }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (
        !localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY || "dating")
      ) {
        navigate("/login");
      }
    };
    fetchData();
  }, [navigate]);

  const {
    fullName,
    email,
    age,
    desc,
    gender,
    address,
    avatarImage,
    year,
    gender_like,
  } = userProfile;

  useEffect(() => {
    document.title = `Proflie ${fullName}`;
  });

  useEffect(() => {
    const getAllUser = async () => {
      const data = await axios.get(`${getProfileUser}/` + id);
      setUserProfile(data.data.users);
    };
    getAllUser();
  }, [id]);

  const goHome = () => {
    navigate("/");
  };

  const goQuestion = () => {
    navigate(`/question/${userProfile._id}`);
  };
  return (
    <>
      <Container>
        <div className="container">
          <div className="new" style={{ backgroundColor: "#0d0d30" }}>
            <div className="newContainer">
              <div className="top">
                <h1 style={{ color: "#fff" }}>
                  {title}
                  {fullName}
                </h1>
              </div>
              <div className="bottom" style={{ height: "27rem", zIndex: 10 }}>
                <div className="left">
                  <img
                    src={avatarImage || defaultProfile}
                    alt="avatar"
                    className="image"
                    style={{
                      width: "15rem",
                      height: "25rem",
                      transform: "translateY(2vh)",
                      borderRadius: 0,
                      objectFit: "unset",
                    }}
                  />
                </div>
                <div className="right">
                  <form>
                    <div className="formInput">
                      <label>Email</label>
                      <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={email || ""}
                        disabled
                        style={{ color: "#fff" }}
                      />
                    </div>

                    <div className="formInput">
                      <label>Tuổi</label>
                      <input
                        type="text"
                        name="age"
                        placeholder="Tuổi"
                        value={age || ""}
                        disabled
                        style={{ color: "#fff" }}
                      />
                    </div>

                    <div className="formInput">
                      <label>Họ và tên</label>
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Họ và tên"
                        disabled
                        style={{ color: "#fff" }}
                        value={fullName || ""}
                      />
                    </div>

                    <div className="formInput">
                      <label>Địa chỉ</label>
                      <input
                        type="text"
                        name="address"
                        placeholder="Địa chỉ"
                        disabled
                        value={address || ""}
                        style={{ color: "#fff" }}
                      />
                    </div>

                    <div className="formInput">
                      <label>Năm sinh</label>
                      <input
                        type="text"
                        name="year"
                        placeholder="Năm sinh"
                        disabled
                        value={year || ""}
                        style={{ color: "#fff" }}
                      />
                    </div>

                    <div className="formInput">
                      <label htmlFor="gender">Giới tính</label>

                      <select
                        name="gender"
                        id="gender"
                        value={gender || ""}
                        disabled
                        style={{ color: "#fff", backgroundColor: "#0d0d30" }}
                      >
                        <option>Giới tính</option>
                        <option value="man">Nam</option>
                        <option value="woman">Nữ</option>
                      </select>
                    </div>

                    <div className="formInput">
                      <label htmlFor="gender_like">
                        Giới tính được quan tâm
                      </label>

                      <select
                        name="gender_like"
                        id="gender_like"
                        value={gender_like || ""}
                        disabled
                        style={{ color: "#fff", backgroundColor: "#0d0d30" }}
                      >
                        <option>Giới tính</option>
                        <option value="man">Nam</option>
                        <option value="woman">Nữ</option>
                      </select>
                    </div>

                    <div className="formInput">
                      <label>Giới thiệu</label>
                      <textarea
                        name="desc"
                        placeholder="Nói gì về bạn...."
                        rows="2"
                        cols="50"
                        disabled
                        value={desc || ""}
                        style={{ color: "#fff" }}
                      />
                    </div>

                    <button onClick={() => goHome()}>Home</button>
                    <button onClick={() => goQuestion()}>Question</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  color: #fff;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Profile;

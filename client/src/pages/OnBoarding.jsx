import React, { useEffect, useState } from "react";
import "./admin/pages/new/new.scss";
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import defaultProfile from "./admin/assets/person/DefaultProfile.jpg";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { updateRoute, getProfileUser } from "../utils/APIRoutes";
import styled from "styled-components";

const OnBoarding = ({ title }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [userProfile, setUserProfile] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

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
    username,
    fullName,
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

  const handleChange = (event) => {
    setUserProfile({
      ...userProfile,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    const getAllUser = async () => {
      const data = await axios.get(`${getProfileUser}/` + id);
      setUserProfile(data.data.users);
    };
    getAllUser();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userProfile) {
      const { data } = await axios.post(`${updateRoute}/` + id, userProfile);
      localStorage.setItem(
        process.env.REACT_APP_LOCALHOST_KEY || "dating",
        JSON.stringify(data.user)
      );
      window.location.href = `/`;
    } else {
      toast.error("Có lỗi xảy ra 😢 Xin thử lại.", toastOptions);
    }
  };

  const postImage = (pics) => {
    setUploadingImage(true);
    if (pics === undefined) {
      toast.warn("Vui lòng thêm ảnh đại diện!");
      return;
    }
    if (pics.type === "image/png" || "image/jpg") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "letiendat");
      data.append("cloud_name", "letiendat");
      fetch("https://api.cloudinary.com/v1_1/letiendat/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setUserProfile({
            ...userProfile,
            ["avatarImage"]: data.url.toString(),
          });
          setFile(data.url.toString());
          setUploadingImage(false);
        })
        .catch((err) => {
          toast.error(err);
          setUploadingImage(false);
        });
      toast.warn("Đang upload ảnh, Mong bạn đợi một tý nhá ❤️!", toastOptions);
    } else {
      toast.error(
        "Định dạng Hình ảnh không hợp lệ\n Chỉ chấp nhận .png và .jpg"
      );
      setUploadingImage(false);
      return;
    }
  };

  const goHome = () => {
    navigate("/");
  };

  const goQuestion = () => {
    navigate(`/editQuestion/${userProfile._id}`);
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
                    src={file || avatarImage || defaultProfile}
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
                <div className="right" style={{ overflow: "auto" }}>
                  <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="formInput">
                      <label htmlFor="file">
                        Image: <DriveFolderUploadOutlined className="icon" />
                      </label>
                      <input
                        type="file"
                        id="file"
                        style={{ display: "none" }}
                        onChange={(e) => postImage(e.target.files[0])}
                      />
                    </div>

                    <div className="formInput">
                      <label>Username</label>
                      <input
                        type="text"
                        name="username"
                        placeholder="username"
                        value={username || ""}
                        disabled
                        style={{ color: "#fff" }}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>

                    <div className="formInput">
                      <label>Họ và tên</label>
                      <input
                        onChange={(e) => handleChange(e)}
                        type="text"
                        name="fullName"
                        placeholder="Họ và tên"
                        required={true}
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
                        value={address || ""}
                        required={true}
                        style={{ color: "#fff" }}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>

                    <div className="formInput">
                      <label>Năm sinh</label>
                      <input
                        type="text"
                        name="year"
                        placeholder="Năm sinh"
                        value={year || ""}
                        required={true}
                        style={{ color: "#fff" }}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>

                    <div className="formInput">
                      <label htmlFor="gender">Giới tính</label>

                      <select
                        name="gender"
                        id="gender"
                        value={gender || ""}
                        required={true}
                        style={{ color: "#fff", backgroundColor: "#0d0d30" }}
                        onChange={(e) => handleChange(e)}
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
                        required={true}
                        style={{ color: "#fff", backgroundColor: "#0d0d30" }}
                        onChange={(e) => handleChange(e)}
                      >
                        <option>Giới tính</option>
                        <option value="man">Nam</option>
                        <option value="woman">Nữ</option>
                        <option value="every">Mọi người</option>
                      </select>
                    </div>

                    <div className="formInput">
                      <label>Giới thiệu</label>
                      <textarea
                        name="desc"
                        placeholder="Nói gì về bạn...."
                        rows="2"
                        cols="50"
                        value={desc || ""}
                        required={true}
                        style={{ color: "#fff" }}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>

                    <button onClick={() => goHome()}>Home</button>
                    <button onClick={() => goQuestion()}>Question</button>
                    <button type="submit">Send</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {uploadingImage ? <ToastContainer /> : ""}
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
    width: 85vw;
    background-color: #00000076;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default OnBoarding;

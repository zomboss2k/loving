import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import HeaderAdmin from "../../components/headerAdmin/HeaderAdmin";
import "./new.scss";
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import defaultProfile from "../../assets/person/DefaultProfile.jpg";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getProfileUser, updateRoute } from "../../../../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";

const New = ({ title }) => {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [userProfile, setUserProfile] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const {
    username,
    fullName,
    email,
    desc,
    gender,
    address,
    avatarImage,
    year,
    age,
    gender_like,
  } = userProfile;

  useEffect(() => {
    document.title = `Proflie ${fullName}`;
  });

  const handleChange = (event) => {
    setUserProfile({ ...userProfile, [event.target.name]: event.target.value });
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
    try {
      if (userProfile.rule === 0) {
        const { data } = await axios.post(`${updateRoute}/` + id, userProfile);
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        toast.success("Bạn đã cập nhật thành công ❤", toastOptions);
        navigate("/users");
      } else {
        await axios.post(`${updateRoute}/` + id, userProfile);
        toast.success("Bạn đã cật thành công ❤", toastOptions);
        navigate("/users");
      }
    } catch (error) {
      toast.error("Lỗi đặt hình đại diện. Vui lòng thử lại.", toastOptions);
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

  return (
    <>
      <div className="new">
        <Sidebar />
        <div className="newContainer">
          <HeaderAdmin />
          <div className="top">
            <h1>
              {title}
              {fullName}
            </h1>
          </div>
          <div className="bottom">
            <div className="left">
              <img
                src={file || avatarImage || defaultProfile}
                alt="avatar"
                className="image"
              />
            </div>
            <div className="right">
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
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div className="formInput">
                  <label>Email</label>
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={email || ""}
                    disabled
                    onChange={(e) => handleChange(e)}
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
                    onChange={(e) => handleChange(e)}
                  >
                    <option>Giới tính</option>
                    <option value="man">Nam</option>
                    <option value="woman">Nữ</option>
                  </select>
                </div>

                <div className="formInput">
                  <label htmlFor="gender_like">Giới tính được quan tâm</label>

                  <select
                    name="gender_like"
                    id="gender_like"
                    value={gender_like || ""}
                    required={true}
                    onChange={(e) => handleChange(e)}
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
                    value={desc || ""}
                    required={true}
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <button type="submit">Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {uploadingImage ? <ToastContainer /> : ""}
    </>
  );
};

export default New;

import React, { useEffect, useState } from "react";
import "./admin/pages/new/new.scss";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { updateRoute, getProfileUser } from "../utils/APIRoutes";
import styled from "styled-components";

const EditQuestion = ({ title }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState("");

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

  const { fullName, ques1, ques2, ques3, ques4, ques5, ques6 } = userProfile;

  useEffect(() => {
    document.title = `Question ${fullName}`;
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
      window.location.href = "/";
    } else {
      toast.error("Đã có lỗi xảy ra. Vui lòng thử lại", toastOptions);
    }
  };

  const goHome = () => {
    navigate("/");
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
                <div
                  className="right"
                  style={{ overflow: "auto", marginTop: "8vh" }}
                >
                  <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="formInput">
                      <label>
                        Trong lúc yêu nhau, anh/em thích được khen ngợi vì điều
                        gì?
                      </label>
                      <input
                        type="text"
                        name="ques1"
                        placeholder="Câu hỏi 1"
                        value={ques1 || ""}
                        style={{ color: "#fff" }}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>

                    <div className="formInput">
                      <label>
                        Những điểm xấu nào mà anh/em muốn được thông cảm?
                      </label>
                      <input
                        onChange={(e) => handleChange(e)}
                        type="text"
                        name="ques2"
                        placeholder="Câu hỏi 2"
                        style={{ color: "#fff" }}
                        value={ques2 || ""}
                      />
                    </div>

                    <div className="formInput">
                      <label>
                        Những điểm xấu nào mà anh/em không thể chấp nhận được?
                      </label>
                      <input
                        type="text"
                        name="ques3"
                        placeholder="Câu hỏi 3"
                        value={ques3 || ""}
                        style={{ color: "#fff" }}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>

                    <div className="formInput">
                      <label>
                        “Nếu được gặp lại chính mình trước lúc quen nhau, anh/em
                        sẽ nói gì về mối quan hệ này?
                      </label>
                      <input
                        type="text"
                        name="ques4"
                        placeholder="Câu hỏi 4"
                        value={ques4 || ""}
                        style={{ color: "#fff" }}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>

                    <div className="formInput">
                      <label>
                        Điều gì về anh mà anh nghĩ em đã hiểu sai rồi?
                      </label>
                      <input
                        onChange={(e) => handleChange(e)}
                        type="text"
                        name="ques5"
                        placeholder="Câu hỏi 5"
                        style={{ color: "#fff" }}
                        value={ques5 || ""}
                      />
                    </div>

                    <div className="formInput">
                      <label>
                        Em nghĩ anh nên thay đổi điều gì để mối quan hệ này tốt
                        hơn?
                      </label>
                      <input
                        type="text"
                        name="ques6"
                        placeholder="Câu hỏi 6"
                        value={ques6 || ""}
                        style={{ color: "#fff" }}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => goHome()}
                      style={{ width: "225px" }}
                    >
                      Home
                    </button>

                    <button type="submit" style={{ width: "225px" }}>
                      Send
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <ToastContainer />
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

export default EditQuestion;

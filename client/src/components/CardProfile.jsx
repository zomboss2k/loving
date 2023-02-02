import React, { useState } from "react";
import styled from "styled-components";
import TinderCard from "react-tinder-card";
import { useNavigate } from "react-router-dom";

export default function CardProfile({ contacts, currentUser }) {
  const navigate = useNavigate();
  const [lastDirection, setLastDirection] = useState();

  // const ids = currentUser?._id;

  // const updateMatches = async (matchedUserId) => {
  //   try {
  //     await axios.put(`${addMatch}`, {
  //       ids,
  //       matchedUserId,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const swiped = (direction, swipedUserId) => {
    if (direction === "right") {
      console.log("quẹt phải");
    }
    setLastDirection(direction);
  };

  // const matchedUserIds = currentUser?.matches
  //   .map(({ user_id }) => user_id)
  //   .concat(ids);

  // const filteredGenderedUsers = contacts?.filter(
  //   (genderedUser) => !matchedUserIds.includes(genderedUser.user_id)
  // );

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
    console.log(lastDirection);
  };

  const changeCurrentChat = (index) => {
    navigate(`/users/${index}`);
  };

  return (
    <>
      {currentUser && (
        <Container>
          <div className="dashboard">
            <div className="swipe-container">
              <div className="card-container">
                {contacts?.map((genderLike) => (
                  <TinderCard
                    className="swipe"
                    key={genderLike._id}
                    onSwipe={(dir) => swiped(dir, genderLike._id)}
                    onCardLeftScreen={() => outOfFrame(genderLike.fullName)}
                  >
                    <div className="flip-card">
                      <div className="flip-card-inner">
                        <div className="flip-card-front">
                          <img
                            className="flip-card-img"
                            src={genderLike.avatarImage}
                            alt=""
                          />
                        </div>
                        <div className="flip-card-back">
                          <div className="card-container-back">
                            <span className="pro">{genderLike.age}</span>
                            <img
                              className="round"
                              src={genderLike.avatarImage}
                              alt="user"
                            />
                            <h3>{genderLike.fullName}</h3>
                            <h6>Giới tính: {genderLike.gender}</h6>
                            <h6>Sống tại: {genderLike.address}</h6>
                            <h6>Giới tính: {genderLike.email}</h6>
                            <p>{genderLike.desc}</p>
                            <button
                              className="primary"
                              onClick={() => changeCurrentChat(genderLike._id)}
                            >
                              Profile
                            </button>

                            {/* <div className="interests">
                              <h6>Sở thích</h6>
                              <ul>
                                {genderLike?.interests.map((interest) => (
                                  <li>{interest}</li>
                                ))}
                              </ul>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TinderCard>
                ))}
              </div>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  span {
    color: #4e0eff;
  }
`;

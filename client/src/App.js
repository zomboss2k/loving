import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import PageNone from "./pages/PageNone";
import Login from "./pages/Login";
import Register from "./pages/Register";
import InputTag from "./components/InputTag";
import Home from "./pages/admin/pages/home/Home";
import Customers from "./pages/admin/pages/customers/Customers";
import New from "./pages/admin/pages/new/New";
import OnBoarding from "./pages/OnBoarding";
import Profile from "./pages/Profile";
import ListMessage from "./pages/admin/pages/product/ListMessage";
import Question from "./pages/Question.jsx";
import EditQuestion from "./pages/EditQuestion";
import Demo from "./pages/Demo";

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (
        (await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY || "dating")
        ).rule) === 0
      ) {
        return setIsAdmin(true);
      }
    };
    return fetchData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={isAdmin ? <Home /> : <Dashboard />} />
        <Route path="/users" element={isAdmin ? <Customers /> : <PageNone />} />
        <Route
          path="/allMessage"
          element={isAdmin ? <ListMessage /> : <PageNone />}
        />
        <Route
          path="/users/:id"
          element={
            isAdmin ? (
              <New title={"Trang cá nhân: "} />
            ) : (
              <Profile title={"Trang cá nhân: "} />
            )
          }
        />
        <Route
          path="/update/:id"
          element={
            !isAdmin ? (
              <OnBoarding title={"Cập nhật trang cá nhân: "} />
            ) : (
              <PageNone />
            )
          }
        />
        <Route
          path="/question/:id"
          element={!isAdmin ? <Question /> : <PageNone />}
        />
        <Route
          path="/editQuestion/:id"
          element={!isAdmin ? <EditQuestion /> : <PageNone />}
        />
        <Route
          path="/inputTag/:id"
          element={!isAdmin ? <InputTag /> : <PageNone />}
        />

        <Route path="/*" element={<PageNone />} />
      </Routes>

      {/* <Routes>
        <Route path="/" element={<Demo />} />
      </Routes> */}
    </BrowserRouter>
  );
}

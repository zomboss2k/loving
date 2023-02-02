import React, { forwardRef, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import "./datatable.scss";
import { useNavigate } from "react-router-dom";
import { allUsersRoute, deleteUser } from "../../../../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";

const userColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "Họ và tên",
    width: 190,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.avatarImage} alt="avatar" />
          {params.row.fullName}
        </div>
      );
    },
  },
  { field: "email", headerName: "Email", width: 200 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 70,
  },
  { field: "gender", headerName: "Giới tính", width: 120 },
  { field: "address", headerName: "Địa chỉ", width: 120 },
  { field: "desc", headerName: "Giới thiệu", width: 160 },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 160,
  //   renderCell: (params) => {
  //     return (
  //       <div className={`cellWithStatus ${params.row.status}`}>
  //         {params.row.status}
  //       </div>
  //     );
  //   },
  // },
];

const Datatable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    document.title = "Danh sách người dùng.";
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
    const getAllUser = async () => {
      if (currentUser) {
        await axios.get(`${allUsersRoute}/${currentUser._id}`).then((res) => {
          setData(res.data);
        });
      }
    };
    getAllUser();
  }, [currentUser]);

  const handleDelete = async (_id) => {
    if (await axios.delete(`${deleteUser}/${_id}`)) {
      toast.success(`Bạn đã xóa id: ${_id} thành công ❤️`, toastOptions);
      setData(data.filter((item) => item._id !== _id));
    }
  };

  const handleView = (_id) => {
    const v = data.find((item) => item._id === _id);
    navigate(`/users/${v._id}`);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link to="/users/userId" style={{ textDecoration: "none" }}></Link> */}
            <div
              className="viewButton"
              onClick={() => handleView(params.row._id)}
            >
              View
            </div>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="datatable">
        <div className="datatableTitle">
          <span>Người dùng</span>
          {/* <Link to="/users/userId/new" style={{ textDecoration: "none" }}>
            <span className="link">Thêm User</span>
          </Link> */}
        </div>
        <DataGrid
          className="datagrid"
          rows={data}
          getRowId={(row) => row._id}
          columns={userColumns.concat(actionColumn)}
          pageSize={8}
          rowsPerPageOptions={[8]}
          checkboxSelection
        />
      </div>
      <ToastContainer />
    </>
  );
};
export default forwardRef(Datatable);

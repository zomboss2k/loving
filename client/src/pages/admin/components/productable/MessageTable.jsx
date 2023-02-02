import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./productable.scss";

const MessageTable = ({ allMessages }) => {
  return (
    <div className="productable">
      <Paper sx={{ width: "100%" }}>
        <TableContainer sx={{ maxHeight: 460 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell className="tableCell">ID người gửi</TableCell>
                <TableCell className="tableCell">ID người nhận</TableCell>
                <TableCell className="tableCell">Tin nhắn</TableCell>
                <TableCell className="tableCell">Thời gian</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allMessages.map((row) => (
                <TableRow key={row._id}>
                  {row.users.map((users, index) => (
                    <TableCell key={index} className="tableCell">
                      {users}
                    </TableCell>
                  ))}
                  <TableCell className="tableCell">
                    {row.message.text}
                  </TableCell>
                  <TableCell className="tableCell">{row.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default MessageTable;

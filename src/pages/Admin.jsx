import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersWhoBooked } from "../redux/slices/usersSlice";

function Admin() {
  const dispatch = useDispatch();
  const squares = useSelector((state) => state.squares);
  const ids = squares.filter((item) => item.userId).map((item) => item.userId);
  const { whoBooked } = useSelector((state) => state.users);
  const [bookingList, setBookingList] = useState(null);

  useEffect(() => {
    const booking = {};
    whoBooked.forEach((user) => {
      squares.forEach((square) => {
        if (user.id === square.userId) {
          if (!booking[user.id]) {
            booking[user.id] = {};
            booking[user.id].list = [];
            booking[user.id].username = user.username;
          }
          booking[user.id].list.push(square.id);
        }
      });
    });
    setBookingList(Object.values(booking));

    dispatch(fetchUsersWhoBooked({ ids }));
  }, []);
  /*   const bookedSquaresById = whoBooked.map((user) =>
    squares
      .filter((square) => square.userId === user.id)
      .map((square) => ({ squareId: square.id, userId: user.id }))
  ); */

  return (
    <Container>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Booked squares</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookingList &&
              bookingList.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.username}</TableCell>
                  <TableCell>
                    {item.list.map((listItem) => listItem + " ")}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Admin;

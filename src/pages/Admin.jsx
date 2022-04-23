import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
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
    dispatch(fetchUsersWhoBooked({ ids }));
  }, []);

  useEffect(() => {
    if (whoBooked) {
      const booking = {};
      whoBooked.forEach((user) => {
        squares.forEach((square) => {
          if (user.id === square.userId) {
            if (!booking[user.id]) {
              booking[user.id] = {};
              booking[user.id].list = [];
              booking[user.id].username = user.username;
            }
            booking[user.id].list.push({
              id: square.id,
              status: square.status,
            });
          }
        });
      });
      setBookingList(Object.values(booking));
    }
  }, [whoBooked]);

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
              bookingList.map((item, index) => (
                <TableRow key={item.list}>
                  <TableCell>{item.username}</TableCell>
                  <TableCell>
                    {item.list.map((listItem) => (
                      <div key={listItem.id}>
                        <Typography type="p">
                          {listItem.id + " " + listItem.status}
                        </Typography>
                      </div>
                    ))}
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

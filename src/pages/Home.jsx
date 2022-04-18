import React, { useEffect } from "react";
import { Container, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../redux/slices/userSlice";
import { Box } from "@mui/system";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(({ auth }) => auth.isLoggedIn);
  const userData = useSelector(({ user }) => user.data);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchUserData({}));
    }
  }, []);

  return (
    <>
      <Container>
        {userData ? (
          <Box>
            <Typography type="h3">Username: {userData.username}</Typography>
            <Typography type="p">Email: {userData.email}</Typography>
            <Typography type="p">Role: {userData.role}</Typography>
          </Box>
        ) : (
          <Typography type="p">No user data</Typography>
        )}
      </Container>
    </>
  );
}

export default Home;

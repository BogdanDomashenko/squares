import React, { useEffect } from "react";
import { Container, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config";
import api from "../services/api";
import localStorageService from "../services/localStorageService";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../redux/slices/userSlice";
import { Box } from "@mui/system";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector(({ user }) => user.data);

  useEffect(() => {
    dispatch(fetchUserData({}));
  }, []);

  return (
    <>
      <Container>
        {userData && (
          <Box>
            <Typography type="h3">Username: {userData.username}</Typography>
            <Typography type="p">Email: {userData.email}</Typography>
            <Typography type="p">Role: {userData.role}</Typography>
          </Box>
        )}
      </Container>
    </>
  );
}

export default Home;

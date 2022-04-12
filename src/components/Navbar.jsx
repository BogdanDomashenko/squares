import React from "react";
import { Container, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken } from "../redux/slices/userSlice";
import localStorageService from "../services/localStorageService";
import { logout } from "../redux/slices/authSlice";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickLogout = () => {
    dispatch(logout({}));
  };

  return (
    <div>
      <Container>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Link to="/">
              <Button>Home</Button>
            </Link>
            <Link to="/booking">
              <Button>Booking</Button>
            </Link>
          </div>
          <div>
            <Button
              onClick={onClickLogout}
              color="secondary"
              variant="outlined"
            >
              Logout
            </Button>
          </div>
        </Box>
      </Container>
    </div>
  );
}

export default Navbar;

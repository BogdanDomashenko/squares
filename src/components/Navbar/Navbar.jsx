import React from "react";
import { Container, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { setModalVisible } from "../../redux/slices/modalsSlice";

const buttonsWrapperStyle = {
  "& :not(:last-child)": {
    mr: "10px",
  },
};

function Navbar() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onClickLogout = () => {
    dispatch(logout({}));
  };

  const onClickLogin = () => {
    dispatch(setModalVisible({ modal: "login", visible: true }));
  };

  const onClickSignup = () => {
    dispatch(setModalVisible({ modal: "signup", visible: true }));
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
            {isLoggedIn ? (
              <Button
                onClick={onClickLogout}
                color="secondary"
                variant="outlined"
              >
                Logout
              </Button>
            ) : (
              <Box sx={buttonsWrapperStyle}>
                <Button
                  onClick={onClickSignup}
                  color="secondary"
                  variant="outlined"
                >
                  Sign Up
                </Button>
                <Button
                  onClick={onClickLogin}
                  color="secondary"
                  variant="outlined"
                >
                  Login
                </Button>
              </Box>
            )}
          </div>
        </Box>
      </Container>
    </div>
  );
}

export default Navbar;

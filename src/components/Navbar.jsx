import React from "react";
import { Container, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const onClickLogout = () => {
    localStorage.removeItem("userToken");
    axios
      .get("http://localhost:3001/auth/logout")
      .then((data) => {
        localStorage.removeItem("userToken");
        navigate("/login", { replace: true });
      })
      .catch((error) => console.log(error));
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

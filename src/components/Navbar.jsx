import React from "react";
import { Container, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <Container>
        <Link to="/">
          <Button>Home</Button>
        </Link>
        <Link to="/booking">
          <Button>Booking</Button>
        </Link>
      </Container>
    </div>
  );
}

export default Navbar;

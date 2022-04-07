import React from "react";
import { Container, Button } from "@mui/material";
import { Navbar } from "../components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <Container>
        Home
        <br />
      </Container>
    </>
  );
}

export default Home;

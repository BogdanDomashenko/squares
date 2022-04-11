import React, { useEffect } from "react";
import { Container, Button } from "@mui/material";
import { Navbar } from "../components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config";
import api from "../services/api";
import localStorageService from "../services/localStorageService";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`${config.api}/user/data`)
      .then(({ data }) => console.log(data))
      .catch((error) => {
        if (error.response.status === 401) {
          //navigate("/login", { replace: true });
        }
      });
  });

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

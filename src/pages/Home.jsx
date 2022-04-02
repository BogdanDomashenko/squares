import React from "react";
import { Container, Button } from "@mui/material";
import { Navbar } from "../components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config";

function Home() {
  const navigate = useNavigate();

  const testButtonClick = () => {
    const token = localStorage.getItem("userToken");

    axios
      .post(config.api + "/token", { token })
      .then(({ data, headers }) => {
        localStorage.setItem("userToken", headers.authorization);
      })
      .catch((error) => {
        switch (error.toJSON().status) {
          case 401:
            localStorage.removeItem("userToken");
            navigate("/login", { replace: true });
            break;
          default:
            console.error(error);
            break;
        }
      });
  };

  return (
    <>
      <Navbar />
      <Container>
        Home
        <br />
        <Button
          onClick={testButtonClick}
          variant="outlined"
          sx={{ marginTop: "10px" }}
        >
          test
        </Button>
      </Container>
    </>
  );
}

export default Home;

import React from "react";
import { Container, Button } from "@mui/material";
import { Navbar } from "../components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const navigate = useNavigate();

  const testButtonClick = () => {
    axios
      .get("http://localhost:3001/token")
      .then(({ data }) => console.log(data))
      .catch((error) => {
        localStorage.removeItem("userToken");
        navigate("/login", { replace: true });
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

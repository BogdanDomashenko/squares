import React from "react";
import { Container, Box, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import md5 from "md5";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  const [loginError, setLoginError] = React.useState(null);

  React.useEffect(() => {
    loginError && setLoginError(null);
  }, [userEmail, userPassword]);

  const loginButtonClick = () => {
    // if (userEmail.length && userPassword.length) {
    //   if (validator.isEmail(userEmail)) {
    //     axios
    //       .post("http://localhost:3001/login", {
    //         email: userEmail,
    //       })
    //       .then(({ data }) => {
    //         console.log(data);
    //       })
    //       .catch((error) => {
    //         console.error(error);
    //       });

    //     // localStorage.setItem("userToken", md5(userEmail));
    //     // navigate("/", { replace: true });
    //   } else {
    //     setLoginError("Некорректная почта");
    //   }
    // } else {
    //   setLoginError("Все поля должны быть заполнены");
    // }

    axios
      .post("http://localhost:3001/login", {
        email: userEmail,
        password: userPassword,
      })
      .then(({ data }) => {
        console.log(data);
      })
      .catch(({ response }) => {
        switch (response.status) {
          case 406:
            setLoginError("Некорректная почта");
            break;
          case 411:
            setLoginError("Все поля должны быть заполнены");
          default:
            break;
        }
      });
  };

  const emailChangeHandler = (e) => {
    setUserEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setUserPassword(e.target.value);
  };

  const testButtonClick = () => {
    axios
      .get("http://localhost:3001/token")
      .then(({ data }) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <Container>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <h3>Sign in</h3>
          <TextField
            id="userEmail"
            label="Email"
            variant="outlined"
            type="email"
            value={userEmail}
            onChange={emailChangeHandler}
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            sx={{ marginTop: "10px" }}
            value={userPassword}
            onChange={passwordChangeHandler}
          />
        </Box>
        <Button
          onClick={loginButtonClick}
          variant="outlined"
          sx={{ marginTop: "10px" }}
        >
          Login
        </Button>
        <br />
        <Button
          onClick={testButtonClick}
          variant="outlined"
          sx={{ marginTop: "10px" }}
        >
          test
        </Button>
        <br />
        {loginError && loginError}
      </Container>
    </div>
  );
}

export default Login;

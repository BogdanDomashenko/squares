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

  const [emailError, setEmailError] = React.useState(null);
  const [passwordError, setPasswordError] = React.useState(null);

  React.useEffect(() => {
    loginError && setLoginError(null);
    emailError && setEmailError(false);
    passwordError && setPasswordError(false);
  }, [userEmail, userPassword]);

  const loginButtonClick = () => {
    if (userEmail && userPassword) {
      if (validator.isEmail(userEmail)) {
        axios
          .post("http://localhost:3001/login", {
            email: userEmail,
            password: userPassword,
          })
          .then(({ data }) => {
            localStorage.setItem("userToken", data.token);
            navigate("/", { replace: true });
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        setEmailError(true);
        setLoginError("Некорректная почта");
      }
    } else {
      !userEmail && setEmailError(true);
      !userPassword && setPasswordError(true);
      setLoginError("Все поля должны быть заполнены");
    }

    // axios
    //   .post("http://localhost:3001/login", {
    //     email: userEmail,
    //     password: userPassword,
    //   })
    //   .then(({ data }) => {
    //     localStorage.setItem("userToken", data.token);
    //     navigate("/", { replace: true });
    //   })
    //   .catch(({ response }) => {
    //     switch (response.status) {
    //       case 406:
    //         setLoginError("Некорректная почта");
    //         break;
    //       case 411:
    //         setLoginError("Все поля должны быть заполнены");
    //       default:
    //         break;
    //     }
    //   });
  };

  const emailChangeHandler = (e) => {
    setUserEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setUserPassword(e.target.value);
  };

  return (
    <div>
      <Container>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <h3>Sign in</h3>
          <TextField
            error={emailError}
            helperText={emailError ? "Обязательное поле" : ""}
            id="userEmail"
            label="Email"
            variant="outlined"
            type="email"
            value={userEmail}
            onChange={emailChangeHandler}
          />
          <TextField
            error={passwordError}
            helperText={passwordError ? "Обязательное поле" : ""}
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
        {loginError && loginError}
      </Container>
    </div>
  );
}

export default Login;

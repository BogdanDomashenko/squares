import React from "react";
import { Container, Box, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import md5 from "md5";

function Login() {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  const [loginError, setLoginError] = React.useState(null);

  React.useEffect(() => {
    loginError && setLoginError(null);
  }, [userEmail, userPassword]);

  const loginButtonClick = () => {
    if (userEmail.length && userPassword.length) {
      if (validator.isEmail(userEmail)) {
        localStorage.setItem("userToken", md5(userEmail));
        navigate("/", { replace: true });
      } else {
        setLoginError("Некорректная почта");
      }
    } else {
      setLoginError("Все поля должны быть заполнены");
    }
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
        {loginError && loginError}
      </Container>
    </div>
  );
}

export default Login;

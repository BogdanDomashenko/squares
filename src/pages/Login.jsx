import React, { useEffect } from "react";
import { Container, Box, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import axios from "axios";
import { Form, Field } from "react-final-form";
import { setIn } from "final-form";
import * as yup from "yup";

const validate = (schema) => async (values) => {
  if (typeof schema === "function") schema = schema();

  try {
    await schema.validate(values, { abortEarly: false });
  } catch (e) {
    return e.inner.reduce((errors, error) => {
      return setIn(errors, error.path, error.message);
    }, {});
  }
};

let schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup
    .string()
    .required()
    .min(6)
    .matches(
      /^[a-zA-Z0-9]+$/ && /(?:[^`!@#$%^&*\-_=+'\/.,]*[`!@#$%^&*\-_=+'\/.,]){2}/,
      "Only alphabet, numbers, and 2 special symbols"
    ),
});

const FormStyle = {
  display: "flex",
  flexDirection: "column",
  marginTop: "10px",
};

const FieldStyle = { marginBottom: "10px" };

function Login() {
  const navigate = useNavigate();

  // !!OLD FORM VALIDATION!!
  // const [userEmail, setUserEmail] = React.useState("");
  // const [userPassword, setUserPassword] = React.useState("");
  // const [loginError, setLoginError] = React.useState(null);

  // const [emailError, setEmailError] = React.useState(null);
  // const [passwordError, setPasswordError] = React.useState(null);

  // React.useEffect(() => {
  //   loginError && setLoginError(null);
  //   emailError && setEmailError(false);
  //   passwordError && setPasswordError(false);
  // }, [userEmail, userPassword]);

  // const loginButtonClick = () => {
  //   if (userEmail && userPassword) {
  //     if (validator.isEmail(userEmail)) {
  //       axios
  //         .post("http://localhost:3001/login", {
  //           email: userEmail,
  //           password: userPassword,
  //         })
  //         .then(({ data }) => {
  //           localStorage.setItem("userToken", data.token);
  //           navigate("/", { replace: true });
  //         })
  //         .catch((error) => {
  //           console.error(error);
  //         });
  //     } else {
  //       setEmailError(true);
  //       setLoginError("Некорректная почта");
  //     }
  //   } else {
  //     !userEmail && setEmailError(true);
  //     !userPassword && setPasswordError(true);
  //     setLoginError("Все поля должны быть заполнены");
  //   }
  // };

  // const emailChangeHandler = (e) => {
  //   setUserEmail(e.target.value);
  // };

  // const passwordChangeHandler = (e) => {
  //   setUserPassword(e.target.value);
  // };

  const onSubmit = () => {};

  return (
    <div>
      <Container>
        {/*OLD FORM <Box sx={{ display: "flex", flexDirection: "column" }}>
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
        {loginError && loginError} */}

        <Form
          onSubmit={onSubmit}
          validate={validate(schema)}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <Box sx={FormStyle}>
                <Box sx={FieldStyle}>
                  <Field name="email">
                    {({ input, meta }) => (
                      <TextField
                        error={meta.error && meta.touched}
                        helperText={
                          meta.error && meta.touched ? meta.error : ""
                        }
                        id="userEmail"
                        label="Email"
                        variant="outlined"
                        type="email"
                        value={input.value}
                        onChange={input.onChange}
                        fullWidth
                      />
                    )}
                  </Field>
                </Box>
                <Box sx={FieldStyle}>
                  <Field name="password">
                    {({ input, meta }) => (
                      <TextField
                        error={meta.error && meta.touched}
                        helperText={
                          meta.error && meta.touched ? meta.error : ""
                        }
                        id="userPassword"
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={input.value}
                        onChange={input.onChange}
                        fullWidth
                      />
                    )}
                  </Field>
                </Box>
              </Box>
              <div className="buttons">
                <Button type="submit" variant="outlined">
                  Login
                </Button>
              </div>
            </form>
          )}
        />
      </Container>
    </div>
  );
}

export default Login;

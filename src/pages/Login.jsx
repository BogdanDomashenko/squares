import React, { useState } from "react";
import { Container, Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login, setAccessToken } from "../redux/slices/userSlice";
import { Form, Field } from "react-final-form";
import config from "../config";
import validate from "../validation/validate";
import loginSchema from "../validation/schemas/login";
import localStorageService from "../services/localStorageService";
import authService from "../services/authService";

const FormStyle = {
  display: "flex",
  flexDirection: "column",
  marginTop: "10px",
};

const FieldStyle = { marginBottom: "10px" };

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    dispatch(login(values));
    /*     try {
      const data = await authService.login(values.email, values.password);

      //dispatch(setAccessToken({ token: headers.authorization }));
      navigate("/", { replace: true });
    } catch (error) {
      if (error.response) {
        switch (error.response.data.message) {
          case "User with this email does not exist":
            return { email: error.response.data.message };
            break;
          case "Incorrect password":
            return { password: error.response.data.message };
          default:
            console.log(error);
            break;
        }
      } else {
        console.log(error);
      }
    } */
  };

  return (
    <div>
      <Container>
        <Form
          onSubmit={onSubmit}
          validate={validate(loginSchema)}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <Box sx={FormStyle}>
                <Box sx={FieldStyle}>
                  <Field name="email">
                    {({ input, meta }) => (
                      <TextField
                        error={(meta.error || meta.submitError) && meta.touched}
                        helperText={
                          meta.error || (meta.submitError && meta.touched)
                            ? meta.error || meta.submitError
                            : ""
                        }
                        id="userEmail"
                        label="Email"
                        variant="outlined"
                        type="email"
                        {...input}
                        fullWidth
                      />
                    )}
                  </Field>
                </Box>
                <Box sx={FieldStyle}>
                  <Field name="password">
                    {({ input, meta }) => (
                      <TextField
                        error={(meta.error || meta.submitError) && meta.touched}
                        helperText={
                          meta.error || (meta.submitError && meta.touched)
                            ? meta.error || meta.submitError
                            : ""
                        }
                        id="userPassword"
                        label="Password"
                        variant="outlined"
                        type="password"
                        {...input}
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

import React, { useState } from "react";
import { Container, Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken } from "../redux/slices/userSlice";
import { Form, Field } from "react-final-form";
import validate from "../validation/validate";
import loginSchema from "../validation/schemas/login";
import { login } from "../redux/slices/authSlice";

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
    try {
      await dispatch(login(values)).unwrap();
    } catch (error) {
      return error;
    }
  };

  return (
    <div>
      <Container>
        <Form
          onSubmit={onSubmit}
          validate={validate(loginSchema)}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Box sx={FormStyle}>
                <Box sx={FieldStyle}>
                  <Field name="email">
                    {({ input, meta }) => (
                      <TextField
                        error={
                          (meta.error ||
                            (meta.submitError &&
                              !meta.modifiedSinceLastSubmit)) &&
                          meta.touched
                        }
                        helperText={
                          (meta.error ||
                            (meta.submitError &&
                              !meta.modifiedSinceLastSubmit)) &&
                          meta.touched
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
                        error={
                          (meta.error ||
                            (meta.submitError &&
                              !meta.modifiedSinceLastSubmit)) &&
                          meta.touched
                        }
                        helperText={
                          (meta.error ||
                            (meta.submitError &&
                              !meta.modifiedSinceLastSubmit)) &&
                          meta.touched
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

import React from "react";
import { Container, Box, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken } from "../redux/slices/userSlice";
import { Form, Field } from "react-final-form";
import { setIn } from "final-form";
import * as yup from "yup";
import config from "../config";

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
      /^[a-zA-Z0-9]+$/ &&
        /(?:[^`!@#$%^&*\-_=+'\/.,;:]*[`!@#$%^&*\-_=+'\/.,;:]){2}/,
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
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    axios
      .post(config.api + "/auth/login", { ...data })
      .then(({ data, headers }) => {
        dispatch(setAccessToken({ token: headers.authorization }));
        navigate("/", { replace: true });
      })
      .catch((error) => console.log(error.data));
  };

  return (
    <div>
      <Container>
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
                        error={meta.error && meta.touched}
                        helperText={
                          meta.error && meta.touched ? meta.error : ""
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

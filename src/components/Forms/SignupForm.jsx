import { Box, TextField, Button, Link } from "@mui/material";

import { Form, Field } from "react-final-form";
import { useDispatch } from "react-redux";
import { setModalVisible } from "../../redux/slices/modalsSlice";
import signupSchema from "../../utils/helpers/validation/signupSchema";
import validate from "../../utils/helpers/validation/validate";

const FormStyle = {
  display: "flex",
  flexDirection: "column",
  marginTop: "10px",
};

const FieldStyle = { marginBottom: "10px" };

const buttonsStyle = {
  display: "flex",
  justifyContent: "end",
  "& :not(:last-child)": {
    mr: "10px",
  },
};

const bottomFormPanel = {
  display: "flex",
  justifyContent: "space-between",
};

const linkStyle = {
  cursor: "pointer",
};

function SignupForm({ onSubmit, onClickCancelButton }) {
  const dispatch = useDispatch();

  const handleRegisteredClick = () => {
    dispatch(setModalVisible({ modal: "signup", visible: false }));
    dispatch(setModalVisible({ modal: "login", visible: true }));
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate(signupSchema)}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Box sx={FormStyle}>
            <Box sx={FieldStyle}>
              <Field name="email">
                {({ input, meta }) => (
                  <TextField
                    error={
                      (meta.error ||
                        (meta.submitError && !meta.modifiedSinceLastSubmit)) &&
                      meta.touched
                    }
                    helperText={
                      (meta.error ||
                        (meta.submitError && !meta.modifiedSinceLastSubmit)) &&
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
          </Box>
          <Box sx={bottomFormPanel}>
            <Link sx={linkStyle} onClick={handleRegisteredClick}>
              Already registered?
            </Link>
            <Box sx={buttonsStyle}>
              {onClickCancelButton ? (
                <Button variant="outlined" onClick={onClickCancelButton}>
                  Cancel
                </Button>
              ) : (
                ""
              )}
              <Button type="submit" variant="outlined">
                Sign Up
              </Button>
            </Box>
          </Box>
        </form>
      )}
    />
  );
}

export default SignupForm;

import * as yup from "yup";

const signupSchema = yup.object().shape({
  email: yup.string().required().email(),
});

export default signupSchema;

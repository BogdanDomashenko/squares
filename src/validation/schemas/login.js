import * as yup from "yup";

let loginSchema = yup.object().shape({
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

export default loginSchema;

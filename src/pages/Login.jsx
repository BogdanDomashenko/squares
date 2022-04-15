import { Container } from "@mui/material";
import { useDispatch } from "react-redux";

import { login } from "../redux/slices/authSlice";
import LoginForm from "../components/Forms/LoginForm";

function Login() {
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
        <LoginForm onSubmit={onSubmit} />
      </Container>
    </div>
  );
}

export default Login;

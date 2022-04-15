import { Container } from "@mui/material";
import { useDispatch } from "react-redux";

import { LoginFrom } from "../components";
import { login } from "../redux/slices/authSlice";

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
        <LoginFrom onSubmit={onSubmit} />
      </Container>
    </div>
  );
}

export default Login;

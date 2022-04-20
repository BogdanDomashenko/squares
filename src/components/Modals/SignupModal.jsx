import { useEffect, useState } from "react";
import { Modal, Box, Typography } from "@mui/material";

import LoginForm from "../Forms/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "../../redux/slices/authSlice";
import { setModalVisible } from "../../redux/slices/modalsSlice";
import SignupForm from "../Forms/SignupForm";
import SignupResultForm from "../Forms/SignupResultForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  outline: "none",
  p: 4,
};

function SignupModal() {
  const dispatch = useDispatch();

  const { visible } = useSelector((state) => state.modals.signup);
  const [resultFormVisible, setResultFormVisible] = useState(false);

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  useEffect(() => {
    if (resultFormVisible) setResultFormVisible(false);
  }, [visible]);

  const hideModal = () => {
    dispatch(setModalVisible({ modal: "signup", visible: false }));
  };

  const onSubmit = async (values) => {
    try {
      const data = await dispatch(signup(values)).unwrap();
      setUsername(data.username);
      setPassword(data.password);
      setResultFormVisible(true);
    } catch (error) {
      return error;
    }
  };

  return (
    <Modal
      open={visible}
      onClose={hideModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {!resultFormVisible ? (
          <div>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Enter your email
            </Typography>
            <SignupForm onSubmit={onSubmit} onClickCancelButton={hideModal} />
          </div>
        ) : (
          <SignupResultForm username={username} password={password} />
        )}
      </Box>
    </Modal>
  );
}

export default SignupModal;

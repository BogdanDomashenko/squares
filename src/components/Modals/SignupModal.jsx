import { useState } from "react";
import { Modal, Box, Typography } from "@mui/material";

import LoginForm from "../Forms/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/authSlice";
import { setModalVisible } from "../../redux/slices/modalsSlice";
import SignupForm from "../Forms/SignupForm";

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

function LoginModal() {
  const dispatch = useDispatch();

  const { visible } = useSelector((state) => state.modals.signup);

  const hideModal = () => {
    dispatch(setModalVisible({ modal: "signup", visible: false }));
  };

  const onSubmit = async (values) => {
    try {
      await dispatch(login(values)).unwrap();
      hideModal();
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
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Enter your email
        </Typography>
        <SignupForm onSubmit={onSubmit} onClickCancelButton={hideModal} />
      </Box>
    </Modal>
  );
}

export default LoginModal;

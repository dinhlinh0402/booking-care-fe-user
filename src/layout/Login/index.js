import React, { useState } from "react";
import { Button, Modal, Stack, TextField, Typography } from "@mui/material";
import LoginApi from "../../apis/Login";

function Login({ reset, modal, setModal, setRegisterModal, setReset }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleClose = () => {
    setModal(false);
  };

  const GetLogin = async () => {
    try {
      const response = await LoginApi.addNewUser({
        email,
        password,
      });
      localStorage.setItem("accessToken", response.data.token.accessToken);
      localStorage.setItem("userName", response.data.user.lastName);
      setReset(reset + 1);
      setModal(false);
    } catch (error) {
      console.error(error.response);
    }
  };

  return (
    <Stack>
      <Modal open={modal} onClose={handleClose}>
        <Stack
          p={5}
          justifyContent="center"
          alignItems="center"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "white",
            border: "2px solid #333",
            boxShadow: 24,
            borderRadius: 2,
            p: 4,
          }}
          spacing={5}
        >
          <Typography variant="h2">Log in</Typography>
          <Stack width="80%" py={2} spacing={2}>
            <TextField
              flex={1}
              label="Email"
              type="email"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              flex={1}
              label="Mật Khẩu"
              type="password"
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button size="small" variant="contained" onClick={GetLogin}>
              Login
            </Button>
          </Stack>

          <Button variant="text" onClick={() => setRegisterModal(true)}>
            You don't have an account?
          </Button>
        </Stack>
      </Modal>
    </Stack>
  );
}

export default Login;

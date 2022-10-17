import React, { useState } from "react";
import { Button, Modal, Stack, TextField, Typography } from "@mui/material";
import RegisterApi from "../../apis/Register";

function Register({ modal, setModal }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [middleName, setMiddleName] = useState();
  const [lastName, setLastName] = useState();

  const handleClose = () => setModal(false);

  const GetRegister = async () => {
    try {
      await RegisterApi.addNewUser({
        email,
        firstName,
        middleName,
        lastName,
        password,
        confirmPassword,
      });
      setModal(false);
      alert("Dang ky thanh cong");
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
            width: 800,
            bgcolor: "white",
            border: "2px solid #333",
            boxShadow: 24,
            borderRadius: 2,
            p: 4,
          }}
          spacing={5}
        >
          <Typography variant="h2">Register</Typography>
          <Stack width="80%" py={2} spacing={2}>
            <TextField
              flex={1}
              label="Email"
              type="email"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Stack direction="row" spacing={2}>
              <TextField
                flex={1}
                label="First Name"
                variant="outlined"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                flex={1}
                label="Middle Name"
                variant="outlined"
                onChange={(e) => setMiddleName(e.target.value)}
              />
              <TextField
                flex={1}
                label="Last Name"
                variant="outlined"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Stack>
            <TextField
              flex={1}
              type="password"
              label="Password"
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              flex={1}
              type="password"
              label="Confirm Password"
              variant="outlined"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button variant="contained" onClick={GetRegister}>
              Register
            </Button>
          </Stack>
        </Stack>
      </Modal>
    </Stack>
  );
}

export default Register;

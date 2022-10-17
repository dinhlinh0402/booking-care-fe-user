import React, { useState, useEffect, useCallback } from "react";
import { DeleteForever, Edit } from "@mui/icons-material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Modal,
  TextField,
  Button,
} from "@mui/material";
import ClinicApi from "../../../apis/ClinicApi";
import baseURL from "../../../utils";

export default function Clinic() {
  const [clinics, setClinics] = useState();
  const [changeId, setChangeId] = useState();
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [specialties, setSpecialties] = useState();
  const [image, setImage] = useState();

  const handleClose = () => {
    setChangeId();
    setModal(false);
  };

  const getClinic = useCallback(async () => {
    try {
      const response = await ClinicApi.getAllClinics();
      setClinics(response.data.data);
    } catch (error) {
      console.error(error.response);
    }
  }, []);

  useEffect(() => {
    getClinic();
  }, [getClinic]);

  const handleDelete = (id) => {
    ClinicApi.deleteClinic(id);

    setTimeout(() => {
      getClinic();
    }, 500);
  };

  const handleAdd = () => {
    let formData = new FormData();
    formData.append("name", name);
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("specialties", specialties);
    formData.append("file", image[0]);
    ClinicApi.addNewClinic(formData);
    setTimeout(() => {
      getClinic();
    }, 500);
    setModal(false);
  };

  const handleUpdate = () => {
    let formData = new FormData();
    formData.append("name", name);
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("specialties", specialties);
    formData.append("file", image[0]);
    ClinicApi.updateClinic(changeId, formData);
    setTimeout(() => {
      getClinic();
    }, 500);
    setModal(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Address</TableCell>
              <TableCell align="left">Phone</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Image</TableCell>
              <TableCell align="left">Edit</TableCell>
              <TableCell align="left">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clinics?.map((clinic) => (
              <TableRow
                key={clinic.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left" component="th">
                  {clinic.name}
                </TableCell>
                <TableCell align="left" component="th">
                  {clinic.address}
                </TableCell>
                <TableCell align="left">{clinic.phone}</TableCell>
                <TableCell align="left">{clinic.email}</TableCell>
                <TableCell align="left">
                  {clinic.image && (
                    <img
                      src={`${baseURL}${clinic.image}`}
                      alt={clinic.name}
                      width={100}
                      height={50}
                    />
                  )}
                </TableCell>
                <TableCell align="left">
                  <Stack
                    sx={{
                      bgcolor: "blue",
                      height: 36,
                      width: 36,
                      borderRadius: 1,
                      hover: {
                        opacity: 0.8,
                      },
                    }}
                    justifyContent="center"
                    alignItems="center"
                    onClick={() => {
                      setModal(true);
                      setChangeId(clinic.id);
                    }}
                  >
                    <Edit sx={{ color: "white" }} />
                  </Stack>
                </TableCell>
                <TableCell align="left">
                  <Stack
                    sx={{
                      bgcolor: "red",
                      height: 36,
                      width: 36,
                      borderRadius: 1,
                      hover: {
                        opacity: 0.8,
                      },
                    }}
                    justifyContent="center"
                    alignItems="center"
                    onClick={() => handleDelete(clinic.id)}
                  >
                    <DeleteForever sx={{ color: "white" }} />
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        sx={{
          overflowY: "scroll",
          height: "100%",
        }}
        open={modal}
        onClose={handleClose}
      >
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
          <Stack width="80%" py={2} spacing={2}>
            <TextField
              flex={1}
              label="Name"
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              flex={1}
              label="Address"
              variant="outlined"
              onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
              flex={1}
              label="Phone"
              variant="outlined"
              onChange={(e) => setPhone(e.target.value)}
            />
            <TextField
              flex={1}
              label="Email"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              flex={1}
              label="Specialties"
              variant="outlined"
              onChange={(e) => setSpecialties(e.target.value)}
            />

            <TextField
              flex={1}
              variant="outlined"
              type="file"
              onChange={(e) => setImage(e.target.files)}
            />

            {!!changeId ? (
              <Button variant="contained" onClick={handleUpdate}>
                Update Clinic
              </Button>
            ) : (
              <Button variant="contained" onClick={handleAdd}>
                Add New Clinic
              </Button>
            )}
          </Stack>
        </Stack>
      </Modal>
      <Stack justifyContent="center">
        <Button
          sx={{ maxWidth: 200, m: 1 }}
          variant="contained"
          onClick={() => setModal(true)}
        >
          Add New Clinic
        </Button>
      </Stack>
    </>
  );
}

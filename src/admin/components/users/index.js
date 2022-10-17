import React, { useState, useEffect, useCallback } from "react";
import { DeleteForever, Edit } from "@mui/icons-material";
import moment from "moment";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  MenuItem,
  InputLabel,
  Modal,
  Select,
  TextField,
  Button,
} from "@mui/material";
import UserApi from "../../../apis/UserApi";
import ClinicApi from "../../../apis/ClinicApi";
import SpecialtyApi from "../../../apis/SpecialtyApi";
import baseURL from "../../../utils";

export default function Users() {
  //api
  const [users, setUsers] = useState();
  const [clinics, setClinics] = useState();
  const [specialties, setSpecialties] = useState();

  //data change
  const [changeId, setChangeId] = useState();
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState();
  const [firstName, setFirstName] = useState();
  const [middleName, setMiddleName] = useState();
  const [lastName, setLastName] = useState();
  const [gender, setGender] = useState();
  const [role, setRole] = useState();
  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [day, setDay] = useState();
  const [address, setAddress] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [clinicId, setClinicId] = useState("");
  const [specialtyId, setSpecialtyId] = useState("");
  const [image, setImage] = useState();

  const handleClose = () => {
    setChangeId();
    setModal(false);
  };

  const GetUser = useCallback(async () => {
    try {
      const response = await UserApi.getAll();
      setUsers(response.data.data);
    } catch (error) {
      console.error(error.response);
    }
  }, []);

  const GetClinic = useCallback(async () => {
    try {
      const response = await ClinicApi.getAllClinics();
      setClinics(response.data.data);
    } catch (error) {
      console.error(error.response);
    }
  }, []);

  const GetSpecialty = useCallback(async () => {
    try {
      const response = await SpecialtyApi.getAll();
      setSpecialties(response.data.data);
    } catch (error) {
      console.error(error.response);
    }
  }, []);

  const handleAdd = () => {
    let formData = new FormData();

    formData.append("email", email);
    formData.append("firstName", firstName);
    formData.append("middleName", middleName);
    formData.append("lastName", lastName);
    formData.append("gender", gender);
    formData.append("role", role);
    formData.append("birthday", `${year}-${month}-${day}`);
    formData.append("address", address);
    formData.append("phoneNumber", phoneNumber);
    formData.append("clinicId", clinicId);
    formData.append("specialtyId", specialtyId);
    formData.append("file", image[0]);

    UserApi.addNewUser(formData);
    setTimeout(() => {
      GetUser();
    }, 500);
    setModal(false);
  };

  const handleUpdate = () => {
    let formData = new FormData();

    formData.append("email", email);
    formData.append("firstName", firstName);
    formData.append("middleName", middleName);
    formData.append("lastName", lastName);
    formData.append("gender", gender);
    formData.append("role", role);
    formData.append("birthday", `${year}-${month}-${day}`);
    formData.append("address", address);
    formData.append("phoneNumber", phoneNumber);
    formData.append("clinicId", clinicId);
    formData.append("specialtyId", specialtyId);
    formData.append("file", image[0]);

    UserApi.update(changeId, formData);
    setTimeout(() => {
      GetUser();
    }, 500);
    setModal(false);
  };

  useEffect(() => {
    setTimeout(() => {
      GetUser();
    }, 300);
    setTimeout(() => {
      GetClinic();
    }, 300);
    setTimeout(() => {
      GetSpecialty();
    }, 300);
  }, [GetClinic, GetSpecialty, GetUser]);

  const handleDelete = (id) => {
    UserApi.deleteUser(id);

    setTimeout(() => {
      GetUser();
    }, 500);
  };

  return (
    <Stack>
      <TableContainer sx={{ overflow: "auto" }} component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Full Name</TableCell>
              <TableCell align="left">Gender</TableCell>
              <TableCell align="left">Role</TableCell>
              <TableCell align="left">Birthday</TableCell>
              <TableCell align="left">Address</TableCell>
              <TableCell align="left">Phone Number</TableCell>
              <TableCell align="left">Image</TableCell>
              <TableCell align="left">Edit</TableCell>
              <TableCell align="left">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left" component="th">
                  {user.email}
                </TableCell>
                <TableCell align="left">
                  {user.firstName} {user.middleName} {user.lastName}
                </TableCell>
                <TableCell align="left">{user.gender}</TableCell>
                <TableCell align="left">{user.role}</TableCell>
                <TableCell align="left">
                  {moment(user.birthday).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell align="left">{user.address}</TableCell>
                <TableCell align="left">{user.phoneNumber}</TableCell>
                <TableCell align="left">
                  {user.avatar ? (
                    <img
                      src={`${baseURL}${user.avatar}`}
                      alt={user.id}
                      width={50}
                      height={50}
                    />
                  ) : null}
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
                      setChangeId(user.id);
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
                    onClick={() => handleDelete(user.id)}
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
            transform: "translate(-50%, -40%)",
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
              label="Gender"
              variant="outlined"
              onChange={(e) => setGender(e.target.value)}
            />
            <Stack direction="row" spacing={2}>
              <TextField
                flex={1}
                label="Year"
                variant="outlined"
                onChange={(e) => setYear(e.target.value)}
              />
              <TextField
                flex={1}
                label="Month"
                variant="outlined"
                onChange={(e) => setMonth(e.target.value)}
              />
              <TextField
                flex={1}
                label="Day"
                variant="outlined"
                onChange={(e) => setDay(e.target.value)}
              />
            </Stack>
            <TextField
              flex={1}
              label="Address"
              variant="outlined"
              onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
              flex={1}
              label="PhoneNumbe"
              variant="outlined"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <InputLabel>Role</InputLabel>
            <Select
              flex={1}
              value={role}
              variant="outlined"
              onChange={(e) => setRole(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="USER">USER</MenuItem>
              <MenuItem value="DOCTOR">DOCTOR</MenuItem>
              <MenuItem value="ADMIN">ADMIN</MenuItem>
            </Select>
            <InputLabel>clinicId</InputLabel>
            <Select
              flex={1}
              value={clinicId}
              variant="outlined"
              onChange={(e) => setClinicId(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              {clinics?.map((clinic, index) => (
                <MenuItem key={index} value={clinic.id}>
                  {clinic.name}
                </MenuItem>
              ))}
            </Select>
            <InputLabel>specialtyId</InputLabel>
            <Select
              flex={1}
              value={specialtyId}
              variant="outlined"
              onChange={(e) => setSpecialtyId(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              {specialties?.map((special, index) => (
                <MenuItem key={index} value={special.id}>
                  {special.name}
                </MenuItem>
              ))}
            </Select>

            <TextField
              flex={1}
              variant="outlined"
              type="file"
              onChange={(e) => setImage(e.target.files)}
            />

            {!!changeId ? (
              <Button variant="contained" onClick={handleUpdate}>
                Update User
              </Button>
            ) : (
              <Button variant="contained" onClick={handleAdd}>
                Add New User
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
          Add New User
        </Button>
      </Stack>
    </Stack>
  );
}

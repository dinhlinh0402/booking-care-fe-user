import React, { useState, useEffect, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import moment from "moment";
import DoctorApi from "../../../apis/DoctorApi";

export default function Doctor() {
  const [doctors, setDoctors] = useState();

  const GetDoctor = useCallback(async () => {
    try {
      const response = await DoctorApi.getAll();
      setDoctors(response.data.data);
    } catch (error) {
      console.error(error.response);
    }
  }, []);

  useEffect(() => {
    GetDoctor();
  }, [GetDoctor]);

  return (
    <>
      <TableContainer component={Paper}>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors?.map((doctor) => (
              <TableRow
                key={doctor.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left" component="th">
                  {doctor.email}
                </TableCell>
                <TableCell align="left">
                  {doctor.firstName} {doctor.middleName} {doctor.lastName}
                </TableCell>
                <TableCell align="left">{doctor.gender}</TableCell>
                <TableCell align="left">{doctor.role}</TableCell>
                <TableCell align="left">
                  {moment(doctor.birthday).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell align="left">{doctor.address}</TableCell>
                <TableCell align="left">{doctor.phoneNumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

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
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import moment from "moment";
import DoctorApi from "../../../apis/DoctorApi";
import SchedulesApi from "../../../apis/SchedulesApi";

export default function Schedules() {
  const now = Date.now();
  const [doctors, setDoctors] = useState();
  const [doctorSchedules, setDoctorSchedules] = useState();
  const [doctorSelectId, setDoctorSelectId] = useState();
  const [changeId, setChangeId] = useState();
  const [date, setDate] = useState(now);
  const [selectDate, setSelectDate] = useState();

  const [modal, setModal] = useState(false);
  const [selectAddDate, setSelectAddDate] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const handleClose = () => {
    setChangeId();
    setModal(false);
  };

  const getDoctor = useCallback(async () => {
    try {
      const response = await DoctorApi.getAll();
      setDoctors(response.data.data);
    } catch (error) {
      console.error(error.response);
    }
  }, []);

  useEffect(() => {
    getDoctor();
  }, [getDoctor]);

  const getDoctorSchedules = useCallback(async () => {
    try {
      const response = await SchedulesApi.getSchedules({
        doctorId: doctorSelectId,
        date: date,
      });
      setDoctorSchedules(response.data.data);
    } catch (error) {
      console.error(error.response);
    }
  }, [date]);

  useEffect(() => {
    getDoctorSchedules();
  }, [getDoctorSchedules]);

  const handleChangeDate = (event) => {
    const isDate = new Date(`2022-${event.target.value}T00:00:00.000Z`);
    setDate(isDate);
    setSelectDate(event.target.value);
  };

  const handleDelete = (id) => {
    SchedulesApi.deleteSchedules(id);

    setTimeout(() => {
      getDoctorSchedules();
    }, 500);
  };

  const handleAdd = () => {
    SchedulesApi.addNewSchedules({
      doctorId: doctorSelectId,
      date: `2022-${selectAddDate}T00:00:00.000Z`,
      times: [
        {
          timeStart: `2022-${selectAddDate}${startDate}`,
          timeEnd: `2022-${selectAddDate}${endDate}`,
        },
      ],
    });
    setTimeout(() => {
      getDoctorSchedules();
    }, 300);
    setModal(false);
  };

  return (
    <>
      <Stack direction="row" alignItems="center" p={2} spacing={2}>
        <Stack flex={1} spacing={1}>
          <InputLabel>Doctor</InputLabel>
          <Select
            value={doctorSelectId}
            variant="outlined"
            onChange={(e) => setDoctorSelectId(e.target.value)}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            {doctors?.map((doctor, index) => (
              <MenuItem key={index} value={doctor.id}>
                {doctor.lastName} {doctor.middleName} {doctor.firstName}
              </MenuItem>
            ))}
          </Select>
        </Stack>

        <Stack flex={1} spacing={1}>
          <InputLabel id="demo-simple-select-standard-label">Date</InputLabel>
          <Select
            value={selectDate}
            variant="outlined"
            onChange={handleChangeDate}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="07-12">Thứ 3: 12/07</MenuItem>
            <MenuItem value="07-13">Thứ 4: 13/07</MenuItem>
            <MenuItem value="07-14">Thứ 5: 14/07</MenuItem>
            <MenuItem value="07-15">Thứ 6: 15/07</MenuItem>
            <MenuItem value="07-16">Thứ 7: 16/07</MenuItem>
            <MenuItem value="07-18">Thứ 2: 18/07</MenuItem>
          </Select>
        </Stack>
        <Stack justifyContent="center">
          <Button
            sx={{ maxWidth: 120, mt: 3 }}
            variant="contained"
            onClick={() => setModal(true)}
          >
            Add New Schedules
          </Button>
        </Stack>
      </Stack>

      {!!doctorSchedules && (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Schedules</TableCell>
                <TableCell align="left">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctorSchedules?.map((schedule) => (
                <TableRow
                  key={schedule.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left" component="th">
                    {moment(schedule?.timeStart).format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell align="left" component="th">
                    {moment(schedule?.timeStart).format("LT")} -{" "}
                    {moment(schedule?.timeEnd).format("LT")}
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
                      onClick={() => handleDelete(schedule.id)}
                    >
                      <DeleteForever sx={{ color: "white" }} />
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
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
            <Stack flex={1} spacing={1}>
              <InputLabel id="demo-simple-select-standard-label">
                Date Added
              </InputLabel>
              <Select
                value={selectAddDate}
                variant="outlined"
                onChange={(e) => setSelectAddDate(e.target.value)}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="07-12">Thứ 3: 12/07</MenuItem>
                <MenuItem value="07-13">Thứ 4: 13/07</MenuItem>
                <MenuItem value="07-14">Thứ 5: 14/07</MenuItem>
                <MenuItem value="07-15">Thứ 6: 15/07</MenuItem>
                <MenuItem value="07-16">Thứ 7: 16/07</MenuItem>
                <MenuItem value="07-18">Thứ 2: 18/07</MenuItem>
              </Select>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Stack flex={1} spacing={1}>
                <InputLabel id="demo-simple-select-standard-label">
                  Start Date
                </InputLabel>
                <Select
                  value={startDate}
                  variant="outlined"
                  onChange={(e) => setStartDate(e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="T01:00:00.000Z">08:00 AM</MenuItem>
                  <MenuItem value="T02:00:00.000Z">09:00 AM</MenuItem>
                  <MenuItem value="T03:00:00.000Z">10:00 AM</MenuItem>
                  <MenuItem value="T04:00:00.000Z">11:00 AM</MenuItem>
                  <MenuItem value="T06:00:00.000Z">01:00 PM</MenuItem>
                  <MenuItem value="T07:00:00.000Z">02:00 PM</MenuItem>
                  <MenuItem value="T08:00:00.000Z">03:00 PM</MenuItem>
                  <MenuItem value="T09:00:00.000Z">04:00 PM</MenuItem>
                </Select>
              </Stack>
              <Stack flex={1} spacing={1}>
                <InputLabel id="demo-simple-select-standard-label">
                  End Date
                </InputLabel>
                <Select
                  value={endDate}
                  variant="outlined"
                  onChange={(e) => setEndDate(e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="T02:00:00.000Z">09:00 AM</MenuItem>
                  <MenuItem value="T03:00:00.000Z">10:00 AM</MenuItem>
                  <MenuItem value="T04:00:00.000Z">11:00 AM</MenuItem>
                  <MenuItem value="T05:00:00.000Z">12:00 AM</MenuItem>
                  <MenuItem value="T07:00:00.000Z">02:00 PM</MenuItem>
                  <MenuItem value="T08:00:00.000Z">03:00 PM</MenuItem>
                  <MenuItem value="T09:00:00.000Z">04:00 PM</MenuItem>
                  <MenuItem value="T10:00:00.000Z">05:00 PM</MenuItem>
                </Select>
              </Stack>
            </Stack>
            <Button variant="contained" onClick={handleAdd}>
              Add New Schedules
            </Button>
          </Stack>
        </Stack>
      </Modal>
    </>
  );
}

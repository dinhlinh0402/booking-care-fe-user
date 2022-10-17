import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Link,
  Breadcrumbs,
  Typography,
  Container,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Stack,
  Modal,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useParams } from "react-router-dom";

import * as image from "../../assets";

import ShowPriceList from "../../components/atoms/ShowForm/ShowPriceList";
import ShowInsurance from "../../components/atoms/ShowForm/ShowInsurance";

import DoctorApi from "../../apis/DoctorApi";
import baseURL from "../../utils";
import SchedulesApi from "../../apis/SchedulesApi";
import moment from "moment";

const ForDoctorsPage = () => {
  const now = Date.now();
  let { id } = useParams();
  const [date, setDate] = useState(now);
  const [selectDate, setSelectDate] = useState();
  const [doctor, setDoctors] = useState("");
  const [doctorSchedules, setDoctorSchedules] = useState();
  const [timeSchedules, setTimeSchedules] = useState();

  const [changeId, setChangeId] = useState();
  const [modal, setModal] = useState(false);
  const [name, setName] = useState();
  const [gender, setGender] = useState();
  const [phone, setPhone] = useState();
  const [birthday, setBirthday] = useState();
  const [address, setAddress] = useState();
  const [reason, setReason] = useState();

  const [loading, setLoading] = useState(false);

  const getDoctor = useCallback(async () => {
    try {
      const response = await DoctorApi.getOne(id);
      setDoctors(response.data);
    } catch (error) {
      console.error(error.response);
    }
  }, [id]);

  useEffect(() => {
    getDoctor();
  }, [getDoctor]);

  const getDoctorSchedules = useCallback(async () => {
    setLoading(true);
    try {
      const response = await SchedulesApi.getSchedules({
        doctorId: id,
        date: date,
      });
      console.log("res", response.data.data);
      setDoctorSchedules(response.data.data);
    } catch (error) {
      console.error(error.response);
    } finally {
      setLoading(false);
    }
  }, [date, id]);

  useEffect(() => {
    getDoctorSchedules();
  }, [getDoctorSchedules]);

  const handleChangeDate = (event) => {
    const isDate = new Date(`2022-${event.target.value}T00:00:00.000Z`);
    setDate(isDate);
    setSelectDate(event.target.value);
  };

  return (
    <Box>
      <Container role="presentation">
        <Breadcrumbs aria-label="breadcrumb" color="#45c3d2" sx={{ py: 1 }}>
          <Link underline="none" color="#45c3d2" href="/">
            <HomeIcon fontSize="medium" sx={{ pt: 0.5 }} />
          </Link>
          <Link
            underline="none"
            color="#45c3d2"
            href="/DepthsListPage"
            sx={{ fontSize: 14 }}
          >
            Khám chuyên khoa
          </Link>
          <Link
            underline="none"
            color="#45c3d2"
            href={`/ForPatientsPage/${doctor?.specialty?.id}`}
            sx={{ fontSize: 14 }}
          >
            {doctor?.specialty?.name}
          </Link>
        </Breadcrumbs>
      </Container>
      <Container>
        <Box sx={{ py: 4, display: "flex" }}>
          {!doctor.avatar ? (
            <Avatar
              alt={doctor.id}
              src={image.DepthsDefault}
              sx={{ width: 100, height: 100, mb: 1 }}
            />
          ) : (
            <Avatar
              alt={doctor.id}
              src={`${baseURL}${doctor.avatar}`}
              sx={{ width: 100, height: 100, mb: 1 }}
            />
          )}
          <Box sx={{ width: "50%", pl: 2 }}>
            <Typography sx={{ fontSize: 18, fontWeight: "bold", pb: 1 }}>
              {doctor?.doctorInfor?.position} {doctor.lastName}{" "}
              {doctor.middleName} {doctor.firstName}
            </Typography>
            <Typography sx={{ fontSize: 13, color: "#555" }}>
              {doctor?.doctorInfor?.introduct}
            </Typography>
            <Typography sx={{ fontSize: 13, color: "#555", pt: 1 }}>
              {doctor?.doctorInfor?.note}
            </Typography>
          </Box>
        </Box>
        <FormControl variant="standard" sx={{ width: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Date</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={selectDate}
            onChange={handleChangeDate}
            label="Date"
            className="select"
            sx={{ color: "#337ab7" }}
          >
            <MenuItem value={undefined}>none</MenuItem>
            <MenuItem value="07-11">Thứ 2: 11/07</MenuItem>
            <MenuItem value="07-12">Thứ 3: 12/07</MenuItem>
            <MenuItem value="07-13">Thứ 4: 13/07</MenuItem>
            <MenuItem value="07-14">Thứ 5: 14/07</MenuItem>
            <MenuItem value="07-15">Thứ 6: 15/07</MenuItem>
            <MenuItem value="07-16">Thứ 7: 16/07</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: "flex" }}>
          <Box sx={{ mt: 2, flex: 1, borderRight: 1, borderColor: "#eee" }}>
            <Box sx={{ display: "flex" }}>
              <CalendarMonthIcon fontSize="small" />
              <Typography
                sx={{
                  pl: 1,
                  fontSize: 14,
                  fontWeight: "500",
                  textTransform: "uppercase",
                }}
              >
                Lịch khám
              </Typography>
            </Box>
            <Box sx={{ py: 1 }}>
              {loading && (
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress />
                </Box>
              )}
              {doctorSchedules?.map((schedule) => (
                <Button
                  sx={{
                    px: 2.5,
                    py: 1,
                    mr: 1,
                    my: 1,
                    color: "#333",
                    backgroundColor: "#fff04b",
                    "&:hover": {
                      backgroundColor: "#fff04b",
                    },
                  }}
                  onClick={() => {
                    setTimeSchedules(
                      `${moment(schedule?.timeStart).format("LT")} - ${moment(
                        schedule?.timeEnd
                      ).format("LT")}`
                    );
                    setChangeId(schedule.id);
                    setModal(true);
                  }}
                >
                  <Typography sx={{ fontSize: 14, fontWeight: "500" }}>
                    {moment(schedule?.timeStart).format("LT")} -{" "}
                    {moment(schedule?.timeEnd).format("LT")}
                  </Typography>
                </Button>
              ))}
            </Box>
            <Typography sx={{ fontSize: 13 }}>
              Chọn và đặt (Phí đặt lịch 0đ)
            </Typography>
          </Box>
          <Box sx={{ flex: 1, p: 2 }}>
            <Typography
              sx={{
                fontSize: 14,
                textTransform: "uppercase",
                color: "#666",
                lineHeight: 2,
              }}
            >
              Địa chỉ khám
            </Typography>
            <Typography
              sx={{ fontSize: 13, fontWeight: "bold", lineHeight: 2 }}
            >
              {doctor?.clinic?.name}
            </Typography>
            <Typography sx={{ fontSize: 13, lineHeight: 2 }}>
              {doctor?.clinic?.address}
            </Typography>

            <ShowPriceList detail={doctor} />
            <ShowInsurance />
          </Box>
        </Box>
        <Modal
          sx={{
            overflowY: "scroll",
            height: "100%",
          }}
          open={modal}
          onClose={() => setModal(false)}
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
              <Stack direction="row" spacing={2}>
                {!doctor.avatar ? (
                  <Avatar
                    alt={doctor.id}
                    src={image.DepthsDefault}
                    sx={{ width: 100, height: 100, mb: 1 }}
                  />
                ) : (
                  <Avatar
                    alt={doctor.id}
                    src={`${baseURL}${doctor.avatar}`}
                    sx={{ width: 100, height: 100, mb: 1 }}
                  />
                )}
                <Stack spacing={0.2}>
                  <Typography>ĐẶT LỊCH KHÁM</Typography>
                  <Typography>
                    {doctor?.doctorInfor?.position}: {doctor.firstName}{" "}
                    {doctor.middleName} {doctor.lastName}
                  </Typography>
                  <Typography>Ngày khám: {selectDate}</Typography>
                  <Typography>Thời gian: {timeSchedules}</Typography>
                </Stack>
              </Stack>
              <TextField
                flex={1}
                width="100%"
                label="Name"
                variant="outlined"
                onChange={(e) => setName(e.target.value)}
              />

              <RadioGroup
                sx={{
                  flexDirection: "row",
                }}
                onChange={(e) => setGender(e.target.value)}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>

              <TextField
                flex={1}
                label="Phone"
                variant="outlined"
                onChange={(e) => setPhone(e.target.value)}
              />
              <TextField
                flex={1}
                label="Birthday"
                variant="outlined"
                onChange={(e) => setBirthday(e.target.value)}
              />
              <TextField
                flex={1}
                label="Address"
                variant="outlined"
                onChange={(e) => setAddress(e.target.value)}
              />
              <TextField
                flex={1}
                label="Reason"
                variant="outlined"
                onChange={(e) => setReason(e.target.value)}
              />
              <Stack p={3} bgcolor="#f6f6f6" height={80} direction="row">
                <Typography flex={2}>Gia Kham:</Typography>
                <Stack flex={6}></Stack>
                <Typography flex={1}>{doctor?.doctorInfor?.price}đ</Typography>
              </Stack>
              <Button
                variant="contained"
                onClick={() => {
                  if (name && gender && phone && birthday && address) {
                    SchedulesApi.deleteSchedules(changeId);
                    setModal(false);
                    setTimeout(() => {
                      getDoctorSchedules();
                    }, 500);
                  } else {
                    alert("Ban Chua Nhap Du Thong Tin");
                  }
                }}
              >
                Xác nhận đặt lịch
              </Button>
            </Stack>
          </Stack>
        </Modal>
      </Container>

      <Container sx={{ mt: 2, borderTop: 1, borderColor: "gray" }}>
        <Typography sx={{ fontSize: 14, lineHeight: 2, py: 2 }}>
          {doctor?.doctorInfor?.description}
        </Typography>
      </Container>
    </Box>
  );
};

export default ForDoctorsPage;

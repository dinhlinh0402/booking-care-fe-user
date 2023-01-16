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
  InputAdornment,
  TextareaAutosize,
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
import vi from "moment/locale/vi";
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import BookingApi from '../../apis/BookingApi';

const positionDoctor = {
  ASSOCIATE_PROFESSOR: 'Phó Giáo sư',
  NONE: 'Bác sĩ', // bác sĩ
  MASTER: 'Thạc sĩ', // Thạc sĩ
  DOCTOR: 'Tiến sĩ', // Tiến sĩ
  PROFESSOR: 'Giáo sư',
}

const ForDoctorsPage = () => {
  const now = Date.now();
  let { id } = useParams();
  const [selectDate, setSelectDate] = useState();
  const [doctor, setDoctors] = useState("");
  const [doctorSchedules, setDoctorSchedules] = useState();
  const [timeSchedules, setTimeSchedules] = useState();

  const [modal, setModal] = useState(false);
  const [typeBooking, setTypeBooking] = useState('FOR_MYSELF');
  const [birthday, setBirthday] = useState();
  const [gender, setGender] = useState('OTHER');

  const [daysOption, setDaysOption] = useState([]);

  const [loading, setLoading] = useState(false);
  const [showModalDontLogin, setShowModalDontLogin] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    // trigger, // validate real time
    reset, // reset form
  } = useForm();
  let navigate = useNavigate();

  const getDoctor = useCallback(async () => {
    try {
      const response = await DoctorApi.getOne(id);
      setDoctors(response.data);
    } catch (error) {
      console.error(error.response);
    }
  }, [id]);


  useEffect(() => {
    window.scrollTo(0, 0);
    const days = getDays();
    setSelectDate(days && days.length > 0 ? days[0].value : undefined);
    setDaysOption(days ? days : []);
  }, [])

  useEffect(() => {
    getDoctor();
  }, [getDoctor]);

  useEffect(() => {
    reset()
  }, [typeBooking])

  const getDoctorSchedules = useCallback(async () => {
    setLoading(true);
    try {
      const response = await SchedulesApi.getSchedules({
        doctorId: id,
        date: selectDate,
        page: 1,
        page_size: 100
      });
      setDoctorSchedules(response.data.data);
    } catch (error) {
      console.error(error.response);
    } finally {
      setLoading(false);
    }
  }, [selectDate, id]);

  useEffect(() => {
    if (selectDate) {
      getDoctorSchedules();
    }
  }, [getDoctorSchedules]);

  const getDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const obj = {};
      if (i === 0) {
        const ddMM = moment(new Date()).format('DD/MM');
        const today = `Hôm nay - ${ddMM}`;
        obj.label = today;
      } else {
        let label = moment(new Date()).add(i, 'days').locale('vi').format('dddd - DD/MM');
        // Convert chữ cái đầu thành in hoa
        label = capitalizeFirstLetter(label)
        obj.label = label;
      }
      obj.value = moment(new Date()).add(i, 'days').format('YYYY-MM-DDT00:00:00')
      days.push(obj)
    }
    return days;
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleChangeDate = (event) => {
    // const isDate = new Date(`2022 - ${ event.target.value }T00: 00: 00.000Z`);
    // setDate(isDate);
    setSelectDate(event.target.value);
  };

  const onSubmit = async (data) => {
    try {
      const dataRes = await BookingApi.createBooking({
        ...data,
        type: typeBooking,
        birthday: moment(moment(data.birthday, 'DD/MM/YYYY')).format('YYYY-MM-DDT00:00:00'),
        doctorId: doctor.id,
        scheduleId: timeSchedules.id || undefined,
        date: selectDate,
        bookingDate: moment(new Date()).format('YYYY-MM-DDT00:00:00')
      })
      if (dataRes && dataRes.status === 200) {
        reset();
        setModal(false);
        setTypeBooking('FOR_MYSELF')
        toast.success('Đăng ký lịch khám thành công, hãy vào hồ sơ của bạn để xác nhận');
      }
    } catch (error) {
      console.log('error: ', error);
      if (error?.response?.data?.error === 'MAXIMUN_COUNT') {
        toast.error('Số khách hàng đặt đã đạt tối đa');
        return;
      }
      if (error?.response?.data?.error === 'SCHEDULE_NOT_EXIST') {
        toast.error('Lịch khám đã qua hoặc không tồn tại');
        return;
      }
      if (error?.response?.data?.error === 'YOU_HAVE_BOOKED') {
        toast.error('Bạn đã đặt lịch khám này');
        return;
      }
      toast.error('Đăng ký khám không thành công');
    }
  }

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
            href={`/ ForPatientsPage / ${doctor?.specialty?.id}`}
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
              sx={{ width: 130, height: 130, mb: 0 }}
            />
          ) : (
            <Avatar
              alt={doctor.id}
              src={`${baseURL}${doctor.avatar}`}
              sx={{ width: 130, height: 130, mb: 0 }}
            />
          )}
          <Box sx={{ width: "50%", pl: 2 }}>
            <Typography sx={{ fontSize: 25, fontWeight: "bold", pb: 1 }}>
              {doctor?.doctorInfor?.position ? positionDoctor[doctor?.doctorInfor?.position] : 'Bác sĩ'} {doctor.firstName}{" "}
              {doctor.middleName} {doctor.lastName}
            </Typography>
            <Typography sx={{ fontSize: 14, color: "#555" }}>
              {doctor?.doctorInfor?.introduct}
            </Typography>
            <Typography sx={{ fontSize: 14, color: "#555", pt: 1 }}>
              {doctor?.doctorInfor?.note}
            </Typography>
          </Box>
        </Box>
        <FormControl variant="standard" sx={{ width: 150 }}>
          <InputLabel id="select-date">Ngày khám</InputLabel>
          <Select
            labelId="select-date"
            id="select-date"
            value={`${selectDate}`}
            onChange={handleChangeDate}
            label="Date"
            className="select"
            sx={{ color: "#337ab7" }}
          >
            {daysOption && daysOption?.length > 0 && (
              daysOption.map((day, index) => (
                <MenuItem key={index} value={day.value}>{day.label}</MenuItem>
              )))}

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
                    if (localStorage.getItem("accessToken")) {
                      setTimeSchedules(
                        // `${moment(schedule?.timeStart).format("LT")} - ${moment(
                        //   schedule?.timeEnd
                        // ).format("LT")
                        // }`
                        schedule
                      );
                      // setChangeId(schedule.id);
                      setModal(true);
                    } else (
                      setShowModalDontLogin(true)
                    )
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
            overflowY: "auto",
            height: "100%",
          }}
          open={modal}
          onClose={() => setModal(false)}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
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
                p: 3,
                paddingLeft: '0px',
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
                    <Typography style={{ fontSize: '15px' }}>ĐẶT LỊCH KHÁM</Typography>
                    <Typography style={{ fontSize: '15px' }}>
                      {/* {doctor?.doctorInfor?.position}: {doctor.firstName}{" "}
                    {doctor.middleName} {doctor.lastName} */}
                      {`${doctor?.doctorInfor?.position ? positionDoctor[doctor?.doctorInfor?.position] : 'Bác sĩ'}, ${doctor.firstName} ${doctor.middleName} ${doctor.lastName}`}
                    </Typography>
                    <Typography style={{ fontSize: '15px' }}>Ngày khám: {capitalizeFirstLetter(`${moment(selectDate).format('dddd - DD/MM/YYYY')}`)}</Typography>
                    <Typography style={{ fontSize: '15px' }}>Thời gian: {`${moment(timeSchedules?.timeStart).format("LT")} - ${moment(timeSchedules?.timeEnd).format("LT")}`}</Typography>
                  </Stack>
                </Stack>
                <RadioGroup
                  sx={{
                    flexDirection: "row",
                  }}
                  defaultValue={typeBooking}
                  // {...register('type', {
                  //   required: true,
                  // })}
                  onChange={(e) => setTypeBooking(e.target.value)}
                >
                  <FormControlLabel
                    value="FOR_MYSELF"
                    control={<Radio size='small' />}
                    label="Đặt cho mình"
                  />
                  <FormControlLabel
                    value="FOR_RELATIVES"
                    control={<Radio size='small' />}
                    label="Đặt cho người thân"
                  />
                </RadioGroup>
                {typeBooking === 'FOR_RELATIVES' && (
                  <>
                    <TextField
                      flex={1}
                      width="100%"
                      label="Họ tên bệnh nhân"
                      placeholder="Họ tên bệnh nhân"
                      variant="outlined"
                      // onChange={(e) => setName(e.target.value)}
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"><PersonOutlineOutlinedIcon /></InputAdornment>
                        ),
                      }}
                      {...register('name', {
                        required: 'Họ tên bệnh nhân không được trống',
                      })}
                      error={!!errors?.name}
                      helperText={errors?.name ? errors.name.message : null}
                    />
                    <TextField
                      flex={1}
                      label="Số điện thoại"
                      variant="outlined"
                      placeholder='Số điện thoại'
                      // onChange={(e) => setPhone(e.target.value)}
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"><PhoneIphoneIcon /></InputAdornment>
                        ),
                      }}
                      {...register('phone', {
                        required: 'Số điện thoại không được trống',
                      })}
                      error={!!errors?.phone}
                      helperText={errors?.phone ? errors.phone.message : null}
                    />
                    <TextField
                      flex={1}
                      label="Email"
                      variant="outlined"
                      placeholder='Email'
                      // onChange={(e) => setPhone(e.target.value)}
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"><MailOutlinedIcon /></InputAdornment>
                        ),
                      }}
                      {...register('email', {
                        required: 'Email không được trống',
                        pattern: {
                          value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                          message: 'Email không hợp lệ'
                        }
                      })}
                      error={!!errors?.email}
                      helperText={errors?.email ? errors.email.message : null}
                    />

                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
                      <Select
                        // labelId="demo-simple-select-label"
                        // id="demo-simple-select"
                        value={gender}
                        label="Giới tính"
                        {...register('gender', {
                          required: 'Giới tính không được trống',
                        })}
                        onChange={(e) => {
                          setGender(e.target.value)
                        }}
                      >
                        <MenuItem value={'OTHER'}>Khác</MenuItem>
                        <MenuItem value={'MALE'}>Nam</MenuItem>
                        <MenuItem value={'FEMALE'}>Nữ</MenuItem>
                      </Select>
                    </FormControl>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        label="Ngày sinh"
                        inputFormat="dd/MM/yyyy"
                        value={birthday}
                        disableFuture={true}
                        renderInput={(params) => (
                          // <TextField
                          //   {...params}
                          //   inputProps={
                          //     {
                          //       ...params.inputProps,
                          //       placeholder: "dd/mm/aaaa"
                          //     }
                          //   }
                          // />
                          <TextField {...params} required />
                        )}
                        {...register('birthday', {
                          required: 'Ngày sinh không được trống',
                        })}
                        onChange={(newValue) => {
                          setBirthday(newValue);
                        }}
                        error={!!errors?.birthday}
                        helperText={errors?.birthday ? errors.birthday.message : null}
                      />
                    </LocalizationProvider>
                    <TextField
                      flex={1}
                      label="Địa chỉ"
                      placeholder="Địa chỉ"
                      variant="outlined"
                      // onChange={(e) => setAddress(e.target.value)}
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"><LocationOnOutlinedIcon /></InputAdornment>
                        ),
                      }}
                      {...register('address', {
                        required: 'Địa chỉ không được trống',

                      })}
                      error={!!errors?.address}
                      helperText={errors?.address ? errors.address.message : null}
                    />
                  </>
                )}
                <TextareaAutosize
                  minRows={3}
                  placeholder="Lý do khám"
                  required
                  style={{ width: '100%', maxWidth: '100%' }}
                  {...register('reason', {
                    required: 'Lý do không được để trống'
                  })}
                  error={!!errors?.reason}
                  helperText={errors?.reason ? errors.reason.message : null}
                />

                {/* <Stack p={3} bgcolor="#f6f6f6" height={80} direction="row">
                <Typography flex={2}>Gia Kham:</Typography>
                <Stack flex={6}></Stack>
                <Typography flex={1}>{doctor?.doctorInfor?.price}đ</Typography>
              </Stack> */}
                <Button
                  variant="contained"
                  type='submit'
                  onClick={() => {
                    // if (name && gender && phone && birthday && address) {
                    //   SchedulesApi.deleteSchedules(changeId);
                    //   setModal(false);
                    //   setTimeout(() => {
                    //     getDoctorSchedules();
                    //   }, 500);
                    // } else {
                    //   alert("Ban Chua Nhap Du Thong Tin");
                    // }
                  }
                  }
                >
                  Xác nhận đặt lịch
                </Button>
              </Stack>
            </Stack>
          </form>

        </Modal>
      </Container>

      <Modal
        open={showModalDontLogin}
        onClose={() => {
          setShowModalDontLogin(false)
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -100%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          textAlign: 'center'
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Bạn chưa đăng nhập
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Hãy đăng nhập để đăng ký lịch khám bệnh miễn phí
          </Typography>
          <Stack direction='row' spacing={2} alignItems="center" justifyContent="center" mt={3}>
            <Button
              color='primary'
              variant="contained"
              onClick={() => {
                navigate('/login')
              }}
            >
              Đăng nhập
            </Button>
            <Button
              color='error'
              variant="contained"
              onClick={() => setShowModalDontLogin(false)}
            >
              Huỷ
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Container sx={{ mt: 2, borderTop: 1, borderColor: "gray" }}>
        <Typography sx={{ fontSize: 14, lineHeight: 2, py: 2 }}>
          {doctor?.doctorInfor?.description}
        </Typography>
      </Container>
    </Box >
  );
};

export default ForDoctorsPage;

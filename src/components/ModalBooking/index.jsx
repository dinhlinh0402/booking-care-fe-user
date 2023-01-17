import React, { useState } from "react";
import { Avatar, Button, FormControl, FormControlLabel, InputAdornment, InputLabel, MenuItem, Modal, Radio, RadioGroup, Select, Stack, TextareaAutosize, TextField, Typography } from "@mui/material";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import * as image from '../../assets';
import BookingApi from "../../apis/BookingApi";
import baseURL from "../../utils";

const positionDoctor = {
  ASSOCIATE_PROFESSOR: 'Phó Giáo sư',
  NONE: 'Bác sĩ', // bác sĩ
  MASTER: 'Thạc sĩ', // Thạc sĩ
  DOCTOR: 'Tiến sĩ', // Tiến sĩ
  PROFESSOR: 'Giáo sư',
}

const ModalBooking = ({
  showModal,
  doctor,
  timeSchedules,
  selectedDate,
  handleCancelModal,
}) => {
  const [typeBooking, setTypeBooking] = useState('FOR_MYSELF');
  const [gender, setGender] = useState('OTHER');
  const [birthday, setBirthday] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    // trigger, // validate real time
    reset, // reset form
  } = useForm();
  let navigate = useNavigate();


  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const onSubmit = async (data) => {
    console.log('data: ',data);
    try {
      const dataRes = await BookingApi.createBooking({
        ...data,
        type: typeBooking,
        birthday: data.birthday && typeBooking === 'FOR_MYSELF' ? moment(moment(data.birthday, 'DD/MM/YYYY')).format('YYYY-MM-DDT00:00:00') : undefined,
        doctorId: doctor.id,
        scheduleId: timeSchedules.id || undefined,
        date: selectedDate,
        bookingDate: moment(new Date()).format('YYYY-MM-DDT00:00:00')
      })
      if (dataRes && dataRes.status === 200) {
        reset();
        // setModal(false);
        handleCancelModal();
        setTypeBooking('FOR_MYSELF');
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
    <>
      <Modal
          sx={{
            overflowY: "auto",
            height: "100%",
          }}
          open={showModal}
          // onClose={() => setModal(false)}
          onClose={() => handleCancelModal()}
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
                    <Typography style={{ fontSize: '15px' }}>Ngày khám: {capitalizeFirstLetter(`${moment(selectedDate).format('dddd - DD/MM/YYYY')}`)}</Typography>
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
                  }}
                >
                  Xác nhận đặt lịch
                </Button>
              </Stack>
            </Stack>
          </form>

        </Modal>
    </>
  )
}

export default ModalBooking;
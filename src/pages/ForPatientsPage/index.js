import React, { useState, useEffect, useCallback } from 'react';
import { BookingWrapper } from './styled';
import Container from "@mui/material/Container";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Avatar from '@mui/material/Avatar';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Link } from "@mui/material";

import { useParams, useNavigate } from 'react-router-dom';

import baseURL from '../../utils';

import * as image from "../../assets";

import SpecialistFrom from '../../components/atoms/SpecialistForm';
import ShowPriceList from '../../components/atoms/ShowForm/ShowPriceList';
import ShowInsurance from '../../components/atoms/ShowForm/ShowInsurance';

import SpecialtyApi from '../../apis/SpecialtyApi';

import DoctorApi from '../../apis/DoctorApi';

export default function ForPatientsPage() {
  let {id} = useParams();
  let navigate = useNavigate();
  const [location, setLocation] = useState('');
  // const [date, setDate] = useState('');

  const [detailSpecs, setDetailSpecs] = useState();
  const [doctors, setDoctors] = useState();

  const getSpecialty = useCallback(async () => {
    try {
      const response = await SpecialtyApi.getOne(id);
      setDetailSpecs(response.data);
    } catch (error) {
      console.error(error.response);
    }
  }, [id]);

  const getDoctor = useCallback(async () => {
    try {
      const response = await DoctorApi.getAll({ specialtyId: id});
      setDoctors(response.data.data);
    } catch (error) {
      console.error(error.response);
    }
  }, [id]);

  useEffect(() => {
    getSpecialty();
    getDoctor();
  }, [getSpecialty, getDoctor]);

  const handleToDetail = (doctor) => {
    navigate(`/ForDoctorsPage/${doctor.id}`);
  };

  const handleChangeLocation = (event) => {
      setLocation(event.target.value);
  };

  // const handleChangeDate = (event) => {
  //     setDate(event.target.value);
  // };

  return ( <BookingWrapper>
    <div>
      <SpecialistFrom detail={detailSpecs}/>

      <div className='content'>
        <Container>
          <FormControl className='form-control'>
            <InputLabel id="demo-simple-select-filled-label" className='input-form'>Địa điểm</InputLabel>
            <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={location}
            label="Location"
            onChange={handleChangeLocation}
            className='select'
            >
            <MenuItem value={10}>Toàn quốc</MenuItem>
            <MenuItem value={20}>Hà Nội</MenuItem>
            <MenuItem value={30}>Hồ Chí Minh</MenuItem>
            </Select>
          </FormControl>
        {doctors?.map((doctor) => (
          <div className='wrapper' key={doctor.id}>
            <div className='wp-left'>
              <div className='img'>
                {!doctor.avatar ? (
                  <Avatar
                    alt={doctor.id}
                    src={image.DepthsDefault}
                    sx={{width: 100, height: 100, mb: 1}}
                  />
                ) : (
                  <Avatar
                    alt={doctor.id}
                    src={`${baseURL}${doctor.avatar}`}
                    sx={{width: 100, height: 100, mb: 1}}
                  />
                )}
                <Link className='link' 
                  onClick={() => handleToDetail(doctor)}
                >
                Xem thêm
                </Link>
              </div>
                <div className='information'>
                <p className='name'>{doctor?.doctorInfor?.position} {doctor.lastName} {doctor.middleName} {doctor.firstName}</p>
                <p className='detail'>
                  {doctor?.doctorInfor?.introduct}
                </p>
                <p className='detail'>
                  {doctor?.doctorInfor?.note}
                </p>
                <div className='address'>
                  <div className="icons">
                      <LocationOnIcon fontSize="small" />
                  </div>
                    Hà nội
                </div>
              </div>
          </div>

          <div className='wp-right'>
            {/* <FormControl variant="standard" sx={{ width: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">Date</InputLabel>
                <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={date}
                onChange={handleChangeDate}
                label="Date"
                className='select'
                sx={{ color: '#337ab7' }}
                >
                <MenuItem value={10}>Thứ 6: 27/05</MenuItem>
                <MenuItem value={20}>Thứ 7: 28/05</MenuItem>
                <MenuItem value={30}>Thứ 2: 30/05</MenuItem>
                </Select>
            </FormControl> */}

            <div className='calender'>
                <div className='title'>
                  <CalendarMonthIcon fontSize='small'/>
                  <p className='text'>LỊCH KHÁM</p>
                </div>

                <div className='booking'>
                  <Link className='btn-booking' onClick={() => handleToDetail(doctor)}>Đăng ký khám</Link>
                </div>

                <p className='txt'>Chọn  và đặt (Phí đặt lịch 0đ)</p>
            </div>

            <div className='booking-address'>
                <p className='title'>ĐỊA CHỈ KHÁM</p>
                <p className='content'>
                  {doctor?.clinic?.name}
                </p>
                <p className='content'>
                  {doctor?.clinic?.address}
                </p>
            </div>

            <ShowPriceList detail={doctor}/>

            <ShowInsurance />
            </div>
          </div>
        ))}
        </Container>
      </div>
    </div>
  </BookingWrapper>
  )
}


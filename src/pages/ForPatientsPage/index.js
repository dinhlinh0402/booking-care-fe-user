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

import { useParams, useNavigate } from 'react-router-dom';

import baseURL from '../../utils';

import * as image from "../../assets";

import SpecialistFrom from '../../components/atoms/SpecialistForm';
import ShowPriceList from '../../components/atoms/ShowForm/ShowPriceList';
import ShowInsurance from '../../components/atoms/ShowForm/ShowInsurance';

import SpecialtyApi from '../../apis/SpecialtyApi';

import DoctorApi from '../../apis/DoctorApi';
import { Spin } from 'antd';
import './index.scss';
import Schedule from '../ClinicDetailPage/components/Schedule';

export default function ForPatientsPage() {
  let { id } = useParams();
  let navigate = useNavigate();
  const [location, setLocation] = useState('');
  // const [date, setDate] = useState('');

  const [detailSpecs, setDetailSpecs] = useState();
  const [doctors, setDoctors] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const getSpecialty = useCallback(async () => {
    try {
      setLoading(true);
      const response = await SpecialtyApi.getOne(id);
      if (response.data) {
        setDetailSpecs(response.data);
      }
      setLoading(false);
    } catch (error) {
      console.error('error: ', error);
      setLoading(false);

    }
  }, [id]);

  const getDoctor = useCallback(async () => {
    try {
      setLoading(true);
      const response = await DoctorApi.getAll({
        specialtyId: id,
        page: 1,
        take: 100,
      });
      if (response?.data) {
        setDoctors(response.data.data);
      }
      setLoading(false);
    } catch (error) {
      console.error('error: ', error);
      setLoading(false);
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

  return (<BookingWrapper>
    <>
      {loading ? (
        <div className="spin">
          <Spin />
        </div>
      ) : (
        <div className='specialty'>
          <div
            className='description_specialty'>
            <h1>{detailSpecs?.name || ''}</h1>
            <div dangerouslySetInnerHTML={{ __html: detailSpecs?.description || '' }} />
            {/* <div>Ẩn/Hiện</div> */}
          </div>

          <div className='list_schedule_doctor'>
            {doctors && doctors.length > 0 &&
              doctors.map(item => (
                <Schedule key={item.id} doctor={item} />
              ))
            }
          </div>

        </div>
      )}
    </>

  </BookingWrapper>
  )
}
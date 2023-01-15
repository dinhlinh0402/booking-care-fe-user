import React, { useState, useEffect, useCallback } from "react";
import { BookingWrapper } from "./styled";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Avatar from "@mui/material/Avatar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Link } from "@mui/material";

import { useParams, useNavigate } from "react-router-dom";

import baseURL from "../../utils";

import * as image from "../../assets";

import SpecialistFrom from "../../components/atoms/SpecialistForm";
import ShowPriceList from "../../components/atoms/ShowForm/ShowPriceList";
import ShowInsurance from "../../components/atoms/ShowForm/ShowInsurance";

import ClinicApi from "../../apis/ClinicApi";

import DoctorApi from "../../apis/DoctorApi";
import { Space, Spin, Tabs } from "antd";
import './clinicDetail.scss';
import LocationIcon from '../../components/Icon/LocationIcon';
import Introduct from "./components/Introduct";
import Strengths from "./components/Strengths";
import Equipment from "./components/Equipment";
import Location from "./components/Location";
import Procedure from "./components/Procedure";

export default function ClinicDetail() {
  let { id } = useParams();
  let navigate = useNavigate();
  const [location, setLocation] = useState("");
  // const [date, setDate] = useState('');

  const [detailClinic, setDetaiClinic] = useState();
  const [doctors, setDoctors] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const getClinic = useCallback(async () => {
    try {
      setLoading(true);
      const response = await ClinicApi.getOne(id);
      if (response?.data) {
        setDetaiClinic(response?.data || null);
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
        page: 1,
        take: 100,
        clinicId: id,
      });
      if (response?.data) {
        setDoctors(response.data.data || []);
      }
      setLoading(false);
    } catch (error) {
      console.error('error: ', error);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getClinic();
    getDoctor();
  }, [getClinic, getDoctor]);

  const handleToDetail = (doctor) => {
    navigate(`/ForDoctorsPage/${doctor.id}`);
  };

  return (
    // <BookingWrapper>
    <>
      {loading ? (
        <div className="spin">
          <Spin />
        </div>
      ) : (
        <div className="container">
          {/* <SpecialistFrom detail={detailSpecs} /> */}
          <div className="header_clinic">
            <Space size={30}>
              <Avatar
                shape="square"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                style={{
                  width: '100px',
                  height: '100px',
                }}
              />
              <div className="name_address_clinic">
                <div className="name">
                  {detailClinic && detailClinic?.name ? detailClinic.name : ''}
                </div>
                <div className="address">
                  <Space>
                    <span style={{
                      fontSize: '23px',
                    }}>
                      <LocationIcon
                        style={{
                          transform: 'translate(-4px, 4px)'
                        }}
                      />
                    </span>
                    <span >{detailClinic?.address || ''}</span>
                  </Space>

                </div>
              </div>
            </Space>
          </div>
          <div className="content">

            <Tabs defaultActiveKey="1" centered>
              <Tabs.TabPane tab="Đặt lịch khám" key="6">
                <Container>
                  {doctors?.map((doctor) => (
                    <div className="wrapper" key={doctor.id}>
                      <div className="wp-left">
                        <div className="img">
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
                          <Link
                            className="link"
                            onClick={() => handleToDetail(doctor)}
                          >
                            Xem thêm
                          </Link>
                        </div>
                        <div className="information">
                          <p className="name">
                            {doctor?.doctorInfor?.position} {doctor.lastName}{" "}
                            {doctor.middleName} {doctor.firstName}
                          </p>
                          <p className="detail">{doctor?.doctorInfor?.introduct}</p>
                          <p className="detail">{doctor?.doctorInfor?.note}</p>
                          <div className="address">
                            <div className="icons">
                              <LocationOnIcon fontSize="small" />
                            </div>
                            Hà nội
                          </div>
                        </div>
                      </div>

                      <div className="wp-right">
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

                        <div className="calender">
                          <div className="title">
                            <CalendarMonthIcon fontSize="small" />
                            <p className="text">LỊCH KHÁM</p>
                          </div>

                          <div className="booking">
                            <Link
                              className="btn-booking"
                              onClick={() => handleToDetail(doctor)}
                            >
                              Đăng ký khám
                            </Link>
                          </div>

                          <p className="txt">Chọn và đặt (Phí đặt lịch 0đ)</p>
                        </div>

                        <div className="booking-address">
                          <p className="title">ĐỊA CHỈ KHÁM</p>
                          <p className="content">{doctor?.clinic?.name}</p>
                          <p className="content">{doctor?.clinic?.address}</p>
                        </div>

                        <ShowPriceList detail={doctor} />

                        <ShowInsurance />
                      </div>
                    </div>
                  ))}
                </Container>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Giới thiệu" key="1">
                <Introduct />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Thế mạnh chuyên môn" key="2">
                <Strengths />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Trang thiết bị" key="3">
                <Equipment />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Vị trí" key="4">
                <Location />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Quy trình đi khám" key="5">
                <Procedure />
              </Tabs.TabPane>

            </Tabs>

          </div>
        </div>
      )}


      {/* </BookingWrapper> */}
    </>
  );
}
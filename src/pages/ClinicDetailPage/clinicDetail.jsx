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

import { useParams, useNavigate } from "react-router-dom";

import baseURL from "../../utils";

import * as image from "../../assets";

import SpecialistFrom from "../../components/atoms/SpecialistForm";
import ShowPriceList from "../../components/atoms/ShowForm/ShowPriceList";
import ShowInsurance from "../../components/atoms/ShowForm/ShowInsurance";

import ClinicApi from "../../apis/ClinicApi";

import DoctorApi from "../../apis/DoctorApi";
import { Space, Spin, Tabs, Typography } from "antd";
import './clinicDetail.scss';
import LocationIcon from '../../components/Icon/LocationIcon';
import Introduct from "./components/Introduct";
import Strengths from "./components/Strengths";
import Equipment from "./components/Equipment";
import Location from "./components/Location";
import Procedure from "./components/Procedure";
import Schedule from "./components/Schedule";

export default function ClinicDetail() {
  let { id } = useParams();
  let navigate = useNavigate();
  const [location, setLocation] = useState("");
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
        const listId = response?.data?.data.map(item => item.id)
        setDoctors(response.data.data || []);
        // setListDoctorId(listId || []);
        // setListDoctorId([listId[4]] || []);
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
                src={`${baseURL}${detailClinic?.image || ''}`}
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

            <Tabs defaultActiveKey="6" centered>
              <Tabs.TabPane tab="Đặt lịch khám" key="6">
                {doctors && doctors.length > 0 &&
                  doctors.map(item => (
                    <Schedule key={item.id} doctor={item} />
                  ))
                }
              </Tabs.TabPane>
              {detailClinic && detailClinic?.clinicInfor?.introduct && (
                <Tabs.TabPane tab="Giới thiệu" key="1">
                  <Introduct dataIntroduct={detailClinic?.clinicInfor?.introduct || null} />
                </Tabs.TabPane>
              )}
              {detailClinic && detailClinic?.clinicInfor?.strengths && (
                <Tabs.TabPane tab="Thế mạnh chuyên môn" key="2">
                  <Strengths dataStrengths={detailClinic?.clinicInfor?.strengths} />
                </Tabs.TabPane>
              )}

              {detailClinic && detailClinic?.clinicInfor?.equipment &&
                (
                  <Tabs.TabPane tab="Trang thiết bị" key="3">
                    <Equipment dataEquipment={detailClinic?.clinicInfor?.equipment} />
                  </Tabs.TabPane>
                )}

              {detailClinic && detailClinic?.clinicInfor?.location &&
                (
                  <Tabs.TabPane tab="Vị trí" key="4">
                    <Location dataLocation={detailClinic?.clinicInfor?.location} />
                  </Tabs.TabPane>
                )}

              {detailClinic && detailClinic?.clinicInfor?.procedure &&
                (
                  <Tabs.TabPane tab="Quy trình đi khám" key="5">
                    <Procedure dataProcedure={detailClinic?.clinicInfor?.procedure} />
                  </Tabs.TabPane>
                )}

            </Tabs>

          </div>
        </div>
      )}

      {/* </BookingWrapper> */}
    </>
  );
}
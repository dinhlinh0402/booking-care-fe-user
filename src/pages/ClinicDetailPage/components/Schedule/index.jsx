import { CalendarOutlined } from "@ant-design/icons";
import { Avatar, Button, Divider, Empty, Modal, Select, Space, Spin, Typography } from "antd";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SchedulesApi from "../../../../apis/SchedulesApi";
import LocationIcon from "../../../../components/Icon/LocationIcon";
import ModalBooking from "../../../../components/ModalBooking";
import baseURL from "../../../../utils";
import './index.scss';

const { Text, Title } = Typography;
const { Option } = Select;
const dateNow = new Date();

const positionDoctor = {
  ASSOCIATE_PROFESSOR: 'Phó Giáo sư',
  NONE: 'Bác sĩ', // bác sĩ
  MASTER: 'Thạc sĩ', // Thạc sĩ
  DOCTOR: 'Tiến sĩ', // Tiến sĩ
  PROFESSOR: 'Giáo sư',
}

const payment = {
  ALL_PAYMENT_METHOD: 'Tất cả phương thức thanh toán',
  CASH: 'Tiền mặt',
  CREDIT_CARD: 'Thanh toán bằng thẻ'
}

const Schedule = ({
  doctor
}) => {
  const [selectedDate, setSelectedDate] = useState();
  const [daysOption, setDaysOption] = useState([]);
  const navigate = useNavigate();
  const [doctorSchedules, setDoctorSchedules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModalDontLogin, setShowModalDontLogin] = useState(false);
  const [detailSchedule, setDetailSchedule] = useState(null);
  const [isModalBooking, setModalBooking] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const days = getDays();
    setSelectedDate(days && days.length > 0 ? days[0].value : undefined);
    setDaysOption(days ? days : []);
  }, [])

  useEffect(() => {
    if(selectedDate)
      getDoctorSchedules();
  }, selectedDate)

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

  const getDoctorSchedules = useCallback(async () => {
    setLoading(true);
    try {
      const response = await SchedulesApi.getSchedules({
        doctorId: doctor.id,
        date: selectedDate,
        page: 1,
        take: 100,
      });
      if(response?.data?.data) {
        setDoctorSchedules(response?.data?.data || []);
      }
      setLoading(false);
    } catch (error) {
      console.error(error.response);
      setLoading(false);
    }
  }, [selectedDate]);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleChangeDate = (value) => {
    // console.log('date: ', date);
    // console.log('stringDate: ', stringDate);
    setSelectedDate(value);
  };

  const handleCheckBooking = (schedule) => {
    if(localStorage.getItem('accessToken')) {
      setDetailSchedule(schedule);
      setModalBooking(true);
    } else setShowModalDontLogin(true);
  }

  return (
    <>
    <div>
      <div className="card_schedule_doctor">
        <div className="information_doctor">
          <div style={{
              display: 'flex'
            }}>
            <div style={{
              marginRight: '20px'
            }}>
              <Avatar size={70} src={`${baseURL}${doctor?.avatar}`} 
                style={{
                  cursor: 'pointer'
                }}
                onClick={() => navigate(`/ForDoctorsPage/${doctor.id}`)}
              />
              <div 
                style={{
                  color: '#45c3d2',
                  cursor: 'pointer',
                }}
                onClick={() => navigate(`/ForDoctorsPage/${doctor.id}`)}
              >Xem thêm</div>
            </div>
            
            <div className="information">
              <div className="name_doctor">
                <span
                  onClick={() => navigate(`/ForDoctorsPage/${doctor.id}`)}
                >
                  {doctor?.doctorInfor?.position ? positionDoctor[doctor?.doctorInfor?.position] : 'Bác sĩ'}, {doctor.firstName}{" "}
                  {doctor.middleName} {doctor.lastName}
                </span>
              </div>
              <div className="introduct">
              {/* <div dangerouslySetInnerHTML={{__html: doctor?.doctorInfor?.introduct || ''}}/> */}
              {doctor?.doctorInfor?.introduct}
              </div>
              <div className="location">
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
                    <span >{doctor?.clinic?.address || ''}</span>
                  </Space>
              </div>
            </div>
          </div>
        </div>
        <div className="schedule_doctor">
          <div>
            <Select
              // defaultValue={selectedDate}
              style={{ width: 200 }}
              onChange={handleChangeDate}
              value={selectedDate}
            >
              {daysOption && daysOption?.length > 0 && (
                daysOption.map((day, index) => (
                  <Option key={index} value={day.value}>
                    {day.label}
                  </Option>
                )))} 
            </Select>
          </div>
          <div style={{
            marginTop: '15px',
            fontWeight: '600',
          }}>
            <CalendarOutlined style={{
              marginRight: '10px'
            }}/>
            <span>LỊCH KHÁM</span>
          </div>
          {loading ? (
            <div className="spin">
              <Spin />
            </div>
          ) : (
            <div className="list_schedule">
              
              {doctorSchedules.length > 0 ? (
                <>
                <Space size={[8, 16]} wrap>
                  {doctorSchedules.map(schedule => (
                    <Button
                      key={schedule.id}
                      className="button_schedule"
                      onClick={() => handleCheckBooking(schedule)}
                    >
                      {moment(schedule?.timeStart).format("LT")} -{" "}
                      {moment(schedule?.timeEnd).format("LT")}
                    </Button>
                  ))}
                  </Space>
                  <div style={{
                    marginTop: '10px'
                  }}>Chọn và đặt lịch khám</div>
                </>
              ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}
            </div>
          )}  
          <Divider style={{
            margin: '10px 0'
          }}/>
          <div className="price">
            <div>
              <span style={{
              fontWeight: 500
            }}>Giá khám: </span>
            <span>{doctor?.doctorInfor?.price.toLocaleString("it-IT") || ''} đ</span>
            </div>
          </div>
          <Divider style={{
            margin: '10px 0'
          }}/>
          <div>
            <div>
              <span style={{
              fontWeight: 500
            }}>Phương thức thanh toán: </span>
            <span>{payment[doctor?.doctorInfor?.payment] || ''}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Modal
      visible={showModalDontLogin}
      onCancel={() => {
        setShowModalDontLogin(false)
      }}
      footer={false}
      style={{
        textAlign:'center'
      }}
      width={450}
      height={300}
    >
        <Title level={2}>Bạn chưa đăng nhập</Title>
        <Text>Hãy đăng nhập để đăng ký lịch khám bệnh miễn phí</Text>
        <div style={{
          marginTop: '20px'
        }}>
          <Button
              type="primary"
                onClick={() => {
                navigate('/login')
              }}
            >
              Đăng nhập
            </Button>
            <Button
              danger
              type="primary" 
              onClick={() => setShowModalDontLogin(false)}
              style={{
                marginLeft: '10px'
              }}
            >
              Huỷ
          </Button>
        </div>
    </Modal>

    <ModalBooking
      showModal={isModalBooking}
      doctor={doctor}
      timeSchedules={detailSchedule}
      selectedDate={selectedDate}
      handleCancelModal={() => setModalBooking(false)}
    />
  </>
  )
}

export default Schedule;
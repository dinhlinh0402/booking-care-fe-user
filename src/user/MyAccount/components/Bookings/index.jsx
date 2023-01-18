import React, { useState } from "react";
import './index.scss';
import { Button, Modal, Space, Spin, Table, Tag } from "antd";
import { FormOutlined } from "@ant-design/icons";
import moment from "moment";
import BookingApi from "../../../../apis/BookingApi";
import { useEffect } from "react";
import DetailBooking from "./components/DetailBooking";
import { toast } from "react-toastify";
import baseURL from "../../../../utils";
import { set } from "react-hook-form";

const Bookings = () => {
  const [loading, setLoading] = useState(false);
  const [loadingUpdateStatus, setLoadingUpdateStatus] = useState(false);
  const [dataBookings, setDataBookings] = useState(null);
  const [dataResponse, setDataResponse] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    take: 10,
  });

  const [detailBooking, setDetailBooking] = useState(null);
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [showModalChangeStatus, setShowModalChangeStatus] = useState(false);
  const [dataChange, setDataChange] = useState(null);

  useEffect(() => {
    if (!loadingUpdateStatus)
      getDataBookings();
  }, [loadingUpdateStatus])

  const getDataBookings = async () => {
    try {
      setLoading(true);
      const userLocal = JSON.parse(localStorage.getItem('user'));
      if (!userLocal) {
        setLoading(false);
        return;
      }
      const dataRes = await BookingApi.getBookings({
        ...pagination,
        patientId: userLocal.id || undefined,
      })
      if (dataRes?.data?.data) {
        const { data } = dataRes?.data;
        const newData = data.map(item => {
          const nameDoctor = `${item?.doctor.firstName ? item?.doctor.firstName : ''} ${item?.doctor?.middleName ? item?.doctor?.middleName : ''} ${item?.doctor?.lastName ? item?.doctor?.lastName : ''}`.trim();
          let type = '';
          if (item.type === 'FOR_RELATIVES')
            type = `Đặt hộ: ${item?.bookingRelatives?.name || ''}`;
          else type = 'Đặt cho bản thân';

          return {
            id: item.id,
            timeStart: item?.schedule.timeStart,
            timeEnd: item?.schedule.timeEnd,
            time: `${moment(item?.schedule?.timeStart).format('HH:mm')} - ${moment(item?.schedule?.timeEnd).format('HH:mm')} ${moment(item?.schedule?.timeEnd).format('DD/MM/YYYY')}`,
            type: type,
            nameDoctor: nameDoctor,
            reason: item?.reason || '',
            status: item?.status || '',
            patientId: item?.patient?.id,
            prescription: item?.history?.prescription ? `${baseURL}${item?.history?.prescription}` : '',
            doctorNote: item?.history?.doctorNote || '',
          }
        })
        setDataBookings(newData || [])
        setDataResponse(dataRes?.data);
      }
      setLoading(false);
    } catch (error) {
      console.log('error: ', error);
      setLoading(false);
    }
  }

  const columns = [
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'time',
      width: 80,
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type',
      width: 70,
    },
    {
      title: 'Lý do khám',
      dataIndex: 'reason',
      key: 'reason',
      width: 70,
      ellipsis: true,
    },
    {
      title: 'Đơn thuốc ',
      dataIndex: 'prescription',
      key: 'prescription',
      width: 70,
      ellipsis: true,
      render: (value) => (
        <>
          {value ? (
            <a download href={value}>
              <div>Xem đơn thuốc</div>
            </a>
          ) : ''}
        </>
      )
    },
    {
      title: 'Tên bác sĩ',
      dataIndex: 'nameDoctor',
      key: 'nameDoctor',
      ellipsis: true,
      width: 70
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 50,
      align: 'center',
      render: (_, record) => {
        let color = '';
        let text = '';
        if (record.status === 'WAITING') {
          color = 'warning';
          text = 'Chưa xác nhận';
        }
        else if (record.status === 'CANCEL') {
          color = 'error';
          text = 'Đã hủy';
        }
        else if (record.status === 'DONE') {
          color = 'success';
          text = 'Đã hoàn thành';
        }
        else if (record.status === 'CONFIRMED') {
          color = 'processing';
          text = 'Đã xác nhận';
        }
        else color = 'red';

        return (
          <>
            <Tag color={color} key={record.status}>
              {text}
            </Tag>
          </>
        )
      }
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 100,
      render: (_, record) => (
        <>
          {record.status === 'CANCEL' ? null : (
            <Space size="middle">
              {record.status === 'WAITING' && (
                <>
                  <Button
                    // disabled={!moment('2014-03-24T01:15:00.000Z').isSame(moment('2014-03-24T01:14:00.000Z'))}
                    className="btn"
                    style={{
                      minWidth: '50px'
                    }}
                    type="primary"
                    // icon={< />}
                    onClick={() => handleChangeStatusConfirm('CONFIRMED', record.id)}
                  >Xác nhận</Button>
                  <Button
                    className="btn"
                    style={{
                      minWidth: '50px'
                    }}
                    type="primary"
                    danger
                    onClick={() => {
                      setShowModalChangeStatus(true);
                      setDataChange({ status: 'CANCEL', bookingId: record.id })
                    }}
                  >Hủy</Button>
                </>
              )}

              {record.status === 'CONFIRMED' && (
                <>
                  <Button
                    className="btn"
                    style={{
                      minWidth: '50px'
                    }}
                    type="primary"
                    danger
                    onClick={() => {
                      setShowModalChangeStatus(true);
                      setDataChange({ status: 'CANCEL', bookingId: record.id })
                    }}
                  >Hủy</Button>
                </>
              )}

              {record.status === 'DONE' && (
                <>
                  <Button
                    className="btn_detail"
                    icon={<FormOutlined />}
                    style={{
                      minWidth: '30px'
                    }}
                    onClick={() => {
                      setDetailBooking(record);
                      setShowModalDetail(true);
                    }}
                  >Chi tiết</Button>
                </>
              )}

            </Space>
          )}
        </>

      )
    }
  ];

  const handleChangeStatusConfirm = async (status, bookingId) => {
    setLoadingUpdateStatus(true);
    if (status !== 'CONFIRMED') {
      toast.error('Thay đổi trạng thái không thành công!');
      return;
    }
    try {
      const dataUpdate = await BookingApi.updateBooking({
        status: status
      }, bookingId);
      if (dataUpdate.status === 200 && dataUpdate.data === true) {
        toast.success('Thay đổi trạng thái thành công');
      }
      // handleReset();
      setLoadingUpdateStatus(false);
    } catch (error) {
      console.log('error: ', error);
      toast.error('Thay đổi trạng thái không thành công!');
      setLoadingUpdateStatus(false);
    }
  }

  const handleChangeStatus = async () => {
    setLoadingUpdateStatus(true);
    const { status, bookingId } = dataChange;
    const listStatus = ['CANCEL', 'CONFIRMED'];
    if (!dataChange || !listStatus.includes(status)) {
      toast.error('Thay đổi trạng thái không thành công!');
      return;
    }
    try {
      const dataUpdate = await BookingApi.updateBooking({
        status: status
      }, bookingId);
      if (dataUpdate.status === 200 && dataUpdate.data === true) {
        toast.success('Thay đổi trạng thái thành công');
      }
      setDataChange(null);
      setShowModalChangeStatus(false);
      setLoadingUpdateStatus(false);
    } catch (error) {
      console.log('error: ', error);
      toast.error('Thay đổi trạng thái không thành công!');
      setDataChange(null);
      setLoadingUpdateStatus(false);
    }
  }

  return (
    <>
      {loading ? (
        <div className="spin">
          <Spin />
        </div>
      ) : (
        <div>
          <div className="title">
            <h2>Lịch sử khám bệnh</h2>
          </div>

          <div>
            <Table
              loading={loading || loadingUpdateStatus}
              rowKey={'id'}
              dataSource={dataBookings}
              columns={columns}
              pagination={{
                current: dataResponse?.meta?.page || 1, // so trang
                total: dataResponse?.meta?.itemCount || 10, // tong tat ca 
                defaultPageSize: dataResponse?.meta?.take || 10,
                showSizeChanger: true,
                pageSizeOptions: ['10', '20', '50', '100'],
                locale: { items_per_page: ' kết quả/trang' },
                onChange: (page, pageSize) => {
                  setPagination({
                    ...pagination,
                    page,
                    pageSize,
                  });
                },
              }}
            />
          </div>

        </div>
      )}
      <DetailBooking
        detailBooking={detailBooking}
        showModal={showModalDetail}
        handleCancelModal={() => setShowModalDetail(false)}
      />

      <Modal
        visible={showModalChangeStatus}
        onOk={handleChangeStatus}
        onCancel={() => {
          setDataChange(null);
          setShowModalChangeStatus(false);
        }}
        cancelText={'Hủy'}
        okText={'Xác nhận'}
        className='confirm_delete_label'
        width={370}
      >
        <h2 style={{ color: '#595959', fontWeight: 700, textAlign: 'center' }}>
          Bạn có muốn hủy lịch hẹn không?
        </h2>
      </Modal>
    </>
  )
}

export default Bookings;
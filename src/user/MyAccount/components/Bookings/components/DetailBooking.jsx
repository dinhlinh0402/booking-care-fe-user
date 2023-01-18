import { Button, Col, DatePicker, Divider, Form, Input, Modal, Row, Select, Spin, Table } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import './DetailBooking.scss';

const { TextArea } = Input;

const DetailBooking = ({
  detailBooking,
  showModal,
  handleCancelModal,
}) => {
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [dataHistoryPatient, setDataHistoryPatient] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (detailBooking) {
      form.setFieldsValue({
        // name: detailBooking?.namePatient || '',
        // email: detailBooking?.email || '',
        reason: detailBooking?.reason || '',
        doctorNote: detailBooking?.doctorNote || null,
      })
    }
  }, [detailBooking]);

  return (
    <Modal
      className='detail_modal'
      title={
        <>
          <div>Chi tiết</div>
        </>
      }
      visible={showModal}
      onCancel={() => {
        if (!loading) {
          handleCancelModal();
          form.resetFields()
        }
      }}
      width={700}
      height={500}
      footer={false}
    >
      <Spin spinning={loading}>
        <Form
          name='patient'
          // onFinish={(values) => handleSubmit(values)}
          autoComplete='off'
          layout='vertical'
          form={form}
        >
          <Row gutter={24}>
            {/* <Col span={12}>
                <Form.Item
                  name={'name'}
                  label={<span className='txt_label'>Tên bệnh nhân</span>}
                >
                  <Input
                    disabled
                    size='middle'
                    className='txt_input'
                    placeholder={'Tên bệnh nhân'} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={'email'}
                  label={<span className='txt_label'>Email</span>}
                >
                  <Input
                    disabled
                    size='middle'
                    className='txt_input'
                    placeholder={'Email'} />
                </Form.Item>
              </Col> */}

            <Col span={24}>
              <Form.Item
                name={'reason'}
                label={<span className='txt_label'>Lý do khám</span>}
              >
                <TextArea
                  disabled
                  rows={4}
                  placeholder='Lý do'
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name={'doctorNote'}
                label={<span className='txt_label'>Ghi chú của bác sĩ</span>}
              >
                <TextArea
                  disabled
                  rows={4}
                  placeholder={detailBooking?.doctorNote ? 'Ghi chú' : 'Không có thông tin'}
                />
              </Form.Item>
            </Col>
          </Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button
              className='btn_cancel'
              danger size='middle'
              onClick={() => {
                handleCancelModal();
                form.resetFields();
              }}
            >
              Đóng
            </Button>



          </Col>
        </Form>
      </Spin>
    </Modal>
  )
}

export default DetailBooking;
import React from "react";
import { Button, Space, Tabs } from "antd";
import './index.scss';
import { useNavigate } from "react-router-dom";
import { KeyOutlined, UnorderedListOutlined, UserOutlined } from "@ant-design/icons";
import PersonalInformation from "./components/PersonalInformation";
import ChangePassword from "./components/ChangePassword";
import Bookings from "./components/Bookings";


const MyAccount = () => {
  let navigate = useNavigate();

  return (
    <div className="box_container">
      <div className="my_account_container">
        <Tabs defaultActiveKey="1" tabPosition='left'>
          <Tabs.TabPane
            tab={
              <Space>
                <UserOutlined />
                <span>Thông tin tài khoản</span>
              </Space>
            }
            key="1"
          >
            <PersonalInformation />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <Space>
                <KeyOutlined />
                <span>Đổi mật khẩu</span>
              </Space>
            }
            key="2"
          >
            <ChangePassword />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <Space>
                <UnorderedListOutlined />
                <span>Lịch sử đặt lịch</span>
              </Space>
            }
            key="3"
          >
            <Bookings />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default MyAccount;
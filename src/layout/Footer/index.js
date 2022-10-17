import React from "react";
import { Link } from "react-router-dom";
import FooterWrapper from "./styled";
import Container from "@mui/material/Container";
import * as images from "../../assets/index";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import PhoneIphoneRoundedIcon from "@mui/icons-material/PhoneIphoneRounded";
// test commits 123
const Footer = () => {
  return (
    <FooterWrapper>
      <div>
        <Container className="Container">
          <div className="footer-top">
            <div className="ft-left">
              <img className="img-logo" src={images.Logo} alt="logo" />
              <div className="information">
                <p className="name">Công ty Cổ phần Công nghệ BookingCare</p>
                <div className="info">
                  <div className="icons">
                    <LocationOnIcon fontSize="small" />
                  </div>
                  28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội
                </div>
                <div className="info">
                  <div className="icons">
                    <DoneRoundedIcon fontSize="small" />
                  </div>
                  ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015
                </div>
                <img
                  className="img-logo-bo"
                  src={images.Bo_Cong_Thuong}
                  alt="Bo"
                />
                <img
                  className="img-logo-bo"
                  src={images.Bo_Cong_Thuong}
                  alt="Bo"
                />
              </div>
            </div>

            <div className="ft-center">
              <ul>
                <li>
                  <Link className="link" to={""}>
                    Liên hệ hợp tác
                  </Link>
                </li>
                <li>
                  <Link className="link" to={""}>
                    Câu hỏi thường gặp
                  </Link>
                </li>
                <li>
                  <Link className="link" to={""}>
                    Điều khoản sử dụng
                  </Link>
                </li>
                <li>
                  <Link className="link" to={""}>
                    Chính sách Bảo mật
                  </Link>
                </li>
                <li>
                  <Link className="link" to={""}>
                    Quy trình hỗ trợ giải quyết khiếu nại
                  </Link>
                </li>
                <li>
                  <Link className="link" to={""}>
                    Quy chế hoạt động
                  </Link>
                </li>
              </ul>
            </div>

            <div className="ft-right">
              <ul>
                <li className="title">Trụ sở tại Hà Nội</li>
                <li className="address">
                  28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội
                </li>
                <li className="title">Văn phòng tại TP Hồ Chí Minh</li>
                <li className="address">
                  6/6 Cách Mạch Tháng Tám, P. Bến Thành, Quận 1
                </li>
                <li className="title">Hỗ trợ khách hàng</li>
                <li className="address">support@bookingcare.vn (7h - 18h)</li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="icons">
              <PhoneIphoneRoundedIcon fontSize="small" />
            </div>
            <p>
              Tải ứng dụng BookingCare cho điện thoại hoặc máy tính bảng:&nbsp;
              <Link className="link" to={""}>
                Android
              </Link>{" "}
              -&nbsp;
              <Link className="link" to={""}>
                iPhone/iPad
              </Link>{" "}
              -&nbsp;
              <Link className="link" to={""}>
                Khác
              </Link>
            </p>
          </div>
        </Container>
      </div>
    </FooterWrapper>
  );
};

export default Footer;

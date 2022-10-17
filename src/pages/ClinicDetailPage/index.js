import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Link,
  Breadcrumbs,
  Typography,
  Container,
  Avatar,
  CircularProgress,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useParams } from "react-router-dom";
import { DetailItem, DetailTitle, DetailContent } from "./styled";
import * as image from "../../assets";

import baseURL from "../../utils";
import ClinicApi from "../../apis/ClinicApi";
import DepthsModal from "./depthsModal";

const ClinicDetailPage = () => {
  let { id } = useParams();
  const [clinic, setClinic] = useState("");
  const [depthsModal, setDepthsModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const getClinicDetail = useCallback(async () => {
    try {
      const response = await ClinicApi.getOne(id);
      setClinic(response.data);
      console.log("response", response);
    } catch (error) {
      console.error(error.response);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getClinicDetail();
  }, [getClinicDetail]);

  return (
    <Box>
      {loading && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            position: "fixed",
            pt: 2,
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <Container role="presentation">
        <Breadcrumbs aria-label="breadcrumb" color="#45c3d2" sx={{ py: 1 }}>
          <Link underline="none" color="#45c3d2" href="/">
            <HomeIcon fontSize="medium" sx={{ pt: 0.5 }} />
          </Link>
          <Link
            underline="none"
            color="#45c3d2"
            href="/FacilitiesPage"
            sx={{ fontSize: 14 }}
          >
            Bệnh Viện
          </Link>
          <Link
            underline="none"
            color="#45c3d2"
            href={`/ClinicDetailPage/${clinic?.id}`}
            sx={{ fontSize: 14 }}
          >
            {clinic?.name}
          </Link>
        </Breadcrumbs>
      </Container>
      <Container>
        {!clinic.image ? (
          <img
            alt={clinic.id}
            src="https://tle.com.vn/public/media/2016/08/benh_vien_phuc_yen.jpg"
            width="100%"
            height="500px"
          />
        ) : (
          <img alt={clinic.id} src={`${baseURL}${clinic.image}`} width="100%" />
        )}
      </Container>
      <Container sx={{ mb: 8 }}>
        <Box
          sx={{
            pb: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex" }}>
            {!clinic.avatar ? (
              <Avatar
                alt={clinic.id}
                src={image.DepthsDefault}
                sx={{
                  width: 100,
                  height: 100,
                  mb: 1,
                  border: "0.5px solid #999999",
                }}
              />
            ) : (
              <Avatar
                alt={clinic.id}
                src={`${baseURL}${clinic.avatar}`}
                sx={{ width: 100, height: 100, mb: 1 }}
              />
            )}
            <Box sx={{ pl: 2 }}>
              <Typography sx={{ fontSize: 18, fontWeight: "600", pb: 1 }}>
                Bệnh Viện {clinic.name}
              </Typography>
              <Typography
                sx={{ fontSize: 13, color: "#555", fontWeight: "500" }}
              >
                Địa chỉ: {clinic.address}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              bgcolor: "#FFC419",
              borderRadius: 1,
              px: 2,
              py: 1,
              cursor: "pointer",
              color: "white",
              fontWeight: "600",
            }}
            onClick={() => console.log("huhu")}
          >
            Đặt lịch khám
          </Box>
        </Box>
        <Box>
          <Box
            sx={{ bgcolor: "#DFF0D8", px: 2, py: 1, borderRadius: 1.5, my: 2 }}
          >
            <Typography>
              BookingCare là Nền tảng Y tế chăm sóc sức khỏe toàn diện hàng đầu
              Việt Nam kết nối người dùng với trên 150 bệnh viện - phòng khám uy
              tín, hơn 1,000 bác sĩ chuyên khoa giỏi và hàng nghìn dịch vụ, sản
              phẩm y tế chất lượng cao.
            </Typography>
          </Box>
          <Box
            sx={{ bgcolor: "#FFFFCC", px: 2, py: 1, borderRadius: 1.5, mb: 1 }}
          >
            Từ nay, người bệnh có thể đặt lịch tại Khu khám bệnh theo yêu cầu,
            Bệnh viện Hữu nghị Việt Đức thông qua hệ thống đặt khám BookingCare.
            <ul>
              <li>
                Được lựa chọn các giáo sư, tiến sĩ, bác sĩ chuyên khoa giàu kinh
                nghiệm{" "}
              </li>
              <li>
                Hỗ trợ đặt khám trực tuyến trước khi đi khám (miễn phí đặt lịch)
              </li>
              <li>
                Giảm thời gian chờ đợi khi làm thủ tục khám và ưu tiên khám
                trước Nhận được hướng dẫn chi tiết sau khi đặt lịch
              </li>
            </ul>
          </Box>
          <DetailItem>
            <DetailTitle>GIỚI THIỆU</DetailTitle>
            <DetailContent>{clinic?.clinicInfor?.introduct}</DetailContent>
          </DetailItem>
          <DetailItem>
            <DetailTitle>THẾ MẠNH CHUYÊN MÔN</DetailTitle>
            <DetailContent>{clinic?.clinicInfor?.strengths}</DetailContent>
          </DetailItem>
          <DetailItem>
            <DetailTitle>TRANG THIẾT BỊ</DetailTitle>
            <DetailContent>{clinic?.clinicInfor?.equipment}</DetailContent>
          </DetailItem>
          <DetailItem>
            <DetailTitle>VỊ TRÍ</DetailTitle>
            <DetailContent>{clinic?.clinicInfor?.location}</DetailContent>
          </DetailItem>
          <DetailItem>
            <DetailTitle>QUY TRÌNH KHÁM</DetailTitle>
            <DetailContent>{clinic?.clinicInfor?.procedure}</DetailContent>
          </DetailItem>
        </Box>
      </Container>
      <Box
        sx={{
          position: "relative",
          py: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            bgcolor: "#FFC419",
            width: "1000px",
            cursor: "pointer",
            display: "flex",
            justifyItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "16px",
            fontWeight: "600",
            borderRadius: 1.5,
            py: 1,
            boxShadow:
              "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 0px 10px",
          }}
          onClick={() => setDepthsModal(true)}
        >
          Chọn chuyên khoa
        </Box>
      </Box>
      <DepthsModal modal={depthsModal} setModal={setDepthsModal} id={id} />
    </Box>
  );
};

export default ClinicDetailPage;

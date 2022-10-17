import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Link,
  Stack,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from "@mui/material";
import * as images from "../../assets/index";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsQuestionCircleFill } from "react-icons/bs";
import { AiFillFacebook } from "react-icons/ai";
import { FaYoutubeSquare } from "react-icons/fa";
import LogoutIcons from "@mui/icons-material/Logout";
import Login from "../Login";
import Register from "../Register";
import { useNavigate } from "react-router-dom";

const pages = [
  {
    name: "Chuyên khoa",
    explain: "Tìm bác sĩ chuyên khoa",
    url: "/DepthsListPage",
  },
  {
    name: "Cơ sở y tế",
    explain: "Chọn bệnh viện phòng khám",
    url: "/FacilitiesPage",
  },
  { name: "Bác sĩ", explain: "Chọn bác sĩ giỏi", url: "/DoctorsListPage" },
  {
    name: "Gói khám",
    explain: "Khám sức khoẻ tổng quát",
    url: "/ExaminationPackagesPage",
  },
];

const drawerPages = [
  { name: "Trang chủ", url: "/" },
  { name: "Cẩm nang", url: "/" },
  { name: "Liên kết hợp tác", url: "/" },
  { name: "Admin", url: "/Admin" },
];
const aboutPages = [
  { name: "Dành cho bệnh nhân", url: "/ForPatientsPage" },
  { name: "Dành cho bác sĩ", url: "/" },
  { name: "Vai trò của Booking care", url: "/" },
  { name: "Liên hệ", url: "/" },
  { name: "Câu hỏi thường gặp", url: "/" },
  { name: "Điều khoản sử dụng", url: "/" },
  { name: "Quy trình hỗ trợ giải quyết khiếu nại", url: "/" },
  { name: "Quy chế hoạt động", url: "/" },
];

const Header = () => {
  const [drawer, setDrawer] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  const [token, setToken] = useState();
  const [name, setName] = useState("");
  const [reset, setReset] = useState(0);
  let navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userName = localStorage.getItem("userName");
    setToken(token);
    setName(userName);
  }, [reset]);

  return (
    <>
      <SwipeableDrawer
        anchor="left"
        open={drawer}
        onClose={() => setDrawer(false)}
        onOpen={() => setDrawer(true)}
      >
        {drawerPages.map((page, index) => (
          <div key={index}>
            <Link
              href={page.url}
              underline="none"
              color="#45C3DB"
              fontWeight="400"
              fontSize={15}
              lineHeight={1.5}
              py={1.5}
              px={1.5}
              display="flex"
            >
              {page.name}
            </Link>
            <Divider />
          </div>
        ))}
        <Box bgcolor="#F1F1F1" fontSize={12} px={1.5} py={0.5}>
          VỀ BOOKINGCARE
        </Box>
        {aboutPages.map((page, index) => (
          <div key={index}>
            <Link
              href={page.url}
              underline="none"
              color="#45C3DB"
              fontWeight="400"
              fontSize={15}
              lineHeight={1.5}
              p={1.5}
              display="flex"
            >
              {page.name}
            </Link>
            <Divider />
          </div>
        ))}
        <Box sx={{ px: 1, pt: 4, alignItems: "center", display: "flex" }}>
          <Link href="https://www.facebook.com/bookingcare" mr={2}>
            <AiFillFacebook color="#3C579E" size={41} />
          </Link>
          <Link href="https://www.youtube.com/channel/UC9l2RhMEPCIgDyGCH8ijtPQ">
            <FaYoutubeSquare color="#CC191E" size={36} />
          </Link>
        </Box>
      </SwipeableDrawer>

      <AppBar position="static" color="inherit">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: "flex" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={() => setDrawer(true)}
                >
                  <GiHamburgerMenu color="#888888" />
                </IconButton>
                <Link href="/">
                  <img src={images.Logo} alt="Booking Care" width={160} />
                </Link>
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                  ml: 8,
                  lineHeight: 0.8,
                }}
                py={3}
              >
                {pages.map((page) => (
                  <Box key={page.name} mx={2.5}>
                    <Link
                      href={page.url}
                      underline="none"
                      color="black"
                      fontWeight="600"
                      fontSize={13}
                      lineHeight="18px"
                    >
                      {page.name}
                    </Link>
                    <Box>
                      <Link
                        href={page.url}
                        underline="none"
                        color="black"
                        fontWeight="400"
                        fontSize={11}
                        lineHeight={1.5}
                      >
                        {page.explain}
                      </Link>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

            <Stack alignItems="center" spacing={1}>
              <Link
                textAlign="right"
                href="/"
                underline="none"
                color="#999999"
                fontSize={14}
                fontWeight="600"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexGrow: 0,
                }}
              >
                <BsQuestionCircleFill color="#45C8DF" />
                Hỗ trợ
              </Link>
              {!!token ? (
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Typography>Hi: {name}</Typography>
                  <LogoutIcons
                    onClick={() => {
                      localStorage.clear();
                      setToken();
                      setReset(reset + 1);
                      navigate("/");
                    }}
                  />
                </Stack>
              ) : (
                <Stack direction="row" spacing={1}>
                  <Button
                    size="small"
                    onClick={() => setLoginModal(true)}
                    variant="contained"
                  >
                    sign in
                  </Button>
                  <Button
                    size="small"
                    onClick={() => setRegisterModal(true)}
                    variant="contained"
                  >
                    sign up
                  </Button>
                </Stack>
              )}
            </Stack>
            <Login
              reset={reset}
              modal={loginModal}
              setModal={setLoginModal}
              setRegisterModal={setRegisterModal}
              setReset={setReset}
            />
            <Register modal={registerModal} setModal={setRegisterModal} />
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;

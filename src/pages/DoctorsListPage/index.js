import {
  Box,
  Input,
  List,
  ListItem,
  ListItemText,
  Link,
  CircularProgress,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import DoctorApi from "../../apis/DoctorApi";
import * as image from "../../assets/index";
import { useNavigate } from "react-router-dom";
import baseURL from "../../utils";

const DoctorsListPage = () => {
  let navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearchInput] = useState('');
  const typingSearch = useRef(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  const callGetAllDoctors = async () => {
    setLoading(true);
    try {
      const data = await DoctorApi.getAll({
        page: 1,
        take: 100,
        status: true,
        name: search || undefined,
      });
      setDoctors(data.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    callGetAllDoctors();
  }, [search]);

  const handleToDetail = (doctor) => {
    navigate(`/ForDoctorsPage/${doctor.id}`);
  };

  const handleSearch = (value) => {
    if (typingSearch.current) {
      clearTimeout(typingSearch.current);
    }

    typingSearch.current = setTimeout(() => {
      setSearchInput(value);
    }, 500);
  };

  return (
    <Box bgcolor="#F5F5F5">
      <Box sx={{ px: 2, pt: 0.5, mt: 1 }}>
        <Input
          disableUnderline={true}
          sx={{
            outline: "none",
            border: "1px #888888 solid",
            borderRadius: 5,
            width: "100%",
            px: 2,
            bgcolor: "white",
          }}
          placeholder="Tìm kiếm bác sĩ"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </Box>
      <Box bgcolor="#FFFFFF" sx={{ mt: 1, width: "100%", minHeight: "100px" }}>
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            position: "relative",
            overflow: "auto",
            p: 0,
            maxHeight: "580px",
          }}
        >
          <Box sx={{ fontWeight: "600", fontSize: "15px", px: 2, pt: 1 }}>
            Bác sĩ nổi bật
          </Box>
          {loading && (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                position: "fixed",
              }}
            >
              <CircularProgress />
            </Box>
          )}
          {doctors.map((doctor) => (
            <ListItem
              key={doctor.id}
              sx={{
                pt: 2,
                pb: 1,
                display: "flex",
                borderBottom: "1.5px #F1F1F1 solid",
                "&:last-child": {
                  borderBottom: "none",
                },
              }}
              component="div"
            >
              <Link onClick={() => handleToDetail(doctor)}>
                {!doctor.avatar ? (
                  <img
                    src={image.DepthsDefault}
                    alt={doctor.lastName}
                    width={50}
                    height={50}
                    style={{ borderRadius: "50px" }}
                  />
                ) : (
                  <img
                    src={`${baseURL}${doctor.avatar}`}
                    alt={doctor.lastName}
                    width={50}
                    height={50}
                    style={{ borderRadius: "50px" }}
                  />
                )}
              </Link>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Link
                  onClick={() => handleToDetail(doctor)}
                  underline="none"
                  color="#333333"
                  sx={{
                    display: "flex",
                    mx: 1.5,
                    mt: -1,
                  }}
                >
                  <ListItemText>
                    {`${doctor?.firstName ? doctor?.firstName : ''} ${doctor?.middleName ? doctor?.middleName : ''} ${doctor?.lastName ? doctor?.lastName : ''}`.trim()}
                  </ListItemText>
                </Link>
                <Link
                  onClick={() => handleToDetail(doctor)}
                  underline="none"
                  color="#999999"
                  sx={{
                    display: "flex",
                    alignSelf: "flex-start",
                    mx: 1.5,
                    fontSize: "10px",
                    mt: -1,
                  }}
                >
                  <ListItemText sx={{ fontSize: 5 }}>
                    {doctor.specialty?.name}
                  </ListItemText>
                </Link>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default DoctorsListPage;

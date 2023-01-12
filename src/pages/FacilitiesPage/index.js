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
import ClinicApi from "../../apis/ClinicApi";
import * as image from "../../assets/index";
import baseURL from "../../utils";
import { useNavigate } from "react-router-dom";

const FacilitiesPage = () => {
  let navigate = useNavigate();
  const [clinics, setClinic] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearchInput] = useState('');
  const typingSearch = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const callGetAllClinics = async () => {
    setLoading(true);
    try {
      const data = await ClinicApi.getAllClinics({
        page: 1,
        take: 100,
        name: search || undefined,
        active: ['true'],
      });
      console.log("data", data);
      setClinic(data.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    callGetAllClinics();
  }, [search]);

  const handleToDetail = (clinic) => {
    navigate(`/ClinicDetailPage/${clinic.id}`);
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
          placeholder="Tìm kiếm bệnh viện, phòng khám"
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
          <Box sx={{ fontWeight: "600", fontSize: "15px", px: 2, pt: 1 }}>
            Bệnh viện, phòng khám nổi bật
          </Box>
          {clinics.map((clinic) => (
            <ListItem
              key={clinic.id}
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
              <Link onClick={() => handleToDetail(clinic)}>
                {!clinic.image ? (
                  <img
                    src={image.DepthsDefault}
                    alt={clinic.name}
                    width={100}
                    height={50}
                    style={{
                      cursor: 'pointer'
                    }}
                  />
                ) : (
                  <img
                    src={`${baseURL}${clinic.image}`}
                    alt={clinic.name}
                    width={100}
                    height={50}
                    style={{
                      cursor: 'pointer'
                    }}
                  />
                )}
              </Link>
              <Link
                onClick={() => handleToDetail(clinic)}
                underline="none"
                color="#333333"
                sx={{
                  display: "flex",
                  alignSelf: "flex-start",
                  mx: 1.5,
                }}
                style={{
                  cursor: 'pointer'
                }}
              >
                <ListItemText>{clinic.name}</ListItemText>
              </Link>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default FacilitiesPage;

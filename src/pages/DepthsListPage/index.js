import {
  Box,
  List,
  ListItem,
  ListItemText,
  Link,
  CircularProgress,
} from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import SpecialtyApi from "../../apis/SpecialtyApi";
import baseURL from "../../utils";

import * as image from "../../assets";

const DepthsListPage = () => {
  let navigate = useNavigate();
  const [specialties, setSpecialties] = useState();
  const [loading, setLoading] = useState(false);

  const getSpecialty = useCallback(async () => {
    setLoading(true);
    try {
      const response = await SpecialtyApi.getAll();
      console.log("response", response);
      setSpecialties(response.data.data);
    } catch (error) {
      console.error(error.response);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getSpecialty();
  }, [getSpecialty]);

  const handleToDetail = (depth) => {
    navigate(`/ForPatientsPage/${depth.id}`);
  };

  return (
    <Box bgcolor="#F5F5F5">
      <Box bgcolor="#FFFFFF" sx={{ mt: 1, width: "100%", minHeight: "100px" }}>
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            position: "relative",
            overflow: "auto",
            p: 0,
            maxHeight: "650px",
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
          {specialties?.map((depth) => (
            <ListItem
              key={depth.id}
              sx={{
                pt: 2,
                pb: 1,
                display: "flex",
                borderBottom: "1.5px #F1F1F1 solid",
                "&:first-child": {
                  pt: 0,
                },
                "&:last-child": {
                  borderBottom: "none",
                },
              }}
              component="div"
            >
              <Link onClick={() => handleToDetail(depth)}>
                {!depth.image ? (
                  <img
                    src={image.DepthsDefault}
                    alt={depth.name}
                    width={100}
                    height={50}
                  />
                ) : (
                  <img
                    src={`${baseURL}${depth.image}`}
                    alt={depth.name}
                    width={100}
                    height={50}
                  />
                )}
              </Link>
              <Link
                onClick={() => handleToDetail(depth)}
                params={{ data: depth.id }}
                underline="none"
                color="#333333"
                sx={{
                  display: "flex",
                  alignSelf: "flex-start",
                  mx: 1.5,
                }}
              >
                <ListItemText>{depth.name}</ListItemText>
              </Link>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default DepthsListPage;

import React, { useCallback, useEffect, useState } from "react";
import { Box, Link, List, ListItem, ListItemText, Modal } from "@mui/material";
import SpecialtyApi from "../../apis/SpecialtyApi";

function DepthsModal({ modal, setModal, id }) {
  const [depthsClinic, setDepthsClinic] = useState([]);
  console.log("depthsClinic", depthsClinic);

  const handleClose = () => {
    setModal(false);
  };

  useEffect(() => {
    const getSpecialtiesClinic = async () => {
      try {
        const response = await SpecialtyApi.getSpecialtiesClinic(id);
        setDepthsClinic(response.data.data);
      } catch (error) {
        console.error(error.response);
      } finally {
      }
    };

    getSpecialtiesClinic();
  }, [id]);

  return (
    <>
      <Modal sx={style} open={modal} onClose={handleClose}>
        <Box sx={{ bgcolor: "white" }}>
          <List>
            {depthsClinic &&
              depthsClinic.map((depth) => (
                <ListItem key={depth.id} component="div">
                  <Link
                    params={{ data: depth.id }}
                    underline="none"
                    color="#333333"
                    sx={{ cursor: "pointer" }}
                  >
                    <ListItemText>{depth.name}</ListItemText>
                  </Link>
                </ListItem>
              ))}
          </List>
        </Box>
      </Modal>
    </>
  );
}

const style = {
  boxShadow: 24,
  p: 4,
};

export default DepthsModal;

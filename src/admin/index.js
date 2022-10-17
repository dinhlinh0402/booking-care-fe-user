import React, { useState } from "react";
import { Button, Stack } from "@mui/material";
import Users from "./components/users";
import Doctor from "./components/Doctor";
import Clinic from "./components/Clinic";
import Specialty from "./components/Specialty";
import Schedules from "./components/Schedules";

function Admin() {
  const [table, setTable] = useState(<Users />);
  const [showedTable, setShowedTable] = useState("user");

  return (
    <Stack minHeight={600} p={5} bgcolor="#fbfbfb" direction="row" spacing={5}>
      <Stack
        p={3}
        spacing={2}
        sx={{
          flex: 1,
          bgcolor: "white",
          border: "3px solid #bcbfc3",
          borderRadius: 1,
        }}
      >
        <Button
          variant={showedTable === "user" ? "contained" : "outlined"}
          onClick={() => {
            setTable(<Users />);
            setShowedTable("user");
          }}
        >
          Users
        </Button>
        <Button
          variant={showedTable === "doctor" ? "contained" : "outlined"}
          onClick={() => {
            setTable(<Doctor />);
            setShowedTable("doctor");
          }}
        >
          Doctor
        </Button>
        <Button
          variant={showedTable === "clinic" ? "contained" : "outlined"}
          onClick={() => {
            setTable(<Clinic />);
            setShowedTable("clinic");
          }}
        >
          Clinic
        </Button>
        <Button
          variant={showedTable === "specialty" ? "contained" : "outlined"}
          onClick={() => {
            setTable(<Specialty />);
            setShowedTable("specialty");
          }}
        >
          Specialty
        </Button>
        <Button
          variant={showedTable === "schedules" ? "contained" : "outlined"}
          onClick={() => {
            setTable(<Schedules />);
            setShowedTable("schedules");
          }}
        >
          Schedules
        </Button>
      </Stack>
      <Stack
        sx={{
          flex: 5,
          bgcolor: "white",
          border: "3px solid #bcbfc3",
          borderRadius: 1,
        }}
      >
        {table}
      </Stack>
    </Stack>
  );
}

export default Admin;

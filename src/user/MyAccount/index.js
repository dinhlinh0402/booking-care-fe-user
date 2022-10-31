import { Avatar, Button, Grid, Link, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import './index.scss';
import { useForm } from 'react-hook-form';
import LoginApi from '../../apis/Login';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


const MyAccount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger, // validate real time
    reset, // reset form
  } = useForm();
  let navigate = useNavigate();


  return (
    <div>MyAccount</div>
  )
}

export default MyAccount;
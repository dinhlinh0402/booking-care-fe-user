import { Avatar, Button, Grid, Link, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './index.scss';
import { useForm } from 'react-hook-form';
import LoginApi from '../../apis/Login';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


const LoginUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger, // validate real time
    reset, // reset form
  } = useForm();
  let navigate = useNavigate();

  const paperStyle = { padding: 20, height: '400px', width: 280, margin: "100px auto" }
  const avatarStyle = { backgroundColor: '#1bbd7e' }
  const btnstyle = { margin: '8px 0', height: '50px' }

  const onSubmit = async (data) => {
    // reset()
    try {
      const dataRes = await LoginApi.loginUser(data);
      localStorage.setItem("accessToken", dataRes?.data?.token?.accessToken);
      localStorage.setItem("userName", dataRes?.data?.user?.lastName);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error('Đăng nhập không thành công');
    }
  }
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
          <h2>Đăng nhập</h2>
        </Grid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            style={{ marginBottom: '10px' }}
            label='Tài khoản'
            placeholder='Email'
            fullWidth
            required
            autoFocus
            {...register('email', {
              required: 'Email là bắt buộc',
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: 'Email không hợp lệ'
              }
            })}
            error={!!errors?.email}
            helperText={errors?.email ? errors.email.message : null}
            onKeyUp={() => {
              trigger('email')
            }}
          />
          <TextField
            label='Mật khẩu'
            placeholder='Mật khẩu'
            type='password'
            fullWidth
            required {...register('password', {
              required: 'Mật khẩu là bắt buộc',
            })}
          />
          <Button
            type='submit'
            color='primary'
            variant="contained"
            style={btnstyle}
            fullWidth>Đăng nhập</Button>
        </form>
        <Typography >
          <Link href="/reset-password" >
            Quên mật khẩu?
          </Link>
        </Typography>
        <Typography > Bạn chưa có tài khoản?
          <Link href="/register" >
            Đăng kí
          </Link>
        </Typography>
      </Paper>
    </Grid>
  )
}

export default LoginUser;
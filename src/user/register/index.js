import { Avatar, Button, Grid, Link, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import './index.scss';
import { useForm } from 'react-hook-form';
import RegisterApi from '../../apis/Register';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const RegisterUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger, // validate real time
    reset, // reset form
  } = useForm();
  let navigate = useNavigate();

  const paperStyle = { padding: 20, minHeight: '580px', width: 280, margin: "60px auto" }
  const avatarStyle = { backgroundColor: '#1bbd7e' }
  const btnstyle = { margin: '8px 0', height: '50px' }
  const marginInput = { marginBottom: '10px' }

  const onSubmit = async (data) => {
    try {
      if (data.password !== data.confirmPassword) {
        toast.error('Mật khẩu không trùng nhau');
      }
      const dataRes = await RegisterApi.addNewUser(data);
      if (dataRes && dataRes?.status === 200) {
        toast.success('Tạo tài khoản thành công');
        navigate('/login')
      }
    } catch (error) {
      console.log('error:', error);
      if (error?.response?.data?.error === 'USER_ALREADY_EXIST') {
        toast.error('Tài khoản đã tồn tại');
        return;
      }
      toast.error('Đăng ký không thành công');
    }
  }
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
          <h2>Đăng ký tài khoản</h2>
        </Grid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            style={marginInput}
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
            style={marginInput}
            label='Họ'
            placeholder='Họ'
            fullWidth
            {...register('firstName')}
          />
          <TextField
            style={marginInput}
            label='Tên đệm'
            placeholder='Tên đệm'
            fullWidth
            {...register('middleName')}
          />
          <TextField
            style={marginInput}
            label='Tên'
            placeholder='Tên'
            fullWidth
            {...register('lastName')}
          />
          <TextField
            style={marginInput}
            label='Mật khẩu'
            placeholder='Mật khẩu'
            type='password'
            fullWidth
            required
            {...register('password', {
              required: 'Mật khẩu là bắt buộc',
              minLength: {
                value: 6,
                message: 'Mật khẩu tối thiểu 6 ký tự'
              },
            })}
            error={!!errors?.password}
            helperText={errors?.password ? errors.password.message : null}
          />
          <TextField
            label='Mật khẩu'
            placeholder='Mật khẩu'
            type='password'
            fullWidth
            required
            {...register('confirmPassword', {
              required: 'Mật khẩu là bắt buộc',
              minLength: {
                value: 6,
                message: 'Mật khẩu tối thiểu 6 ký tự'
              },
            })}
            error={!!errors?.confirmPassword}
            helperText={errors?.confirmPassword ? errors.confirmPassword.message : null}
          />
          <Button
            type='submit'
            color='primary'
            variant="contained"
            style={btnstyle}
            fullWidth>Đăng ký</Button>
        </form>
        <Typography > Bạn đã có tài khoản?
          <Link href="/login" >
            Đăng nhập
          </Link>
        </Typography>
      </Paper>
    </Grid>
  )
}

export default RegisterUser;
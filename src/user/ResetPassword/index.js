import { Avatar, Button, Grid, Link, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useForm } from 'react-hook-form';
import resetPasswordApi from '../../apis/ResetPassword';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger, // validate real time
    reset, // reset form
  } = useForm();
  let navigate = useNavigate();

  const paperStyle = { padding: 20, minHeight: '250px', width: 280, margin: "100px auto" }
  const avatarStyle = { backgroundColor: '#1bbd7e' }
  const btnstyle = { margin: '8px 0', height: '50px' }

  const onSubmit = async (data) => {
    // reset()
    try {
      const dataRes = await resetPasswordApi.resetPassword(data);
      console.log("data: ", dataRes)
      if (dataRes && dataRes.status === 200) {
        toast.success('Mật khẩu mới đã được gửi đến địa chỉ email của bạn');
        navigate('/')
      }
    } catch (error) {
      console.log(error);
      toast.error('Lấy lại mật khẩu không thành công');
    }
  }
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
          <h2>Quên mật khẩu</h2>
        </Grid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            style={{ marginBottom: '10px' }}
            label='Email'
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
          <Button
            type='submit'
            color='primary'
            variant="contained"
            style={btnstyle}
            fullWidth>Xác nhận</Button>
        </form>
      </Paper>
    </Grid>
  )
}

export default ResetPassword;
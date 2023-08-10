import React, { useEffect, useState } from 'react';

import { Button, Col, Form, Image, Input, Layout, Row } from 'antd';
import '../../assets/css/login.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { loginWithEmailAndPassword } from '../../redux/slice/login/loginSlice';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { fetchLogos } from '../../redux/slice/logo/logoSlice';
import logo from '../../assets/images/Logo alta.png';
import coverPhoto from '../../assets/images/backgrourd.png';
const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
type FieldType = {
  username?: string;
  password?: string;
};
const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    dispatch(fetchLogos());
  }, [dispatch]);
  //kiểm tra và hiện thông báo
  const [showNotification, setShowNotification] = useState(false);
  useEffect(() => {
    const handleGlobalClick = () => {
      if (showNotification) {
        setShowNotification(false);
      }
    };

    document.addEventListener('click', handleGlobalClick);

    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [showNotification]);
  const handleLogin = async () => {
    const success = await dispatch(loginWithEmailAndPassword(username, password));
    if (success) {
      navigate('/home/profile');
    } else {
      setShowNotification(!showNotification);
    }
  };

  return (
    <Layout hasSider style={{ height: '100vh', width: '100%' }}>
      <Row>
        <Col className='login-slider'>
          <Image className='login-slider-img' src={logo} />
          <Form className='login-slider-form' layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Form.Item<FieldType> className='login-slider-form-item' label='Username' name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Item>

            <Form.Item<FieldType> className='login-slider-form-item' label='Password' name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
              <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
              {showNotification && <p className='forgot-password-link'>Sai Mật Khẩu Hoặc Tên Đăng Nhập!</p>}
            </Form.Item>
            <Form.Item className='login-slider-form-item'>
              <NavLink to='/forgot_password' className='forgot-password-link'>
                Quên mật khẩu?
              </NavLink>
            </Form.Item>
            <Form.Item>
              <Button
                className='login-slider-form-submit'
                type='primary'
                htmlType='submit'
                onClick={() => {
                  handleLogin();
                }}>
                Đăng Nhập
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col className='login-content'>
          <div className='login-content-content'>
            <img className='login-content-image' src={coverPhoto} alt='' />
          </div>
        </Col>
      </Row>
    </Layout>
  );
};
export default Login;

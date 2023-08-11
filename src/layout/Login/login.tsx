import React, { useEffect, useState } from 'react';
import '../../assets/css/forgot_password.css';
import { Button, Col, Form, Image, Input, Layout, Row } from 'antd';
import '../../assets/css/login.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { loginWithEmailAndPassword } from '../../redux/slice/login/loginSlice';
import { AppDispatch } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { fetchLogoData, selectLogo } from '../../redux/slice/logo/logoSlice';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Kiểm tra và hiện thông báo
  const [showNotification, setShowNotification] = useState(false);
  const [showNotification2, setShowNotification2] = useState(false);
  const [showNotification3, setShowNotification3] = useState(false);
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  useEffect(() => {
    const handleGlobalClick = () => {
      if (showNotification || showNotification2) {
        setShowNotification(false);
        setShowNotification2(false);
        setShowNotification3(false);
      }
    };
    document.addEventListener('click', handleGlobalClick);
    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [showNotification, showNotification2, showNotification3]);
  // Login
  const handleLogin = async () => {
    if (!username || !password) {
      setShowNotification2(true);
      return;
    }
    const success = await dispatch(loginWithEmailAndPassword(username, password));
    if (success !== '') {
      setShowNotification3(true);
      localStorage.setItem('username', success);
      setTimeout(() => {
        navigate('/home/profile');
      }, 600);
    } else {
      setShowNotification(true);
    }
  };
  const logo = useSelector(selectLogo);
  useEffect(() => {
    dispatch(fetchLogoData());
  }, [dispatch]);
  type FieldType = {
    username: string;
    password: string;
  };

  return (
    <Layout hasSider style={{ height: '100vh', width: '100%' }}>
      <Row>
        <Col className='login-slider'>
          <div className='login-slider-empty-div'>
            <Image className='login-slider-img' src={logo.logo} />
          </div>
          <Form className='login-slider-form' layout='vertical' onFinish={onFinish}>
            <Form.Item<FieldType> className='login-slider-form-item' label='Username' name='username' rules={[{ required: true, message: '' }]}>
              <Input value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Item>

            <Form.Item className='login-slider-form-item' label='Password' name='password' rules={[{ required: true, message: '' }]}>
              <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
              {showNotification3 && (
                <p className='forgot-password-link'>
                  <ExclamationCircleOutlined />
                  Đăng nhập thành công!
                </p>
              )}
              {showNotification && (
                <p className='forgot-password-link'>
                  <ExclamationCircleOutlined />
                  Sai Mật Khẩu Hoặc Tên Đăng Nhập!
                </p>
              )}
              {showNotification2 && (
                <p className='forgot-password-link'>
                  <ExclamationCircleOutlined />
                  Vui Lòng Điền Đầy Đủ Thông Tin!
                </p>
              )}
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
          <Image style={{ width: '100%', margin: '10% 0 0 10%' }} src={logo.coverPhoto} alt='' />
        </Col>
      </Row>
    </Layout>
  );
};

export default Login;

import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Image, Input, Layout, Row } from 'antd';
import '../../../assets/css/login.css';

import { AppDispatch } from '../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { checkEmail } from '../../../redux/slice/login/loginSlice';
import { useNavigate } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { fetchLogoData, selectLogo } from '../../../redux/slice/logo/logoSlice';
const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [email, setEmail] = useState('');

  // Kiểm tra và hiện thông báo
  const [showNotification, setShowNotification] = useState(false);
  const [showNotification2, setShowNotification2] = useState(false);
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  useEffect(() => {
    const handleGlobalClick = () => {
      if (showNotification || showNotification2) {
        setShowNotification(false);
        setShowNotification2(false);
      }
    };
    document.addEventListener('click', handleGlobalClick);
    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [showNotification, showNotification2]);

  const handleResetPassword = async () => {
    if (!email) {
      setShowNotification2(true);
      return;
    }
    const success = await dispatch(checkEmail(email));
    if (success !== '') {
      localStorage.setItem('email', success);
      navigate('/reset_password');
    } else {
      setShowNotification(true);
    }
  };
  const logo = useSelector(selectLogo);
  useEffect(() => {
    dispatch(fetchLogoData());
  }, [dispatch]);
  type FieldType = {
    email: string;
  };
  return (
    <Layout hasSider style={{ height: '100vh', width: '100%' }}>
      <Row>
        <Col className='login-slider'>
          <div className='login-slider-empty-div'>
            <Image className='login-slider-img' src={logo.logo} />
          </div>
          <Form className='login-slider-form' layout='vertical' onFinish={onFinish}>
            <h2 className='login-slider-title'>Đặt Lại Mật Khẩu</h2>
            <Form.Item<FieldType> className='login-slider-form-item' label='Vui lòng nhập email để đặt lại mật khẩu của bạn' name='email' rules={[{ required: true, message: '' }]}>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
              {showNotification && (
                <p className='forgot-password-link'>
                  <ExclamationCircleOutlined />
                  Email không có trong hệ thống!
                </p>
              )}
              {showNotification2 && (
                <p className='forgot-password-link'>
                  <ExclamationCircleOutlined />
                  Vui Lòng Điền Đầy Đủ Thông Tin!
                </p>
              )}
            </Form.Item>
            <br />
            <Form.Item>
              <Button style={{ backgroundColor: 'var(--bg, #f6f6f6)' }} className='login-slider-form-submit'>
                Hủy
              </Button>
              <Button
                className='login-slider-form-submit'
                type='primary'
                htmlType='submit'
                style={{ background: 'var(--orange-orange-400, #ff9138)' }}
                onClick={handleResetPassword}>
                Tiếp tục
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col className='login-content'>
          <Image style={{ width: '100%', margin: '10% ' }} src={logo.coverPhoto2} alt='' />
        </Col>
      </Row>
    </Layout>
  );
};

export default ForgotPassword;

import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Image, Input, Layout, Row } from 'antd';
import '../../../assets/css/login.css';
import { NavLink, useNavigate } from 'react-router-dom';

import { AppDispatch } from '../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { updatePasswordByEmail } from '../../../redux/slice/login/loginSlice';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { fetchLogoData, selectLogo } from '../../../redux/slice/logo/logoSlice';

type FieldType = {
  password?: string;
  re_password?: string;
};
const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');

  // Kiểm tra và hiện thông báo
  const [showNotification1, setShowNotification1] = useState(false);
  const [showNotification2, setShowNotification2] = useState(false);
  const [showNotification3, setShowNotification3] = useState(false);
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  useEffect(() => {
    const handleGlobalClick = () => {
      if (showNotification1 || showNotification2 || showNotification3) {
        setShowNotification1(false);
        setShowNotification2(false);
        setShowNotification3(false);
      }
    };
    document.addEventListener('click', handleGlobalClick);
    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [showNotification1, showNotification2, showNotification3]);

  //Đổi mật khẩu
  const handlePasswordChange = async (values: any) => {
    if (newPassword === '' || newPassword2 === '') {
      setShowNotification1(true);
    } else if (newPassword !== newPassword2) {
      setShowNotification2(true);
    } else if (newPassword === newPassword2) {
      setShowNotification3(true);
      await dispatch(updatePasswordByEmail(newPassword2));
      navigate(`/`);
    } else {
    }
  };
  //lấy ảnh
  const logo = useSelector(selectLogo);
  useEffect(() => {
    dispatch(fetchLogoData());
  }, [dispatch]);
  return (
    <Layout hasSider style={{ height: '100vh', width: '100%' }}>
      <Row>
        <Col className='login-slider'>
          <div className='login-slider-empty-div'>
            <Image className='login-slider-img' src={logo.logo} />
          </div>

          <Form className='login-slider-form' layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Form.Item<FieldType> className='login-slider-form-item' label='Mật khẩu' name='password' rules={[{ required: true, message: ' ' }]}>
              <Input.Password value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </Form.Item>

            <Form.Item<FieldType> className='login-slider-form-item' label='Nhập lại mật khẩu' name='re_password' rules={[{ required: true, message: ' ' }]}>
              <Input.Password value={newPassword2} onChange={(e) => setNewPassword2(e.target.value)} />
              {showNotification1 && (
                <p className='forgot-password-link'>
                  <ExclamationCircleOutlined />
                  Vui Lòng Điền Đầy Đủ Thông Tin!
                </p>
              )}
              {showNotification2 && (
                <p className='forgot-password-link'>
                  <ExclamationCircleOutlined />
                  Mật Khẩu Không Khớp Vui Lòng Nhập lại!
                </p>
              )}
              {showNotification3 && (
                <p className='forgot-password-link'>
                  <ExclamationCircleOutlined />
                  Đặt lại mật khẩu thành công đang chuyển tới trang đăng nhập!
                </p>
              )}
            </Form.Item>
            <Form.Item className='login-slider-form-item'>
              <p className='forgot-password-link'></p>
              <NavLink to='/#' className='forgot-password-link'>
                Quên mật khẩu?
              </NavLink>
            </Form.Item>
            <Form.Item>
              <Button className='login-slider-form-submit' type='primary' htmlType='submit' onClick={handlePasswordChange}>
                Xác Nhận
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

export default ResetPassword;

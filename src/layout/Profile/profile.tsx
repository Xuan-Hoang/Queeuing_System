// src/components/Profile.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchUserDataByUser } from '../../redux/slice/login/loginSlice';
import { Content } from 'antd/es/layout/layout';
import { Col, Form, Image, Input, Row } from 'antd';
import '../../assets/css/profile.css';
const Profile = () => {
  const username = localStorage.getItem('username');
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (username) {
      dispatch(fetchUserDataByUser(username));
    }
  }, [dispatch, username]);

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }
  return (
    <Content className='profile'>
      <Row justify='start' align='middle'>
        <Col span={6}>
          <div className='profile-circle-container'>
            <Image className='profile-circle-image' src={user.avata} alt='Image' />
          </div>
          <h1 style={{ textAlign: 'start' }}>{user.fullName}</h1>
        </Col>
        <Col span={8} offset={1}>
          <Form layout='vertical'>
            <Form.Item label='Tên Người Dùng'>
              <Input className='profile-form-input' value={user.fullName} readOnly />
            </Form.Item>
            <Form.Item label='Số Điện Thoại'>
              <Input className='profile-form-input' value={user.phoneNumber} readOnly />
            </Form.Item>
            <Form.Item label='Email'>
              <Input className='profile-form-input' value={user.email} readOnly />
            </Form.Item>
          </Form>
        </Col>
        <Col span={8} offset={1}>
          <Form layout='vertical'>
            <Form.Item label='Tên Đăng Nhập'>
              <Input className='profile-form-input' value={user.username} readOnly></Input>
            </Form.Item>
            <Form.Item label='Mật Khẩu'>
              <Input className='profile-form-input' value={user.password} readOnly></Input>
            </Form.Item>
            <Form.Item label='Vai trò'>
              <Input className='profile-form-input' value={user.role} readOnly></Input>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Content>
  );
};

export default Profile;

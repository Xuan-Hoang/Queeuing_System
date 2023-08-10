// src/components/Profile.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { setUser } from '../../redux/slice/login/loginSlice';
import { Content } from 'antd/es/layout/layout';
import { Col, Form, Image, Input, Row } from 'antd';

const Profile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    // Lấy thông tin người dùng từ Local Storage khi component được render
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      dispatch(setUser(userData));
    }
  }, [dispatch]);

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }
  return (
    <Content>
      <Row>
        <Col span={4}>
          <Image className='profile-images' src={user.avata} alt={user.fullName} />
          <h1>{user.fullName}</h1>
        </Col>

        <Col span={10}>
          <Form className='login-slider-form' layout='vertical'>
            <Form.Item label='Tên Người Dùng'>
              <Input value={user.fullName} readOnly />
            </Form.Item>
            <Form.Item label='Số Điện Thoại'>
              <Input value={user.phoneNumber} readOnly />
            </Form.Item>
            <Form.Item label='Email'>
              <Input value={user.email} readOnly />
            </Form.Item>
          </Form>
        </Col>
        <Col span={10}>
          <Form className='login-slider-form' layout='vertical'>
            <Form.Item label='Tên Người Dùng'>
              <Input value={user.username} readOnly></Input>
            </Form.Item>
            <Form.Item label='Số Điện Thoại'>
              <Input value={user.password} readOnly></Input>
            </Form.Item>
            <Form.Item label='Vai trò'>
              <Input value={user.role} readOnly></Input>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Content>
  );
};

export default Profile;

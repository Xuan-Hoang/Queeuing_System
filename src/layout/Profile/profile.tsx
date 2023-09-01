/* eslint-disable jsx-a11y/img-redundant-alt */
// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchUserDataByUser } from '../../redux/slice/login/loginSlice';
import { Content } from 'antd/es/layout/layout';
import { Col, Form, Image, Input, Row } from 'antd';
import '../../assets/css/profile.css';
import { CameraOutlined, CameraTwoTone } from '@ant-design/icons';
import { updateAvatar, uploadImageToStorage } from '../../redux/slice/Setting/accountSlice';
import { storage } from '../../config/firebaseConfig';

const Profile = () => {
  const username = localStorage.getItem('username');
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (username) {
      dispatch(fetchUserDataByUser(username));
    }
  }, [dispatch, username]);

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0 && username) {
      const file = e.target.files[0];
      try {
        const storageRef = storage.ref();
        const imageRef = storageRef.child(`avatars/${file.name}`);
        const imageUrl = await imageRef.getDownloadURL();
        await dispatch(updateAvatar(user.id, imageUrl));
        dispatch(fetchUserDataByUser(username));
        setSelectedFile(null);
      } catch (error) {
        try {
          const uploadedImageUrl = await uploadImageToStorage(file);
          await dispatch(updateAvatar(user.id, uploadedImageUrl));
          dispatch(fetchUserDataByUser(username));
          setSelectedFile(null);
        } catch (error) {
          console.error('Error updating avatar:', error);
        }
      }
    }
  };

  return (
    <Content style={{ paddingTop: '5%' }}>
      <div className='profile'>
        <Row justify='start' align='middle'>
          <Col span={6}>
            <div className='avatar-frame'>
              <img className='avatar-image' src={user.avatar} alt='' />
            </div>
            <div className='iconUploadDiv'>
              <label className='iconUploadLabel' htmlFor='fileInput'>
                <CameraTwoTone className='iconUpload' />
              </label>
              <input type='file' accept='image/*' id='fileInput' onChange={handleFileUpload} style={{ display: 'none' }} />
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
      </div>
    </Content>
  );
};

export default Profile;

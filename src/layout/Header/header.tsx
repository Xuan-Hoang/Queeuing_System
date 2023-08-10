import React, { useEffect } from 'react';
import { Header } from 'antd/es/layout/layout';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { setUser } from '../../redux/slice/login/loginSlice';
import { Col, Image, Row } from 'antd';
import bell from '../../assets/icon/bell.svg';
import '../../assets/css/header.css';
import { NavLink } from 'react-router-dom';
const HeaderPage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      dispatch(setUser(userData));
    }
  }, [dispatch]);

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }
  const currentPath = window.location.pathname;
  let pContent = '';
  if (currentPath === '/home/profile') {
    pContent = 'Thông Tin Cá Nhân';
  } else if (currentPath === '/home/dashboard') {
    pContent = 'Dashboard';
  } else if (currentPath === '/home/device') {
    pContent = 'Thiết Bị';
  } else if (currentPath === '/home/service') {
    pContent = 'Dịch vụ';
  } else if (currentPath === '/home/number_level') {
    pContent = 'Cấp Số';
  } else if (currentPath === '/home/report') {
    pContent = 'Báo cáo';
  } else if (currentPath === '/home/setting') {
    pContent = 'Cài đặt hệ thống';
  }
  return (
    <Header className='header' style={{ backgroundColor: 'white' }}>
      <Row justify='center' align='middle'>
        <Col span={18}>
          <p className='header-title'>{pContent}</p>
        </Col>
        <Col span={1}>
          <Image className='header-icon' src={bell} />
        </Col>
        <Col span={5}>
          <div className='header-info'>
            <div className='header-circle-container'>
              <Image className='header-circle-image' src={user.avata} alt='Image' />
            </div>
            <div className='heder-info-text'>
              <p className='heder-info-text1'>Xin Chao</p>
              <p className='heder-info-text2'>
                <NavLink className='heder-info-text2' to='/home/profile'>
                  {user.fullName}
                </NavLink>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderPage;

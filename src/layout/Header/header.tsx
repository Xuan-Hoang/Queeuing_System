import React, { useEffect } from 'react';
import { Header } from 'antd/es/layout/layout';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchUserDataByUser } from '../../redux/slice/login/loginSlice';
import { Col, Image, Row } from 'antd';
import bell from '../../assets/icon/bell.svg';
import '../../assets/css/header.css';
import { NavLink } from 'react-router-dom';

const HeaderPage = () => {
  const pathToContent: { [key: string]: string } = {
    '/profile': 'Thông Tin Cá Nhân',
    '/dashboard': 'Dashboard',
    '/device': 'Thiết Bị > Danh Sách Thiết Bị',
    '/device/detail': 'Thiết Bị > Danh Sách Thiết Bị > Chi tiết thiết bị',
    '/service': 'Dịch vụ',
    '/number_level': 'Cấp Số',
    '/report': 'Báo cáo',
    '/setting': 'Cài đặt hệ thống',
  };

  const currentPath = window.location.pathname;
  const pContent = pathToContent[currentPath] || '';
  const username = localStorage.getItem('username');
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (username && !user) {
      dispatch(fetchUserDataByUser(username));
    }
  }, [dispatch, username, user]);

  if (!user) {
    return (
      <Header className='header' style={{ backgroundColor: 'white' }}>
        <Row justify='center' align='middle'>
          <Col span={18}>
            <p className='header-title'>{pContent}</p>
          </Col>
          <Col span={1}>
            <Image className='header-icon' src={bell} />
          </Col>
          <div className='heder-info-text'>
            <p></p>
          </div>
        </Row>
      </Header>
    );
  }

  return (
    <Header className='header' style={{ backgroundColor: 'white' }}>
      <Row justify='start' align='middle'>
        <Col span={19}>
          <p className='header-title'>{pContent}</p>
        </Col>
        <Col span={1}>
          <Image className='header-icon' src={bell} />
        </Col>
        <Col span={4}>
          <div className='header-info'>
            <div className='header-circle-container'>
              <Image className='header-circle-image' src={user.avata} alt='Image' />
            </div>
            <div className='heder-info-text'>
              <p className='heder-info-text1'>Xin Chao</p>
              <p className='heder-info-text2'>
                <NavLink className='heder-info-text2' to='/profile'>
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

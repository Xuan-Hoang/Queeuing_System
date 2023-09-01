/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react';
import { Header } from 'antd/es/layout/layout';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchUserDataByUser } from '../../redux/slice/login/loginSlice';
import { Col, Image, Row } from 'antd';
import bell from '../../assets/icon/bell.svg';
import '../../assets/css/header.css';
import { NavLink } from 'react-router-dom';

import { Tooltip } from 'antd';

import { fetchHistorys } from '../../redux/slice/Setting/historySlice';
import { format } from 'date-fns';

const HeaderPage = () => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const pathToContent: { [key: string]: React.ReactNode } = {
    '/profile': 'Thông Tin Cá Nhân',
    '/dashboard': 'Dashboard',
    '/device': (
      <>
        <span style={{ color: ' var(--gray-blue-gray-4-place-holder, #7E7D88)' }}>Thiết bị {'> '}</span> Danh Sách Thiết Bị
      </>
    ),
    '/device/detail': (
      <>
        <span style={{ color: ' var(--gray-blue-gray-4-place-holder, #7E7D88)' }}>
          Thiết Bị {'>'} Danh Sách Thiết Bị {'> '}
        </span>
        Chi tiết thiết bị
      </>
    ),
    '/device/add': (
      <>
        <span style={{ color: ' var(--gray-blue-gray-4-place-holder, #7E7D88)' }}>
          Thiết Bị {'>'} Danh Sách Thiết Bị {'> '}
        </span>
        Thêm thiết bị
      </>
    ),
    '/device/update': (
      <>
        <span style={{ color: ' var(--gray-blue-gray-4-place-holder, #7E7D88)' }}>
          Thiết Bị {'> '} Danh Sách Thiết Bị {'>'}
        </span>
        Cập nhật thiết bị
      </>
    ),
    '/service': (
      <>
        <span style={{ color: ' var(--gray-blue-gray-4-place-holder, #7E7D88)' }}>Dịch vụ {'> '}</span>
        Danh Sách dịch vụ
      </>
    ),
    '/service/add': (
      <>
        <span style={{ color: ' var(--gray-blue-gray-4-place-holder, #7E7D88)' }}>
          Dịch vụ {'> '} Danh Sách dịch vụ {'> '}
        </span>
        Thêm dịch vụ
      </>
    ),
    '/service/detail': (
      <>
        <span style={{ color: ' var(--gray-blue-gray-4-place-holder, #7E7D88)' }}>
          Dịch vụ {'> '} Danh Sách dịch vụ {'> '}
        </span>
        Chi tiết
      </>
    ),
    '/service/update': (
      <>
        <span style={{ color: ' var(--gray-blue-gray-4-place-holder, #7E7D88)' }}>
          Dịch vụ {'> '} Danh Sách dịch vụ {'> '}
        </span>
        Cập nhật
      </>
    ),
    '/number_level': (
      <>
        <span style={{ color: ' var(--gray-blue-gray-4-place-holder, #7E7D88)' }}>Cấp số {'> '}</span>
        Danh Sách Cấp Số
      </>
    ),
    '/number_level/detail': (
      <>
        <span style={{ color: ' var(--gray-blue-gray-4-place-holder, #7E7D88)' }}>
          Cấp số {'> '}Danh Sách Cấp Số{'> '}
        </span>
        Chi Tiết
      </>
    ),
    '/number_level/add': (
      <>
        <span style={{ color: ' var(--gray-blue-gray-4-place-holder, #7E7D88)' }}>
          Cấp số {'> '}Danh Sách Cấp Số{'> '}
        </span>
        Cấp số mới
      </>
    ),
    '/report': (
      <>
        <span style={{ color: ' var(--gray-blue-gray-4-place-holder, #7E7D88)' }}>
          Báo cáo {'> '}Lập báo cáo{'> '}
        </span>
        Cấp số mới
      </>
    ),
    '/role': (
      <>
        <span style={{ color: ' var(--gray-blue-gray-4-place-holder, #7E7D88)' }}>Cài đặt hệ thống {'> '}</span>
        Quản lý vai trò
      </>
    ),
    '/account': (
      <>
        <span style={{ color: ' var(--gray-blue-gray-4-place-holder, #7E7D88)' }}>Cài đặt hệ thống {'> '}</span>
        Quản lý tài khoảng
      </>
    ),
  };

  const currentPath = window.location.pathname;
  const pContent = pathToContent[currentPath] || '';
  const username = localStorage.getItem('username');
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const historys = useSelector((state: RootState) => state.historys);
  useEffect(() => {
    dispatch(fetchHistorys());
  }, [dispatch]);

  useEffect(() => {
    if (username && !user) {
      dispatch(fetchUserDataByUser(username));
    }
  }, [dispatch, username, user]);

  if (!user) {
    return (
      <Header className='header'>
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

  const toggleTooltip = () => {
    setIsTooltipVisible(!isTooltipVisible);
  };

  const customTooltipContent = (
    <div>
      <div style={{ backgroundColor: '#FF7506', padding: '1% 5% 1% 5%', borderRadius: '5px 5px 0 0' }}>
        <p>Thông báo</p>
      </div>
      <div style={{ backgroundColor: '#ffff', padding: '1% 5% 1% 5%', color: 'black', borderRadius: '0 0 5px 5px' }}>
        {historys
          .filter((item) => item.action === 'Người dùng đăng nhập')
          .slice(0, 5)
          .map((item, index) => (
            <div key={index}>
              <p>Người dùng: {item.userLogin}</p>
              <p>Thời gian nhận số: {formatTimestamp(item.date)}</p>
            </div>
          ))}
      </div>
    </div>
  );

  function formatTimestamp(timestamp: any): string {
    const date = new Date(timestamp.seconds * 1000);
    return format(date, 'HH:mm dd/mm/yyyy');
  }
  return (
    <Header className='header' style={{ backgroundColor: 'white' }}>
      <Row justify='start' align='middle' style={{ backgroundColor: 'white' }}>
        <Col span={19}>
          <p className='header-title'>{pContent}</p>
        </Col>
        <Tooltip title={customTooltipContent} visible={isTooltipVisible} placement='bottom'>
          <Col span={1} onClick={toggleTooltip}>
            <img className='header-icon' src={bell} alt='' />
          </Col>
        </Tooltip>
        <Col span={4}>
          <div className='header-info'>
            <div className='header-circle-container'>
              <img className='header-circle-image' src={user.avatar} alt='' />
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

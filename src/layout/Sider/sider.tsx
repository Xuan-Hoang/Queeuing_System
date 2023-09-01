import { Button, Layout, Menu } from 'antd';
import '../../assets/css/sider.css';
import React, { useEffect } from 'react';
import dashboard from '../../assets/icon/dashboard.svg';
import device from '../../assets/icon/device.svg';
import service from '../../assets/icon/service.svg';
import number_level from '../../assets/icon/number_level.svg';
import report from '../../assets/icon/report.svg';
import setting from '../../assets/icon/setting.svg';
import logout from '../../assets/icon/logout.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import SubMenu from 'antd/es/menu/SubMenu';
import { fetchLogoData, selectLogo } from '../../redux/slice/logo/logoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
const { Sider } = Layout;
const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#ffff',
};
const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
};
const SiderPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let defaultSelectedKey = '0';
  if (location.pathname.startsWith('/dashboard')) {
    defaultSelectedKey = '0';
  } else if (location.pathname.startsWith('/device' || '/device/detail' || '/device/update' || '/device/add')) {
    defaultSelectedKey = '1';
  } else if (location.pathname.startsWith('/service' || '/service/detail' || '/service/update' || '/service/add')) {
    defaultSelectedKey = '2';
  } else if (location.pathname.startsWith('/number_level')) {
    defaultSelectedKey = '3';
  } else if (location.pathname.startsWith('/report')) {
    defaultSelectedKey = '4';
  } else if (location.pathname.startsWith('/setting')) {
    defaultSelectedKey = '5';
  }
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLogoData());
  }, [dispatch]);
  const logo = useSelector(selectLogo);
  return (
    <Sider style={siderStyle}>
      <div style={containerStyle}>
        <img className='sider-logo' src={logo.logo} alt='' />
        <Menu className='sider-menu' defaultSelectedKeys={[defaultSelectedKey]}>
          <Menu.Item key='0' icon={<img src={dashboard} alt='' />}>
            <Link to='/dashboard'>Dashboard</Link>
          </Menu.Item>
          <Menu.Item key='1' icon={<img src={device} alt='' />}>
            <Link to='/device'>Thiết Bị</Link>
          </Menu.Item>
          <Menu.Item key='2' icon={<img src={service} alt='' />}>
            <Link to='/service'>Dịch vụ</Link>
          </Menu.Item>
          <Menu.Item key='3' icon={<img src={number_level} alt='' />}>
            <Link to='/number_level'>Cấp Số</Link>
          </Menu.Item>
          <Menu.Item key='4' icon={<img src={report} alt='' />}>
            <Link to='/report'>Báo Cáo</Link>
          </Menu.Item>
          <SubMenu key='5' icon={<img src={setting} alt='' />} title='Cài đặt hệ thống'>
            <Menu.Item
              key='5.1'
              onClick={() => {
                navigate('/role');
              }}>
              Quản lý vai trò
            </Menu.Item>
            <Menu.Item
              key='5.2'
              onClick={() => {
                navigate('/account');
              }}>
              Quản lý tài khoản
            </Menu.Item>
            <Menu.Item
              key='5.3'
              onClick={() => {
                navigate('/history');
              }}>
              Nhật ký người dùng
            </Menu.Item>
          </SubMenu>
        </Menu>
        <div style={{ flex: 0.9 }}></div>
        <Button className='sider-button' onClick={() => navigate(`/login`)}>
          <img className='sider-button-image' src={logout} alt='' />
          <span style={{ fontSize: '18px' }}>Đăng Xuất</span>
        </Button>
      </div>
    </Sider>
  );
};

export default SiderPage;

import React from 'react';
import { Layout } from 'antd';
import { useLocation } from 'react-router-dom';

import Profile from '../Profile/profile';
import SiderPage from '../Sider/sider';
import HeaderPage from '../Header/header';
import DeviceTable from '../Device/device';
import DetailDevice from '../Device/components/detailDevice';

const { Content } = Layout;

const HomePage: React.FC = () => {
  const location = useLocation();
  const contentName = location.pathname.split('/').pop() || '';

  return (
    <Layout hasSider style={{ height: '100vh', width: '100%' }}>
      <SiderPage />
      <Layout>
        <HeaderPage />
        <Content style={{ padding: '3%', paddingTop: '0' }}>
          {contentName === 'profile' && <Profile />}
          {contentName === 'device' && <DeviceTable />}
          {contentName === 'device/detail' && <DetailDevice />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomePage;
//tạm thời bỏ

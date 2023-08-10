import React from 'react';
import { Layout } from 'antd';
import { useLocation } from 'react-router-dom';

import Profile from '../Profile/profile';
import SiderPage from '../Sider/sider';
import HeaderPage from '../Header/header';

const { Content } = Layout;

const HomePage: React.FC = () => {
  const location = useLocation();
  const contentName = location.pathname.split('/').pop() || '';

  return (
    <Layout hasSider style={{ height: '100vh', width: '100%' }}>
      <SiderPage />
      <Layout>
        <HeaderPage />
        <Content>{contentName === 'profile' && <Profile />}</Content>
      </Layout>
    </Layout>
  );
};

export default HomePage;

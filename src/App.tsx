import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Login from './layout/Login/login';
import ForgotPassword from './layout/Login/forgotPassword/forgot_password';
import ResetPassword from './layout/Login/resetPassword/reset_password';
import { Layout } from 'antd';
import SiderPage from './layout/Sider/sider';
import HeaderPage from './layout/Header/header';
import { Content } from 'antd/es/layout/layout';
import Profile from './layout/Profile/profile';
import DeviceTable from './layout/Device/device';
import DetailDevice from './layout/Device/components/detailDevice';
import AddDevice from './layout/Device/components/addDevice';
import UpdateDevice from './layout/Device/components/updateDevice';
import ServicePage from './layout/Service/service';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot_password' element={<ForgotPassword />} />
          <Route path='/reset_password' element={<ResetPassword />} />
          <Route
            path='/*'
            element={
              <LayoutRoute>
                {/* Nest your routes within a <Routes> component */}
                <Routes>
                  <Route path='/profile' element={<Profile />} />
                  <Route path='/device' element={<DeviceTable />} />
                  <Route path='/device/detail' element={<DetailDevice />} />
                  <Route path='/device/add-device' element={<AddDevice />} />
                  <Route path='/device/update' element={<UpdateDevice />} />\
                  <Route path='/service' element={<ServicePage />} />
                </Routes>
              </LayoutRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

interface LayoutRouteProps {
  children: React.ReactNode;
}

function LayoutRoute({ children }: LayoutRouteProps) {
  const location = useLocation();

  if (['/', '/login', '/forgot_password', '/reset_password'].includes(location.pathname)) {
    return <>{children}</>;
  }

  return (
    <Layout hasSider style={{ height: '100vh', width: '100%' }}>
      <SiderPage />
      <Layout>
        <HeaderPage />
        <Content style={{ padding: '3%', paddingTop: '0' }}>{children}</Content>
      </Layout>
    </Layout>
  );
}

export default App;

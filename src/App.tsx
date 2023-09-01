import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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
import AddService from './layout/Service/components/addService';
import DetaiService from './layout/Service/components/detailService';
import UpdateSevice from './layout/Service/components/updateService';

import AddNumberLevel from './layout/Number_Level/components/addNumberLevel';
import DashboardPage from './layout/Dashboard/dashboard';
import NumberLevelPage from './layout/Number_Level/number-level';
import DetailNumberLevel from './layout/Number_Level/components/detailNumerLevel';
import ReportPage from './layout/Report/Report';
import RolePage from './layout/Setting/Role/role';
import UpdateRole from './layout/Setting/Role/components/updateRole';
import AddRole from './layout/Setting/Role/components/addRole';
import AccountPage from './layout/Setting/Account/account';
import AddAccount from './layout/Setting/Account/components/addAccount';
import UpdateAccount from './layout/Setting/Account/components/updateAccount';
import HistoryPage from './layout/Setting/History/history';

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
                <Routes>
                  <Route path='/dashboard' element={<DashboardPage />} />
                  <Route path='/profile' element={<Profile />} />
                  <Route path='/device' element={<DeviceTable />} />
                  <Route path='/device/detail' element={<DetailDevice />} />
                  <Route path='/device/add' element={<AddDevice />} />
                  <Route path='/device/update' element={<UpdateDevice />} />
                  <Route path='/service' element={<ServicePage />} />
                  <Route path='/service/add' element={<AddService />} />
                  <Route path='/service/detail' element={<DetaiService />} />
                  <Route path='/service/update' element={<UpdateSevice />} />
                  <Route path='/number_level' element={<NumberLevelPage />} />
                  <Route path='/number_level/add' element={<AddNumberLevel />} />
                  <Route path='number_level/detail' element={<DetailNumberLevel />} />
                  <Route path='/report' element={<ReportPage />} />
                  <Route path='/role' element={<RolePage />} />
                  <Route path='/role/update' element={<UpdateRole />} />
                  <Route path='/role/add' element={<AddRole />} />
                  <Route path='/account' element={<AccountPage />} />
                  <Route path='/account/add' element={<AddAccount />} />
                  <Route path='/account/update' element={<UpdateAccount />} />
                  <Route path='/history' element={<HistoryPage />} />
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
    <Layout hasSider style={{ width: '100%' }}>
      <SiderPage />
      <Layout>
        <HeaderPage />
        <Content style={{ padding: '3%', paddingTop: '0', paddingRight: '0', height: '90vh' }}>{children}</Content>
      </Layout>
    </Layout>
  );
}

export default App;

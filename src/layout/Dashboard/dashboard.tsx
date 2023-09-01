import React, { useState, useEffect } from 'react';
import { Content } from 'antd/es/layout/layout';
import TableDashboard from './components/table';
import { CalendarProps, Col, Row, Select } from 'antd';
import { CalendarTwoTone } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchNumberLevel } from '../../redux/slice/numberLevel/numberLevelSilce';
import '../../assets/css/dashboard.css';
import { Option } from 'antd/es/mentions';
import device from '../../assets/icon/device.svg';
import { Calendar, Typography } from 'antd';
import { Dayjs } from 'dayjs';
import { fetchDevices } from '../../redux/slice/device/deviceSlice';
import status1 from '../../assets/icon/Dashboard/status1.svg';
import status2 from '../../assets/icon/Dashboard/status2.svg';
import status3 from '../../assets/icon/Dashboard/status3.svg';
import status4 from '../../assets/icon/Dashboard/status4.svg';
const divStyle = {
  backgroundColor: 'rgba(102, 149, 251, 0.2)',
  borderRadius: '50%',
  width: '3vw',
  height: '6.5vh',
  minWidth: '3vw',
  minHeight: '6px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
const iconStyle = {
  fontSize: '170%',
};

const div = {
  padding: '2%',
  borderRadius: '12px',
  backgroundColor: 'var(--white, #FFF)',
  boxShadow: '5px 5px 15px 0px rgba(70, 64, 67, 0.10)',
  height: '10vh',
};

const DashboardPage = () => {
  const dispatch: AppDispatch = useDispatch();
  //cấp số
  useEffect(() => {
    dispatch(fetchNumberLevel());
  }, [dispatch]);
  const numberLevels = useSelector((state: RootState) => state.numberLevels);

  const totalCountNumberLevels = numberLevels.length;
  const highestNumberOrder = Math.max(...numberLevels.map((level) => level.numberOrder));
  const usedStatusCount = numberLevels.filter((level) => level.status === 'Đã sử dụng').length;
  const usedStatusCount2 = numberLevels.filter((level) => level.status === 'Đang chờ').length;
  const usedStatusCount3 = numberLevels.filter((level) => level.status === 'Bỏ qua').length;

  //thiết bị
  useEffect(() => {
    dispatch(fetchDevices());
  }, [dispatch]);
  const devices = useSelector((state: RootState) => state.devices);
  const totalCountDevice = devices.length;
  const usedStatusCountDevice = devices.filter((level) => level.statusOperation === 'Hoạt động').length;
  const usedStatusCountDevice2 = devices.filter((level) => level.statusOperation === 'Đang hoạt động').length;

  // dịch vụ
  useEffect(() => {
    dispatch(fetchDevices());
  }, [dispatch]);
  const services = useSelector((state: RootState) => state.services);
  const totalCountService = services.length;
  const usedStatusCountService = services.filter((level) => level.statusOperation === 'Hoạt động').length;
  const usedStatusCountService2 = services.filter((level) => level.statusOperation === 'Đang hoạt động').length;

  ///
  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
  const wrapperStyle: React.CSSProperties = {
    paddingLeft: '10%',
    paddingRight: '10%',
    marginTop: '-5%',
    boxShadow: '5px 5px 15px 0px rgba(70, 64, 67, 0.10)',
  };
  return (
    <Content className='dashboard' style={{ textAlign: 'start' }}>
      <Row>
        <Col span={16}>
          <div>
            <p className='device-text-header'>Biểu đồ cấp số</p>
          </div>
          <Row>
            <Col span={24}>
              <Row>
                <Col span={6}>
                  <div className='profile' style={{ padding: '5%' }}>
                    <div style={{ display: 'flex' }}>
                      <div style={divStyle}>
                        <img src={status1} alt='' />
                      </div>
                      <p style={{ margin: '0', marginLeft: '5%', fontSize: '16px', fontWeight: '500', width: '50%' }}>Số thứ tự đã cấp</p>
                    </div>
                    <div style={{ display: 'flex' }}>
                      <p style={{ fontSize: '30px', margin: 0 }}>{highestNumberOrder}</p>
                    </div>
                  </div>
                </Col>
                <Col span={6}>
                  <div className='profile' style={{ padding: '5%' }}>
                    <div style={{ display: 'flex' }}>
                      <div style={divStyle}>
                        <img src={status2} alt='' />
                      </div>
                      <p style={{ margin: '0', marginLeft: '5%', fontSize: '16px', fontWeight: '500', width: '50%' }}>Số thứ tự đã sử dụng</p>
                    </div>
                    <div style={{ display: 'flex' }}>
                      <p style={{ fontSize: '30px', margin: 0 }}>{usedStatusCount}</p>
                    </div>
                  </div>
                </Col>
                <Col span={6}>
                  <div className='profile' style={{ padding: '5%' }}>
                    <div style={{ display: 'flex' }}>
                      <div style={divStyle}>
                        <img src={status3} alt='' />
                      </div>
                      <p style={{ margin: '0', marginLeft: '5%', fontSize: '16px', fontWeight: '500', width: '50%' }}>Số thứ tự đang chờ</p>
                    </div>
                    <div style={{ display: 'flex' }}>
                      <p style={{ fontSize: '30px', margin: 0 }}>{usedStatusCount2}</p>
                    </div>
                  </div>
                </Col>
                <Col span={6}>
                  <div className='profile' style={{ padding: '5%' }}>
                    <div style={{ display: 'flex' }}>
                      <div style={divStyle}>
                        <img src={status4} alt='' />
                      </div>
                      <p style={{ margin: '0', marginLeft: '5%', fontSize: '16px', fontWeight: '500', width: '50%' }}>Số thứ tự đã bỏ qua</p>
                    </div>
                    <div style={{ display: 'flex' }}>
                      <p style={{ fontSize: '30px', margin: 0 }}>{usedStatusCount3}</p>
                    </div>
                  </div>
                </Col>
              </Row>
              <div className='profile' style={{ marginRight: '1%', marginTop: '1%' }}>
                <div style={{ display: 'flex' }}>
                  <h1 style={{ fontSize: '20px' }}>Bảng thống kê theo ngày</h1>
                  <div style={{ display: 'flex', alignItems: 'center', marginLeft: '50%' }}>
                    <p>Xem theo </p>
                    <Select style={{ width: '5vw' }}>
                      <Option>Ngày</Option>
                    </Select>
                  </div>
                </div>
                <br />
                <TableDashboard />
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={8} className='profile' style={{ marginRight: 0, borderRadius: 0, paddingTop: 0 }}>
          <div>
            <p className='device-text-header'>Tổng quan</p>
          </div>
          <div className=''>
            <Row style={div}>
              <Col></Col>
              <Col offset={1}>
                <p style={{ fontSize: '25px', margin: 0 }}>{totalCountDevice}</p>
                <span style={{ fontSize: '14px', alignItems: 'center', color: 'var(--orange-orange-500, #FF7506)' }}>
                  <img src={device} alt='' width={'14px'} /> Thiết bị
                </span>
              </Col>
              <Col offset={1}>
                <p style={{ margin: 0, color: 'var(--gray-gray-300, #7E7D88)' }}>
                  Đang hoạt động: <b style={{ color: 'var(--orange-orange-500, #FF7506)', fontWeight: 700 }}>{usedStatusCountDevice}</b>
                </p>
                <p></p>
                <p style={{ margin: 0, color: 'var(--gray-gray-300, #7E7D88)' }}>
                  Ngưng hoạt động: <b style={{ color: 'var(--orange-orange-500, #FF7506)', fontWeight: 700 }}>{usedStatusCountDevice2}</b>
                </p>
              </Col>
            </Row>
            <br />
            <Row style={div}>
              <Col></Col>
              <Col offset={1}>
                <p style={{ fontSize: '25px', margin: 0 }}>{totalCountService}</p>
                <span style={{ fontSize: '14px', alignItems: 'center', color: 'var(--blue, #4277FF)' }}>
                  <img src={device} alt='' width={'14px'} /> Dịch vụ
                </span>
              </Col>
              <Col offset={1}>
                <p style={{ margin: 0, color: 'var(--gray-gray-300, #7E7D88)' }}>
                  Đang hoạt động: <b style={{ color: 'var(--blue, #4277FF)', fontWeight: 700 }}>{usedStatusCountService}</b>
                </p>
                <p></p>
                <p style={{ margin: 0, color: 'var(--gray-gray-300, #7E7D88)' }}>
                  Ngưng hoạt động: <b style={{ color: 'var(--blue, #4277FF)', fontWeight: 700 }}>{usedStatusCountService2}</b>
                </p>
              </Col>
            </Row>
            <br />
            <Row style={div}>
              <Col></Col>
              <Col offset={1}>
                <p style={{ fontSize: '25px', margin: 0 }}>{totalCountNumberLevels}</p>
                <span style={{ fontSize: '14px', alignItems: 'center', color: 'var(--green, #35C75A)' }}>
                  <img src={device} alt='' width={'14px'} /> Cấp số
                </span>
              </Col>
              <Col offset={1}>
                <p style={{ margin: 0, color: 'var(--gray-gray-300, #7E7D88)' }}>
                  Đã sử dụng: <b style={{ color: 'var(--green, #35C75A)', fontWeight: 700 }}>{usedStatusCount}</b>
                </p>
                <p style={{ margin: 0, color: 'var(--gray-gray-300, #7E7D88)' }}>
                  Đang chờ: <b style={{ color: 'var(--green, #35C75A)', fontWeight: 700 }}> {usedStatusCount2}</b>
                </p>
                <p style={{ margin: 0, color: 'var(--gray-gray-300, #7E7D88)' }}>
                  Bỏ qua: <b style={{ color: 'var(--green, #35C75A)', fontWeight: 700 }}>{usedStatusCount3}</b>
                </p>
              </Col>
            </Row>
          </div>
          <div style={wrapperStyle}>
            <Calendar
              fullscreen={false}
              headerRender={({ value, type, onChange, onTypeChange }) => {
                return (
                  <div style={{ textAlign: 'center' }}>
                    <Typography.Title level={4}>{value.format('DD/MM/YYYY')}</Typography.Title>
                  </div>
                );
              }}
              onPanelChange={onPanelChange}
            />
          </div>
        </Col>
      </Row>
    </Content>
  );
};

export default DashboardPage;

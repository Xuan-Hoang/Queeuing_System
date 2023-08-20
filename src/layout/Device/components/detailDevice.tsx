import { Col, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';

import { AppDispatch, RootState } from '../../../redux/store';
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { fetchDevices } from '../../../redux/slice/device/deviceSlice';

const DetailDevice = () => {
  const dispatch: AppDispatch = useDispatch();
  const devices = useSelector((state: RootState) => state.devices);
  const id = localStorage.getItem('id') || '';

  useEffect(() => {
    dispatch(fetchDevices());
  }, [dispatch]);

  const detailDevice = devices.find((device) => device.id === id);

  return (
    <Content hasSider style={{ height: '100vh', width: '100%' }}>
      <div>
        <p className='device-text-header'>Danh Sách Thiết Bị</p>
      </div>
      <div className='profile'>
        <Row className='device-detail-list'>
          <Col span={12}>
            <Row>
              <Col className='device-detail-text'>
                <p>Mã thiết bị: </p>

                <p>Tên thiết bị:</p>

                <p>Địa chỉ IP:</p>
              </Col>
              <Col offset={1} className='device-detail-text-detail'>
                <p>{detailDevice?.id}</p>

                <p>{detailDevice?.nameDevice}</p>

                <p>{detailDevice?.IPAddress}</p>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row>
              <Col className='device-detail-text'>
                <p>Loại thiết bị:</p>

                <p>Tên đăng nhập:</p>

                <p>Mật khẩu:</p>
              </Col>
              <Col offset={1} className='device-detail-text-detail'>
                <p>{detailDevice?.nameDevice}</p>

                <p>{detailDevice?.usernameDevice}</p>

                <p>{detailDevice?.passwordDevice}</p>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <p className='device-detail-text'>Dịch vụ sử dụng:</p>
            <span className='device-detail-text-detail'>{detailDevice?.useService.join(', ')}</span>
          </Col>
        </Row>
      </div>
    </Content>
  );
};

export default DetailDevice;

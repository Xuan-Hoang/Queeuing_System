import { Button, Col, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';

import { AppDispatch, RootState } from '../../../redux/store';
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { fetchDevices } from '../../../redux/slice/device/deviceSlice';
import { EditFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const DetailDevice = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const devices = useSelector((state: RootState) => state.devices);
  const id = localStorage.getItem('id') || '';

  useEffect(() => {
    dispatch(fetchDevices());
  }, [dispatch]);

  const detailDevice = devices.find((device) => device.id === id);
  const handUpdate = (idDevice: string) => {
    localStorage.setItem('id', idDevice);
    navigate(`/device/update`);
    console.log(idDevice);
  };
  return (
    <Content>
      <div>
        <p className='device-text-header'>Quản lý thiết bị</p>
      </div>
      <Row>
        <Col span={22}>
          <div className='profile' style={{ minHeight: '70vh' }}>
            <div>
              <p className='device-text-header' style={{ fontSize: '18px', margin: '0' }}>
                Thông tin thiết bị
              </p>
            </div>
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
        </Col>
        <Col span={1}>
          <button className='square-button' onClick={() => handUpdate(id)}>
            <div>
              <EditFilled className='square-button-icon' />
            </div>
            <div>
              <p className='square-button-text'>Cập nhật thết bị</p>
            </div>
          </button>
        </Col>
      </Row>
    </Content>
  );
};

export default DetailDevice;

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Col, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';

import { AppDispatch, RootState } from '../../../redux/store';
import { fetchNumberLevel } from '../../../redux/slice/numberLevel/numberLevelSilce';
import { format } from 'date-fns';

const DetailNumberLevel = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const numberLevels = useSelector((state: RootState) => state.numberLevels);
  const id = localStorage.getItem('idNumberLevel') || '';

  useEffect(() => {
    dispatch(fetchNumberLevel());
  }, [dispatch]);

  const deltailNumberLevel = numberLevels.find((numberLevel) => numberLevel.id === id);

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
                    <p>Họ tên: </p>
                    <p>Tên dịch vụ:</p>
                    <p>Số thứ tự:</p>
                    <p>Thời gian cấp:</p>
                    <p>Hạn sử dụng:</p>
                  </Col>
                  <Col offset={1} className='device-detail-text-detail'>
                    <p>{deltailNumberLevel?.customer}</p>
                    <p>{deltailNumberLevel?.service}</p>
                    <p>{deltailNumberLevel?.numberOrder}</p>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row>
                  <Col className='device-detail-text'>
                    <p>Nguồn cấp:</p>
                    <p>Trạng thái:</p>
                    <p>Số điện thoại:</p>
                    <p>Địa chỉ Email:</p>
                  </Col>
                  <Col offset={1} className='device-detail-text-detail'>
                    <p>{deltailNumberLevel?.source}</p>

                    <p>{deltailNumberLevel?.status}</p>

                    <p>{deltailNumberLevel?.email}</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Content>
  );
};

export default DetailNumberLevel;

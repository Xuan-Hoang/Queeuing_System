import React, { useState, useEffect } from 'react';
import { Content } from 'antd/es/layout/layout';
import TableDashboard from './components/table';
import { Col, Row } from 'antd';
import { CalendarTwoTone } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchNumberLevel } from '../../redux/slice/numberLevel/numberLevelSilce';

const DashboardPage = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNumberLevel());
  }, [dispatch]);
  const numberLevels = useSelector((state: RootState) => state.numberLevels);
  const highestNumberOrder = Math.max(...numberLevels.map((level) => level.numberOrder));

  return (
    <Content>
      <div>
        <p className='device-text-header'>Biểu đồ cấp số</p>
      </div>
      <Row>
        <Col>
          <CalendarTwoTone />
          Số thứ tự đã cấp
          <span>{highestNumberOrder}</span>
        </Col>
        <Col></Col>
        <Col></Col>
        <Col></Col>
      </Row>
      <TableDashboard />
    </Content>
  );
};

export default DashboardPage;

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import '../../assets/css/device.css';
import { Table, Select, Input, Modal, Form, Row, Col } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Option } from 'antd/es/mentions';
import { fetchDevices } from '../../redux/slice/device/deviceSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { Device } from '../../types/deviceType';
import DotStatus from '../../components/dotStatus/dotStatus';
import { PlusSquareFilled } from '@ant-design/icons';
import { Content } from 'antd/es/layout/layout';
import { NavLink, useNavigate } from 'react-router-dom';

const ServicePage: React.FC = () => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<string[]>([]);

  const [filterStatusOperation, setFilterStatusOperation] = useState<string | 'all'>('all');
  const [filterStatusConnection, setFilterStatusConnection] = useState<string | 'all'>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const dispatch: AppDispatch = useDispatch();
  const devices = useSelector((state: RootState) => state.devices);

  const showModal = (useService: string[]) => {
    setModalContent(useService);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalContent([]);
  };
  const handDetail = (idDevice: string) => {
    localStorage.setItem('idDevice', idDevice);
    console.log(idDevice);
  };

  const columns: ColumnsType<Device> = [
    {
      title: 'Mã dịch vụ',
      dataIndex: 'idSẻvice',
      width: '7vw',
    },
    {
      title: 'Tên dịch vụ',
      dataIndex: 'nameService',
      width: '10vw',
    },
    {
      title: 'Mô tả',
      dataIndex: 'descriptionService',
      width: '15vw',
    },
    {
      title: 'Trạng Hoạt Động',
      dataIndex: 'statusOperation',
      width: '15vw',
      render: (text) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <DotStatus status={text} />
          <span style={{ marginLeft: '5px' }}>{text}</span>
        </div>
      ),
    },

    {
      title: ' ',
      dataIndex: 'detail',
      width: '5vw',
      render: (_, record) => (
        <NavLink to={`/service/detail`} onClick={() => handDetail(record.id)}>
          Chi tiết
        </NavLink>
      ),
    },
    {
      title: ' ',
      dataIndex: 'update',
      width: '5vw',
      render: (_, record) => (
        <NavLink to={`/service/update`} onClick={() => handDetail(record.id)}>
          Update
        </NavLink>
      ),
    },
  ];

  const filteredData = devices.filter((item) => {
    const operationCondition = filterStatusOperation === 'all' || item.statusOperation === filterStatusOperation;

    return (
      operationCondition &&
      (searchKeyword === '' ||
        Object.values(item)
          .map((value) => String(value).toLowerCase())
          .some((value) => value.includes(searchKeyword.toLowerCase())))
    );
  });
  useEffect(() => {
    dispatch(fetchDevices());
  }, [dispatch]);
  return (
    <Content>
      <div>
        <p className='device-text-header'>Danh Sách Thiết Bị</p>
      </div>
      <Form layout='inline'>
        <Form.Item className='device-select'>
          <p className='device-text-title'>Trạng thái hoạt động</p>
          <Select size='large' defaultValue='all' onChange={(value: string) => setFilterStatusOperation(value)}>
            <Option value='all'>Tất cả</Option>
            <Option value='Hoạt động'>Hoạt động</Option>
            <Option value='Ngưng hoạt động'>Ngưng hoạt động</Option>
          </Select>
        </Form.Item>
        <Form.Item className='device-select'></Form.Item>
        <Form.Item className='device-search'>
          <div className='device-search-item'>
            <p className='device-text-title'>Từ khóa</p>
            <Input placeholder='Tìm kiếm' value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
          </div>
        </Form.Item>
      </Form>
      <br />
      <Row>
        <Col span={22}>
          <Table columns={columns} dataSource={filteredData} />
        </Col>
        <Col span={1} offset={1} onClick={() => navigate(`/service/add-service`)}>
          <div className='device-add-layout'>
            <PlusSquareFilled className='device-add-icon' />
            <p className='device-add-text'>Thêm thiết bị</p>
          </div>
        </Col>
      </Row>

      <Modal visible={modalVisible} onCancel={closeModal} footer={null} width={600}>
        {modalContent.join(', ')}
      </Modal>
    </Content>
  );
};

export default ServicePage;

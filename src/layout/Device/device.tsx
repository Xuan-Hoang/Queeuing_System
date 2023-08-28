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

const DeviceTable: React.FC = () => {
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
    localStorage.setItem('id', idDevice);
    console.log(idDevice);
  };

  const columns: ColumnsType<Device> = [
    {
      title: 'Mã Thiết bị',
      dataIndex: 'id',
      width: '8vw',
    },
    {
      title: 'Tên Thiết Bị',
      dataIndex: 'nameDevice',
      width: '10vw',
    },
    {
      title: 'Địa chỉ IP',
      dataIndex: 'IPAddress',
      width: '9vw',
    },
    {
      title: 'Trạng thái hoạt động',
      dataIndex: 'statusOperation',
      width: '13vw',
      render: (text) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <DotStatus status={text} />
          <span style={{ marginLeft: '5px' }}>{text}</span>
        </div>
      ),
    },
    {
      title: 'Trạng thái kết nối',
      dataIndex: 'statusConection',
      width: '11vw',
      render: (text) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <DotStatus status={text} />
          <span style={{ marginLeft: '5px' }}>{text}</span>
        </div>
      ),
    },
    {
      title: 'Dịch vụ sử dụng',
      dataIndex: 'useService',
      width: '22vw',
      render: (text) => (
        <div style={{ lineHeight: '1' }}>
          {text.slice(0, 2).join(', ')}
          {text.length > 2 && (
            <div>
              <a onClick={() => showModal(text)}>Xem thêm</a>
            </div>
          )}
        </div>
      ),
    },

    {
      title: ' ',
      dataIndex: 'detail',
      width: '6vw',
      render: (_, record) => (
        <NavLink to={`/device/detail`} onClick={() => handDetail(record.id)}>
          Chi tiết
        </NavLink>
      ),
    },
    {
      title: ' ',
      dataIndex: 'update',
      width: '7vw',
      render: (_, record) => (
        <NavLink to={`/device/update`} onClick={() => handDetail(record.id)}>
          Cập nhật
        </NavLink>
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchDevices());
  }, [dispatch]);

  const filteredData = devices.filter((item) => {
    const operationCondition = filterStatusOperation === 'all' || item.statusOperation === filterStatusOperation;
    const connectionCondition = filterStatusConnection === 'all' || item.statusConection === filterStatusConnection;
    return (
      operationCondition &&
      connectionCondition &&
      (searchKeyword === '' ||
        Object.values(item)
          .map((value) => String(value).toLowerCase())
          .some((value) => value.includes(searchKeyword.toLowerCase())))
    );
  });

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
        <Form.Item className='device-select'>
          <p className='device-text-title'>Trạng thái kết nối</p>
          <Select size='large' defaultValue='all' onChange={(value: string) => setFilterStatusConnection(value)}>
            <Option value='all'>Tất cả</Option>
            <Option value='Kết nối'>Kết nối</Option>
            <Option value='Mất kết nối'>Mất kết nối</Option>
          </Select>
        </Form.Item>
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
        <Col span={1} style={{ marginLeft: '1%' }} onClick={() => navigate(`/device/add`)}>
          <button className='square-button' style={{ width: '82px' }}>
            <div>
              <PlusSquareFilled className='square-button-icon' />
            </div>
            <div>
              <p className='square-button-text'>Thêm thiết bị</p>
            </div>
          </button>
        </Col>
      </Row>

      <Modal visible={modalVisible} onCancel={closeModal} footer={null} width={600} style={{ marginTop: '10%' }}>
        <div style={{ padding: '3%' }}>{modalContent.join(', ')}</div>
      </Modal>
    </Content>
  );
};

export default DeviceTable;

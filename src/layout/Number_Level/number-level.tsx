/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import '../../assets/css/device.css';
import { Table, Select, Input, Modal, Form, Row, Col } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Option } from 'antd/es/mentions';
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import DotStatus from '../../components/dotStatus/dotStatus';
import { PlusSquareFilled } from '@ant-design/icons';
import { Content } from 'antd/es/layout/layout';
import { NavLink, useNavigate } from 'react-router-dom';
import { fetchNumberLevel } from '../../redux/slice/numberLevel/numberLevelSilce';
import { NumberLevel } from '../../types/NumberLevel';
import { format } from 'date-fns';

const NumberLevelPage: React.FC = () => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<string[]>([]);
  const [filterStatusOperation, setFilterStatusOperation] = useState<string | 'all'>('all');
  const [filterNameService, setFilterNameService] = useState<string | 'all'>('all');
  const [filterSourceSevice, setFilterSourceSevice] = useState<string | 'all'>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNumberLevel());
  }, [dispatch]);
  const numberLevels = useSelector((state: RootState) => state.numberLevels);

  const closeModal = () => {
    setModalVisible(false);
    setModalContent([]);
  };
  const handDetail = (idNumberLevel: string) => {
    localStorage.setItem('idNumberLevel', idNumberLevel);
    console.log(idNumberLevel);
  };

  const columns: ColumnsType<NumberLevel> = [
    {
      title: 'STT',
      dataIndex: 'numberOrder',
      width: '',
      sorter: (a, b) => {
        const numA = a.numberOrder.toString();
        const numB = b.numberOrder.toString();
        return numA.localeCompare(numB, undefined, { numeric: true, sensitivity: 'base' });
      },
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'customer',
      width: '',
    },
    {
      title: 'Tên dịch vụ',
      dataIndex: 'service',
      width: '',
    },
    {
      title: 'Thời gian cấp',
      dataIndex: 'issuanceDate',
      width: '',
      render: (issuanceDate: any) => {
        const formattedIssuanceDate = issuanceDate ? format(new Date(issuanceDate.toDate()), 'HH:mm dd/MM/yyyy') : '';
        return <span>{formattedIssuanceDate}</span>;
      },
    },
    {
      title: 'Hạn sử dụng',
      dataIndex: 'expiryDate',
      width: '',
      render: (expiryDate: any) => {
        const formattedExpiryDate = expiryDate ? format(new Date(expiryDate.toDate()), 'HH:mm dd/MM/yyyy') : '';

        return <span>{formattedExpiryDate}</span>;
      },
    },

    {
      title: 'Trạng thái ',
      dataIndex: 'status',
      width: '',
      render: (text) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <DotStatus status={text} />
          <span style={{ marginLeft: '5px' }}>{text}</span>
        </div>
      ),
    },
    {
      title: 'Nguồn cấp',
      dataIndex: 'source',
      width: '',
    },
    {
      title: ' ',
      dataIndex: 'detail',
      width: '',
      render: (_, record) => (
        <NavLink to={`/number_level/detail`} onClick={() => handDetail(record.id)}>
          Chi tiết
        </NavLink>
      ),
    },
  ];

  const filteredData = numberLevels.filter((item) => {
    const nameCondition = filterNameService === 'all' || item.service === filterNameService;
    const operationCondition = filterStatusOperation === 'all' || item.status === filterStatusOperation;

    return (
      nameCondition &&
      operationCondition &&
      (searchKeyword === '' ||
        Object.values(item)
          .map((value) => String(value).toLowerCase())
          .some((value) => value.includes(searchKeyword.toLowerCase())))
    );
  });
  // const limitedData = filteredData.slice(0, 5);

  return (
    <Content>
      <div>
        <p className='device-text-header'>Danh Sách Thiết Bị</p>
      </div>
      <Form layout='inline'>
        <Form.Item className='number_level-select'>
          <p className='device-text-title'>Tên dịch vụ</p>
          <Select size='large' defaultValue='all' onChange={(value: string) => setFilterNameService(value)}>
            <Option value='all'>Tất cả</Option>
            <Option value='Khám tim mạch'>Khám tim mạch</Option>
            <Option value='Khám sản - Phụ khoa'>Khám sản - Phụ khoa</Option>
            <Option value='Khám răng hàm mặ'>Khám răng hàm mặt</Option>
            <Option value='Khám tai mũi họng'>Khám tai mũi họng</Option>
            <Option value='Khám hô hấp'> Khám hô hấp</Option>
          </Select>
        </Form.Item>
        <Form.Item className='number_level-select'>
          <p className='device-text-title'>Tình trạng</p>
          <Select size='large' defaultValue='all' onChange={(value: string) => setFilterStatusOperation(value)}>
            <Option value='all'>Tất cả</Option>
            <Option value='Đang chờ'>Đang chờ</Option>
            <Option value='Đã sử dụng'>Đã sử dụng</Option>
            <Option value='Bỏ qua'>Bỏ qua</Option>
          </Select>
        </Form.Item>
        <Form.Item className='number_level-select'>
          <p className='device-text-title'>Nguồn cấp</p>
          <Select size='large' defaultValue='all' onChange={(value: string) => setFilterSourceSevice(value)}>
            <Option value='all'>Tất cả</Option>
            <Option value='Kiosk'>Kiosk</Option>
            <Option value='Hệ thống'>Hệ thống</Option>
          </Select>
        </Form.Item>
        <Form.Item className=' '></Form.Item>

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
          <Table columns={columns} dataSource={filteredData} pagination={{ pageSize: 6 }} />
        </Col>
        <Col span={1} style={{ marginLeft: '1%' }} onClick={() => navigate(`/number_level/add`)}>
          <button className='square-button' style={{ width: '82px' }}>
            <div>
              <PlusSquareFilled className='square-button-icon' />
            </div>
            <div>
              <p className='square-button-text'>Cấp số mới</p>
            </div>
          </button>
        </Col>
      </Row>

      <Modal visible={modalVisible} onCancel={closeModal} footer={null} width={600}>
        {modalContent.join(', ')}
      </Modal>
    </Content>
  );
};

export default NumberLevelPage;

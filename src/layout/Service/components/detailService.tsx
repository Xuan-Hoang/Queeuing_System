import { Col, DatePicker, Form, Input, InputNumber, Row, Select, Table } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Option } from 'antd/es/mentions';
import { Service } from '../../../types/serviceType';
import { ColumnsType } from 'antd/es/table';
import { AppDispatch, RootState } from '../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchSevices } from '../../../redux/slice/service/serviceSlice';
import { ArrowLeftOutlined, EditFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const DetaiService = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const services = useSelector((state: RootState) => state.services);
  const id = localStorage.getItem('idService') || '';
  useEffect(() => {
    dispatch(fetchSevices());
  }, [dispatch]);
  const detailService = services.find((services) => services.id === id);
  console.log(detailService);
  const columns: ColumnsType<Service> = [
    {
      title: 'Số thứ tự',
      dataIndex: 'numericalOrder',
      width: '50vw',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      width: '50vw',
    },
  ];
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [filterStatusOperation, setFilterStatusOperation] = useState<string | 'all'>('all');
  const filteredData = services.filter((item) => {
    const operationCondition = filterStatusOperation === 'all' || item.statusOperation === filterStatusOperation;

    return (
      operationCondition &&
      (searchKeyword === '' ||
        Object.values(item)
          .map((value) => String(value).toLowerCase())
          .some((value) => value.includes(searchKeyword.toLowerCase())))
    );
  });
  const handUpdate = (idDevice: string) => {
    localStorage.setItem('id', idDevice);
    navigate(`/service/update`);
    console.log(idDevice);
  };
  return (
    <Content className='service'>
      <div>
        <p className='device-text-header'>Quản lý dịch vụ</p>
      </div>
      <div>
        <Row>
          <Col span={8} className='profile' style={{ marginRight: '1%' }}>
            <div className=''>
              <p className='device-text-header' style={{ fontSize: '18px' }}>
                Thông tin dịch vụ
              </p>
              <Row>
                <Col span={6} className='service-numberLevel'>
                  Mã dịch vụ:
                </Col>
                <Col offset={1}>{detailService?.id}</Col>
              </Row>
              <br />
              <Row>
                <Col span={6} className='service-numberLevel'>
                  Tên dịch vụ:{' '}
                </Col>
                <Col offset={1}>{detailService?.nameService}</Col>
              </Row>
              <br />
              <Row>
                <Col span={6} className='service-numberLevel'>
                  Mô tả:{' '}
                </Col>
                <Col offset={1}>{detailService?.describeService}</Col>
              </Row>
            </div>
            <div className=''>
              <p className='device-text-header' style={{ fontSize: '18px' }}>
                Quy tắc cấp số
              </p>
              <Row>
                <Col span={10}>
                  <p className='service-numberLevel'>Tăng tự động từ:</p>
                </Col>
                <Col>
                  <InputNumber style={{ marginRight: '4px' }} placeholder='0001' />
                </Col>
                <Col>
                  đến <InputNumber placeholder='9999' />
                </Col>
              </Row>
              <br />
              <Row>
                <Col span={10}>
                  <p className='service-numberLevel'>Prefix:</p>
                </Col>
                <Col>
                  <InputNumber placeholder='0001' />
                </Col>
              </Row>
              <br />
              <p className='service-numberLevel'>Reset mỗi ngày</p>
            </div>
          </Col>

          <Col span={14} className='profile' style={{ marginRight: '0', height: '80vh' }}>
            <Form layout='vertical'>
              <Row>
                <Col span={6} style={{ marginRight: '3%' }}>
                  <Form.Item label='Trạng thái'>
                    <Select size='large' defaultValue='all'>
                      <Option value='all'>Tất cả</Option>
                      <Option value='Đã hoàn thành'>Đã hoàn thành</Option>
                      <Option value='Đã thực hiện'>Đã thực hiện</Option>
                      <Option value='Vắng'>Vắng</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label='Chọn thời gian'>
                    <DatePicker size='large'></DatePicker>
                    <DatePicker size='large'></DatePicker>
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item label='Từ khóa'>
                    <Input placeholder='Tìm kiếm' />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
            <Table columns={columns} dataSource={filteredData} />
          </Col>
          <Col span={1}>
            <button className='square-button' onClick={() => handUpdate(id)} style={{ width: '90px', marginLeft: '5%' }}>
              <div>
                <EditFilled className='square-button-icon' />
              </div>
              <div>
                <p className='square-button-text' style={{ fontWeight: '300', fontSize: '15px' }}>
                  Cập nhật danh sách
                </p>
              </div>
            </button>
            <br />
            <button className='square-button' onClick={() => navigate('/service')} style={{ width: '90px', marginLeft: '5%' }}>
              <div>
                <ArrowLeftOutlined className='square-button-icon' />
              </div>
              <div>
                <p className='square-button-text' style={{ fontWeight: '300', fontSize: '15px' }}>
                  Quay lại
                </p>
              </div>
            </button>
          </Col>
        </Row>
      </div>
    </Content>
  );
};

export default DetaiService;

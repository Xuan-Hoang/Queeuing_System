import { Content } from 'antd/es/layout/layout';
import React, { useState, useEffect } from 'react';
import { Button, Cascader, Col, Form, Input, Row, Select } from 'antd';
import { AppDispatch, RootState } from '../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { Device } from '../../../types/deviceType';
import { Option } from 'antd/es/mentions';
import { useNavigate } from 'react-router-dom';
import { fetchDevices } from '../../../redux/slice/device/deviceSlice';

interface Option {
  value: string;
  label: string;
  children?: Option[];
}

const UpdateDevice = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const devices = useSelector((state: RootState) => state.devices);
  const idDevice = localStorage.getItem('idDevice') || '';

  useEffect(() => {
    dispatch(fetchDevices());
  }, [dispatch]);

  const detailDevice = devices.find((device) => device.idDevice === idDevice);

  const [updateDevice, setUpdateDevice] = useState<Device>({
    idDevice: '',
    nameDevice: '',
    IPAddress: '',
    statusOperation: '',
    statusConection: '',
    useService: [],
    typeDevice: '',
    usernameDevice: '',
    passwordDevice: '',
  });

  const handleInputChange = (field: keyof Device, value: string) => {
    setUpdateDevice((prevDevice) => ({
      ...prevDevice,
      [field]: value,
    }));
  };

  const options: Option[] = [
    {
      label: 'Khám tim mạch',
      value: 'Khám tim mạch',
    },
    {
      label: 'Khám sản - phụ khoa',
      value: 'Khám sản - phụ khoa',
    },
    {
      label: 'Khám răng hàm mặt',
      value: 'Khám răng hàm mặt',
    },
    {
      label: 'Khám tai mũi họng',
      value: 'Khám tai mũi họng',
    },
    {
      label: 'Khám hô hấp',
      value: 'Khám hô hấp',
    },
    {
      label: 'Khám tổng quát',
      value: 'Khám tổng quát',
    },
  ];

  return (
    <Content>
      <div>
        <p className='device-text-header'>Thêm thiết bị</p>
      </div>
      <div className='inline'>
        <Row>
          <Col span={11}>
            <Form layout='vertical'>
              <Form.Item label='Mã thiết bị:'>
                <Input placeholder='Nhập mã thiết bị' />
              </Form.Item>
              <Form.Item label='Tên thiết bị:'>
                <Input placeholder='Nhập tên thiết bị' />
              </Form.Item>
              <Form.Item label='Địa chỉ IP:'>
                <Input placeholder='Nhập địa chỉ IP' />
              </Form.Item>
            </Form>
          </Col>
          <Col span={11} offset={1}>
            <Form layout='vertical'>
              <Form.Item label='Loại thiết bị:'>
                {/* <Input  placeholder='Chọn loại thiết bị' /> */}
                <Select size='large' placeholder='Chọn loại thiết bị'>
                  <Option value='Kiosk'>Kiosk</Option>
                  <Option value='Display counter'>Display counter</Option>
                </Select>
              </Form.Item>
              <Form.Item label='Tên Đăng nhập:'>
                <Input placeholder='tên đăng nhập' />
              </Form.Item>
              <Form.Item label='Mật khẩu:'>
                <Input.Password placeholder='Mật khẩu' />
              </Form.Item>
            </Form>
          </Col>
          <Col span={23}>
            <Form layout='vertical'>
              <Form.Item label='Dịch vụ sử dụng:'>
                <Cascader size='large' style={{ width: '100%' }} multiple options={options} maxTagCount='responsive' />
              </Form.Item>
            </Form>
            <p>* là trường thông tin bắt buộc</p>
          </Col>
        </Row>
      </div>
      <div className=''>
        <Col span={23}>
          <Button style={{ background: 'var(--orange-orange-50, #FFF2E7)' }} className='addDevice-submit' onClick={(e) => navigate(`/device`)}>
            Hủy bỏ
          </Button>
          <Button className='addDevice-submit' type='primary' style={{ background: 'var(--orange-orange-400, #ff9138)' }}>
            Tiếp tục
          </Button>
        </Col>
      </div>
    </Content>
  );
};

export default UpdateDevice;

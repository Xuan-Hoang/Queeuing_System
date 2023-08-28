import { Content } from 'antd/es/layout/layout';
import React, { useState, useEffect } from 'react';
import { Button, Cascader, Col, Form, Input, Row, Select } from 'antd';
import { AppDispatch, RootState } from '../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { Device } from '../../../types/deviceType';
import { Option } from 'antd/es/mentions';
import { useNavigate } from 'react-router-dom';
import { fetchDevices, updateDevice } from '../../../redux/slice/device/deviceSlice';

interface Option {
  value: string;
  label: string;
  children?: Option[];
}

const UpdateDevice = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const devices = useSelector((state: RootState) => state.devices);
  const id = localStorage.getItem('id') || '';
  useEffect(() => {
    dispatch(fetchDevices());
  }, [dispatch]);
  const [updatedDevice, setUpdatedDevice] = useState<Device>({
    id: id,
    nameDevice: '',
    IPAddress: '',
    typeDevice: '',
    usernameDevice: '',
    passwordDevice: '',
    useService: [],
    statusOperation: '',
    statusConection: '',
  });

  useEffect(() => {
    const selectedDevice = devices.find((device) => device.id === id);
    if (selectedDevice) {
      setUpdatedDevice(selectedDevice);
      setUpdatedDevice({ ...selectedDevice });
    }
  }, [devices, id]);

  const handleUpdateDevice = () => {
    if (updatedDevice && id) {
      dispatch(updateDevice(id, updatedDevice))
        .then(() => {
          navigate('/device');
        })
        .catch((error) => {
          console.error('Error updating device:', error);
        });
    }
  };
  const handleInputChange = (field: keyof Device, value: string) => {
    setUpdatedDevice((prevDevice) => ({
      ...prevDevice,
      [field]: value,
    }));
  };
  const handleCascaderChange = (value: any[]) => {
    const selectedValues = value.map((item) => String(item));
    setUpdatedDevice((prevDevice) => ({
      ...prevDevice,
      useService: selectedValues,
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
        <p className='device-text-header'>Quản lý thiết bị</p>
      </div>
      <div className='profile'>
        <div>
          <p className='device-text-header' style={{ fontSize: '18px', marginTop: '0' }}>
            Thông tin thiết bị
          </p>
        </div>
        <Row>
          <Col span={11}>
            <Form layout='vertical'>
              <Form.Item label='Mã thiết bị:'>
                <Input placeholder='Nhập mã thiết bị' value={updatedDevice?.id || ''} name='id' onChange={(e) => handleInputChange('id', e.target.value)} />
              </Form.Item>
              <Form.Item label='Tên thiết bị:'>
                <Input
                  placeholder='Nhập tên thiết bị'
                  value={updatedDevice?.nameDevice || ''}
                  name='nameDevice'
                  onChange={(e) => handleInputChange('nameDevice', e.target.value)}
                />
              </Form.Item>
              <Form.Item label='Địa chỉ IP:'>
                <Input placeholder='Nhập địa chỉ IP' value={updatedDevice?.IPAddress || ''} name='IPAddress' onChange={(e) => handleInputChange('IPAddress', e.target.value)} />
              </Form.Item>
            </Form>
          </Col>
          <Col span={11} offset={1}>
            <Form layout='vertical'>
              <Form.Item label='Loại thiết bị:'>
                <Select size='large' placeholder='Chọn loại thiết bị' value={updatedDevice?.typeDevice || ''} onChange={(value) => handleInputChange('typeDevice', value)}>
                  <Option value='Kiosk'>Kiosk</Option>
                  <Option value='Display counter'>Display counter</Option>
                </Select>
              </Form.Item>
              <Form.Item label='Tên Đăng nhập:'>
                <Input
                  placeholder='tên đăng nhập'
                  value={updatedDevice?.usernameDevice || ''}
                  name='usernameDevice'
                  onChange={(e) => handleInputChange('usernameDevice', e.target.value)}
                />
              </Form.Item>
              <Form.Item label='Mật khẩu:'>
                <Input.Password
                  placeholder='Mật khẩu'
                  value={updatedDevice?.passwordDevice || ''}
                  name='passwordDevice'
                  onChange={(e) => handleInputChange('passwordDevice', e.target.value)}
                />
              </Form.Item>
            </Form>
          </Col>
          <Col span={23}>
            <Form layout='vertical'>
              <Form.Item label='Dịch vụ sử dụng:'>
                <Cascader size='large' style={{ width: '100%' }} multiple options={options} maxTagCount='responsive' onChange={handleCascaderChange} />
              </Form.Item>
            </Form>
            <p>* là trường thông tin bắt buộc</p>
          </Col>
        </Row>
      </div>

      <Col span={23}>
        <Button style={{ background: 'var(--orange-orange-50, #FFF2E7)' }} className='addDevice-submit' onClick={(e) => navigate(`/device`)}>
          Hủy bỏ
        </Button>
        <Button className='addDevice-submit' type='primary' style={{ background: 'var(--orange-orange-400, #ff9138)' }} onClick={handleUpdateDevice}>
          Tiếp tục
        </Button>
      </Col>
    </Content>
  );
};

export default UpdateDevice;

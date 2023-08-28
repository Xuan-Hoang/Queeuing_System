import { Content } from 'antd/es/layout/layout';
import React, { useState } from 'react';
import { Button, Cascader, Col, Form, Input, Row, Select, notification } from 'antd';
import { AppDispatch } from '../../../redux/store';
import { useDispatch } from 'react-redux';
import { addDevice } from '../../../redux/slice/device/deviceSlice';
import { Device } from '../../../types/deviceType';

import { Option } from 'antd/es/mentions';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-redeclare
interface Option {
  value: string | number;
  label: string;
  children?: Option[];
}
const AddDevice = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const statusOperationRD = Math.random() < 0.5 ? 'Hoạt động' : 'Ngưng hoạt động';
  const statusConectionRD = Math.random() < 0.5 ? 'Kết nối' : 'Mất kết nối';
  const [newDevice, setNewDevice] = useState<Device>({
    id: '',
    nameDevice: '',
    IPAddress: '',
    statusOperation: `${statusOperationRD}`,
    statusConection: `${statusConectionRD}`,
    useService: [],
    typeDevice: '',
    usernameDevice: '',
    passwordDevice: '',
  });

  const handleAddDevice = async () => {
    const messageConfig = {
      warning: { message: 'Cảnh báo', description: '' },
      success: { message: 'Thành công', description: '' },
      error: { message: 'Lỗi', description: 'Mã thiết bị đã có trong hệ thống' },
    };

    try {
      const result = await dispatch(addDevice(newDevice));
      if (!newDevice.id || !newDevice.nameDevice || !newDevice.IPAddress || !newDevice.typeDevice) {
        messageConfig.warning.description = 'Bạn chưa điền đầy đủ thông tin';
      } else if (result === 'duplicate_id') {
        messageConfig.warning.description = 'Id đã có trong hệ thống';
      } else if (result === 'duplicate_username') {
        messageConfig.warning.description = 'Tài khoản đã có trong hệ thống';
      } else {
        await dispatch(addDevice(newDevice));
        messageConfig.success.description = 'Thêm thiết bị thành công.';

        navigate(`/device`);
      }
      notification[messageConfig.warning.description ? 'warning' : 'success'](messageConfig.warning);
    } catch (error) {
      notification.error(messageConfig.error);
      console.log(error);
    }
  };
  const handleInputChange = (field: keyof Device, value: string) => {
    setNewDevice((prevDevice) => ({
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
      label: 'Khám sản phụ khoa',
      value: 'Khám sản phụ khoa',
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
      label: 'Khám hô hấp ',
      value: 'Khám hô hấp ',
    },
    {
      label: 'Khám tổng quát',
      value: 'Khám tổng quát',
    },
  ];
  const handleCascaderChange = (value: any[]) => {
    const selectedValues = value.map((item) => String(item));
    setNewDevice((prevDevice) => ({
      ...prevDevice,
      useService: selectedValues,
    }));
  };
  return (
    <Content>
      <div>
        <p className='device-text-header'>Quản lý thiết bị</p>
      </div>
      <div className='profile'>
        <div>
          <p className='device-text-header' style={{ marginTop: '0' }}>
            Thông tin thiết bị
          </p>
        </div>
        <Row>
          <Col span={11}>
            <Form layout='vertical'>
              <Form.Item label='Mã thiết bị:'>
                <Input value={newDevice.id} onChange={(e) => handleInputChange('id', e.target.value)} placeholder='Nhập mã thiết bị' />
              </Form.Item>
              <Form.Item label='Tên thiết bị:'>
                <Input value={newDevice.nameDevice} onChange={(e) => handleInputChange('nameDevice', e.target.value)} placeholder='Nhập tên thiết bị' />
              </Form.Item>
              <Form.Item label='Địa chỉ IP:'>
                <Input value={newDevice.IPAddress} onChange={(e) => handleInputChange('IPAddress', e.target.value)} placeholder='Nhập địa chỉ IP' />
              </Form.Item>
            </Form>
          </Col>
          <Col span={11} offset={1}>
            <Form layout='vertical'>
              <Form.Item label='Loại thiết bị:'>
                {/* <Input  placeholder='Chọn loại thiết bị' /> */}
                <Select size='large' value={newDevice.typeDevice} onChange={(value) => handleInputChange('typeDevice', value)} placeholder='Chọn loại thiết bị'>
                  <Option value='Kiosk'>Kiosk</Option>
                  <Option value='Display counter'>Display counter</Option>
                </Select>
              </Form.Item>
              <Form.Item label='Tên Đăng nhập:'>
                <Input placeholder='tên đăng nhập' value={newDevice.usernameDevice} onChange={(e) => handleInputChange('usernameDevice', e.target.value)} />
              </Form.Item>
              <Form.Item label='Mật khẩu:'>
                <Input.Password placeholder='Mật khẩu' value={newDevice.passwordDevice} onChange={(e) => handleInputChange('passwordDevice', e.target.value)} />
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
      <div className=''>
        <Col span={23}>
          <Button style={{ background: 'var(--orange-orange-50, #FFF2E7)' }} className='addDevice-submit' onClick={(e) => navigate(`/device`)}>
            Hủy bỏ
          </Button>
          <Button className='addDevice-submit' type='primary' onClick={handleAddDevice} style={{ background: 'var(--orange-orange-400, #ff9138)' }}>
            Tiếp tục
          </Button>
        </Col>
      </div>
    </Content>
  );
};

export default AddDevice;

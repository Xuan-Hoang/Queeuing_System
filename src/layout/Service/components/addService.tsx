import { Button, Checkbox, Col, Form, Input, InputNumber, Row, notification } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Content } from 'antd/es/layout/layout';
import '../../../assets/css/service.css';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../../redux/store';
import { useDispatch } from 'react-redux';
import { Service } from '../../../types/serviceType';
import React, { useEffect, useState } from 'react';
import { addService } from '../../../redux/slice/service/serviceSlice';
const AddService = () => {
  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();

  const randomStatusOperation = Math.random() < 0.5 ? 'Hoạt động' : 'Ngưng hoạt động';
  const randomStatus = Math.random() < 0.33 ? 'Đã hoàn thành' : Math.random() < 0.66 ? 'Đang thực hiện' : 'Vắng';
  const [newService, setNewService] = useState<Service>({
    id: '',
    nameService: '',
    describeService: '',
    statusOperation: `${randomStatusOperation}`,
    numericalOrder: ``,
    status: `${randomStatus}`,
  });
  const handleAddService = async () => {
    const messageConfig = {
      warning: { message: 'Cảnh báo', description: '' },
      success: { message: 'Thành công', description: '' },
      error: { message: 'Lỗi', description: 'Mã thiết bị đã có trong hệ thống' },
    };
    try {
      const result = await dispatch(addService(newService));
      if (!newService.id) {
        messageConfig.warning.description = 'Bạn chưa điền đầy đủ thông tin';
      } else if (isPrefixChecked && isSurfixChecked) {
        notification.warning({
          message: 'Lỗi',
          description: 'Chỉ được chọn một trong hai Prefix hoặc Surfix.',
        });
      } else if (result === 'duplicate_id') {
        notification.warning({
          message: 'Lỗi',
          description: 'ID đã có trong hệ thống',
        });
      } else {
        await dispatch(addService(newService));
        messageConfig.success.description = 'Thêm thiết bị thành công.';
        navigate(`/service`);
        notification.success(messageConfig.success);
      }
    } catch (error) {
      notification.error(messageConfig.error);
      console.log(error);
    }
  };

  const handleInputChange = (field: keyof Service, value: string) => {
    setNewService((prevDevice) => ({
      ...prevDevice,
      [field]: value,
    }));
  };
  const generateRandomNumber = () => {
    const min = 1;
    const max = 9999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return String(randomNumber).padStart(4, '0');
  };
  const [isPrefixChecked, setIsPrefixChecked] = useState(false);
  const [isSurfixChecked, setIsSurfixChecked] = useState(false);

  const handlePrefixChange = (checked: boolean) => {
    setIsPrefixChecked(checked);
    if (checked) {
      const prefix = newService.id;
      const randomNumericalOrder = generateRandomNumber();
      setNewService((prevService) => ({
        ...prevService,
        numericalOrder: prefix + randomNumericalOrder,
      }));
    } else if (!isSurfixChecked) {
      // Nếu Prefix không được chọn và không có Surfix, set lại numericalOrder với giá trị ngẫu nhiên
      setNewService((prevService) => ({
        ...prevService,
        numericalOrder: generateRandomNumber(),
      }));
    }
  };

  const handleSurfixChange = (checked: boolean) => {
    setIsSurfixChecked(checked);
    if (checked) {
      const surfix = newService.id;
      const randomNumericalOrder = generateRandomNumber();
      setNewService((prevService) => ({
        ...prevService,
        numericalOrder: randomNumericalOrder + surfix,
      }));
    } else if (!isPrefixChecked) {
      // Nếu Surfix không được chọn và không có Prefix, set lại numericalOrder với giá trị ngẫu nhiên
      setNewService((prevService) => ({
        ...prevService,
        numericalOrder: generateRandomNumber(),
      }));
    }
  };

  return (
    <Content className='service'>
      <div>
        <p className='device-text-header'>Quản lý dịch vụ</p>
      </div>
      <div className='service-content'>
        <div>
          <p className='device-text-header2'>Quản lý dịch vụ</p>
        </div>
        <Row>
          <Col span={11}>
            <Form layout='vertical'>
              <Form.Item label='Mã dịch vụ: ' name='idService' rules={[{ required: true, message: '' }]}>
                <Input value={newService.id} onChange={(e) => handleInputChange('id', e.target.value)} />
              </Form.Item>
              <Form.Item label='Tên dịch vụ:' name='nameService' rules={[{ required: true, message: '' }]}>
                <Input value={newService.nameService} onChange={(e) => handleInputChange('nameService', e.target.value)} />
              </Form.Item>
            </Form>
          </Col>
          <Col span={12} offset={1}>
            <Form layout='vertical'>
              <Form.Item label='Mô tả: ' name='idService' rules={[{ required: true, message: '' }]}>
                <TextArea rows={4} value={newService.describeService} onChange={(e) => handleInputChange('describeService', e.target.value)} />
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <div>
          <p className='device-text-header2'>Quy tắt cấp số</p>
          <Row>
            <Col span={4}>
              <Checkbox>
                <p className='service-numberLevel'>Tăng tự động: </p>
              </Checkbox>
            </Col>
            <Col>
              <InputNumber name='number fist' placeholder='0001' readOnly />
            </Col>
            <Col style={{ marginLeft: '0.5%' }}>
              đến <InputNumber name='number last' placeholder='9999' readOnly />
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={4}>
              <Checkbox onChange={(e) => handlePrefixChange(e.target.checked)}>
                <p className='service-numberLevel'>Prefix:</p>
              </Checkbox>
            </Col>
            <Col>
              <InputNumber name='Prefix' placeholder='0001' readOnly />
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={4}>
              <Checkbox onChange={(e) => handleSurfixChange(e.target.checked)}>
                <p className='service-numberLevel'>Surfix:</p>
              </Checkbox>
            </Col>
            <Col>
              <InputNumber name='Surfix' placeholder='0001' />
            </Col>
          </Row>
          <br />
          <Checkbox>
            <p className='service-numberLevel'>Reset mỗi ngày</p>
          </Checkbox>
        </div>
      </div>
      <div className='service-button'>
        <Button style={{ background: 'var(--orange-orange-50, #FFF2E7)' }} className='addDevice-submit' onClick={(e) => navigate(`/device`)}>
          Hủy bỏ
        </Button>
        <Button className='addDevice-submit' onClick={handleAddService} type='primary' style={{ background: 'var(--orange-orange-400, #ff9138)' }}>
          Tiếp tục
        </Button>
      </div>
    </Content>
  );
};

export default AddService;

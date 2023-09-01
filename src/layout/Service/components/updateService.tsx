import { Button, Checkbox, Col, Form, Input, InputNumber, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import { Content } from 'antd/es/layout/layout';
import '../../../assets/css/service.css';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSevices, updateService } from '../../../redux/slice/service/serviceSlice';
import { Service } from '../../../types/serviceType';
import { History } from '../../../types/historyType';
import { addHistorys } from '../../../redux/slice/Setting/historySlice';
const UpdateSevice = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const services = useSelector((state: RootState) => state.services);
  const id = localStorage.getItem('idService') || '';
  useEffect(() => {
    dispatch(fetchSevices());
  }, [dispatch]);
  const randomStatusOperation = Math.random() < 0.5 ? 'Hoạt động' : 'Ngưng hoạt động';
  const randomStatus = Math.random() < 0.33 ? 'Đã hoàn thành' : Math.random() < 0.66 ? 'Đang thực hiện' : 'Vắng';
  const [updatedService, setUpdatedService] = useState<Service>({
    id: '',
    nameService: '',
    describeService: '',
    statusOperation: `${randomStatusOperation}`,
    numericalOrder: `${randomStatus}`,
    status: '',
  });

  const historys = useSelector((state: RootState) => state.historys);
  const nameHistory = localStorage.getItem('username') || '';
  const [newHistory] = useState<History>({
    username: nameHistory,
    date: new Date(),
    IP: '192.168.3.1',
    action: `Cập nhật dịch vụ ${updatedService?.nameService}`,
    userLogin: '',
    dateLogin: new Date(),
  });

  useEffect(() => {
    const selectedService = services.find((service) => service.id === id);
    if (selectedService) {
      setUpdatedService(selectedService);
      setUpdatedService({ ...selectedService });
    }
  }, [services, id]);

  const handleUpdateService = () => {
    if (updatedService && id) {
      dispatch(updateService(id, updatedService));
      dispatch(addHistorys(newHistory))
        .then(() => {
          navigate('/service');
        })
        .catch((error) => {
          console.error('Error updating :', error);
        });
    }
  };
  const [isPrefixChecked, setIsPrefixChecked] = useState(false);
  const [isSurfixChecked, setIsSurfixChecked] = useState(false);

  const handleInputChange = (field: keyof Service, value: string) => {
    setUpdatedService((prevService) => ({
      ...prevService,
      [field]: value,
    }));
  };
  const generateRandomNumber = () => {
    const min = 1;
    const max = 9999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return String(randomNumber).padStart(4, '0');
  };
  const handlePrefixChange = (checked: boolean) => {
    setIsPrefixChecked(checked);
    if (checked) {
      const prefix = updatedService.id;
      const randomNumericalOrder = generateRandomNumber();
      setUpdatedService((prevService) => ({
        ...prevService,
        numericalOrder: prefix + randomNumericalOrder,
      }));
    } else if (!isSurfixChecked) {
      setUpdatedService((prevService) => ({
        ...prevService,
        numericalOrder: generateRandomNumber(),
      }));
    }
  };

  const handleSurfixChange = (checked: boolean) => {
    setIsSurfixChecked(checked);
    if (checked) {
      const surfix = updatedService.id;
      const randomNumericalOrder = generateRandomNumber();
      setUpdatedService((prevService) => ({
        ...prevService,
        numericalOrder: randomNumericalOrder + surfix,
      }));
    } else if (!isPrefixChecked) {
      setUpdatedService((prevService) => ({
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
              <Form.Item label='Mã dịch vụ:'>
                <Input placeholder='Nhập mã thiết bị' value={updatedService?.id || ''} name='id' onChange={(e) => handleInputChange('id', e.target.value)} />
              </Form.Item>
              <Form.Item label='Tên dịch vụ:'>
                <Input
                  placeholder='Nhập Tên dịch vụ'
                  value={updatedService?.nameService || ''}
                  name='nameService'
                  onChange={(e) => handleInputChange('nameService', e.target.value)}
                />
              </Form.Item>
            </Form>
          </Col>
          <Col span={12} offset={1}>
            <Form layout='vertical'>
              <Form.Item label='Mô tả: ' rules={[{ required: true, message: '' }]}>
                <TextArea
                  placeholder='Mô tả'
                  value={updatedService?.describeService || ''}
                  name='describeService'
                  onChange={(e) => handleInputChange('describeService', e.target.value)}
                  rows={4}
                />
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
        <Button onClick={handleUpdateService} className='addDevice-submit' type='primary' style={{ background: 'var(--orange-orange-400, #ff9138)' }}>
          Tiếp tục
        </Button>
      </div>
    </Content>
  );
};
export default UpdateSevice;

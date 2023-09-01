import React, { useState, useEffect } from 'react';
import { Button, Select, Modal, notification } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Option } from 'antd/es/mentions';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../../redux/store';
import { useDispatch } from 'react-redux';
import { addNumberLevel } from '../../../redux/slice/numberLevel/numberLevelSilce';
import { firestore } from '../../../config/firebaseConfig';
import { History } from '../../../types/historyType';
import { addHistorys } from '../../../redux/slice/Setting/historySlice';

const AddNumberLevel = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [count, setCount] = useState<number>(0);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleModalCancel = () => {
    setShowModal(false);
  };

  const handleModalOk = () => {
    setShowModal(false);
  };
  const source = Math.random() < 0.5 ? 'Hệ thống' : 'Kiosk';
  const status = Math.random() < 0.33 ? 'Đang chờ' : Math.random() < 0.66 ? 'Đã sử dụng' : 'Bỏ qua';

  const nameHistory = localStorage.getItem('username') || '';
  const [newHistory] = useState<History>({
    username: nameHistory,
    date: new Date(),
    IP: '192.168.3.1',
    action: `Thêm cấp số mới`,
    userLogin: '',
    dateLogin: '',
  });

  const handleAllocateNumber = async () => {
    const messageConfig = {
      warning: { message: 'Cảnh báo', description: '' },
    };
    const numberLevelsRef = firestore.collection('NumberLevel');
    const querySnapshot = await numberLevelsRef.orderBy('issuanceDate', 'desc').limit(1).get();

    let newNumber = 1;

    if (!querySnapshot.empty) {
      const lastNumberLevel = querySnapshot.docs[0].data();
      const lastIssuanceDate = lastNumberLevel.issuanceDate.toDate();
      const currentDate = new Date();
      if (
        currentDate.getFullYear() === lastIssuanceDate.getFullYear() &&
        currentDate.getMonth() === lastIssuanceDate.getMonth() &&
        currentDate.getDate() === lastIssuanceDate.getDate()
      ) {
        newNumber = lastNumberLevel.numberOrder + 1;
      }
    }

    const newNumberLevel = {
      id: newNumber.toString(),
      numberOrder: newNumber,
      service: selectedService || '',
      issuanceDate: currentDate,
      expiryDate: getEndOfDay(currentDate),
      customer: 'Đỗ Xuân Hoàng',
      status: status,
      source: source,
      email: 'hoangdx@gmail.com',
    };

    if (!newNumberLevel.service) {
      messageConfig.warning.description = 'Vui lòng chọn dịch vụ cần in số';
    } else {
      setCount(newNumber);
      setShowModal(true);
      await dispatch(addNumberLevel(newNumberLevel));
      await dispatch(addHistorys(newHistory));
    }

    if (messageConfig.warning.description) {
      notification['warning'](messageConfig.warning);
    }
  };

  const getEndOfDay = (date: Date) => {
    const endOfDay = new Date(date);
    endOfDay.setHours(17, 0, 0, 0);
    return endOfDay;
  };
  const formatDateTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString(undefined, options);
  };
  return (
    <Content className=''>
      <div>
        <p className='device-text-header'>Quản lý cấp số</p>
      </div>
      <div className='add-number_level'>
        <h1 className='number_level-header'>Cấp số mới</h1>
        <p className='number_level-header-span'>Dịch vụ khách hàng lựa chọn</p>
        <Select size='large' style={{ width: '30%' }} onChange={(value) => setSelectedService(value)}>
          <Option value='Khám tim mạch'>Khám tim mạch</Option>
          <Option value='Khám sản - Phụ khoa'>Khám sản - Phụ khoa</Option>
          <Option value='Khám răng hàm mặt'>Khám răng hàm mặt</Option>
          <Option value='Khám tai mũi họng'>Khám tai mũi họng</Option>
        </Select>
        <div style={{ marginTop: '5%' }}>
          <Button style={{ background: 'var(--orange-orange-50, #FFF2E7)' }} className='addDevice-submit' onClick={(e) => navigate(`/number_level`)}>
            Hủy bỏ
          </Button>
          <Button className='addDevice-submit' type='primary' style={{ background: 'var(--orange-orange-400, #ff9138)' }} onClick={handleAllocateNumber}>
            In số
          </Button>
        </div>
      </div>
      <Modal className='numbel_level-add-model' visible={showModal} onOk={handleModalOk} onCancel={handleModalCancel} footer={null}>
        <h1 className='numbel_level-add-model-title' style={{ fontSize: '30px' }}>
          Số thứ tự được cấp
        </h1>
        <h1 className='numbel_level-add-model-numerical_order'>{count}</h1>
        <p className='numbel_level-add-model-service' style={{ fontSize: '16px' }}>
          DV: {selectedService} <b>(tại quầy số 1)</b>
        </p>
        <div className='numbel_level-add-model-date'>
          <p className=''>Thời gian cấp: {formatDateTime(currentDate)}</p>
          <p>Hạn sử dụng: {formatDateTime(getEndOfDay(currentDate))}</p>
        </div>
      </Modal>
    </Content>
  );
};

export default AddNumberLevel;

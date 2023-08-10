import React, { useEffect } from 'react';
import { Header } from 'antd/es/layout/layout';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { setUser } from '../../redux/slice/login/loginSlice';
import { Col, Image, Row } from 'antd';
import bell from '../../assets/icon/bell.svg';
const HeaderPage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    // Lấy thông tin người dùng từ Local Storage khi component được render
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      dispatch(setUser(userData));
    }
  }, [dispatch]);

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }
  return (
    <Header className='header' style={{ backgroundColor: 'white' }}>
      <Row>
        <Col span={19}>
          <h3 style={{ textAlign: 'start' }}>Thông Tin Cá Nhân</h3>
        </Col>
        <Col span={1}>
          <Image className='header-images' src={bell} />
        </Col>
        <Col span={4}>
          <Image width={50} className='header-images' src={user.avata} />
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderPage;

import React from 'react';
import { Button, Col, Form, Image, Input, Layout, Row } from 'antd';
import '../../../assets/css/login.css';
import logo from '../../../assets/images/Logo alta.png';
import coverPhoto from '../../../assets/images/Frame.png';
const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
type FieldType = {
  email?: string;
};
const ForgotPassword: React.FC = () => (
  <Layout hasSider style={{ height: '100vh', width: '100%' }}>
    <Row>
      <Col className='login-slider'>
        <Image className='login-slider-img' src={logo} />
        <Form className='login-slider-form' layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <h2 className='login-slider-title'>Đặt Lại Mật Khẩu</h2>
          <Form.Item<FieldType>
            className='login-slider-form-item'
            label='Vui lòng nhập email để đặt lại mật khẩu của bạn'
            name='email'
            rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input />
          </Form.Item>
          <br />
          <Form.Item>
            <Button className='login-slider-form-submit'>Hủy</Button>
            <Button className='login-slider-form-submit' type='primary' htmlType='submit' style={{ background: 'var(--orange-orange-400, #ff9138)' }}>
              Tiếp tục
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col className='login-content'>
        <Col className='login-content'>
          <div className='login-content-content'>
            <img className='login-content-image' src={coverPhoto} alt='' />
          </div>
        </Col>
      </Col>
    </Row>
  </Layout>
);

export default ForgotPassword;

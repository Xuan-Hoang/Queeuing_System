import React from 'react';
import { Button, Col, Form, Image, Input, Layout, Row } from 'antd';
import '../../../assets/css/login.css';
import { NavLink } from 'react-router-dom';
import logo from '../../../assets/images/Logo alta.png';
const onFinish = (values: any) => {
  console.log('Success:', values);
};

type FieldType = {
  password?: string;
  re_password?: string;
};
const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
const ResetPassword: React.FC = () => (
  <Layout hasSider style={{ height: '100vh', width: '100%' }}>
    <Row>
      <Col className='login-slider'>
        <Image className='login-slider-img' src={logo} />
        <Form className='login-slider-form' layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item<FieldType> className='login-slider-form-item' label='Mật khẩu' name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            className='login-slider-form-item'
            label='Nhập lại mật khẩu'
            name='re_password'
            rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item className='login-slider-form-item'>
            <p className='forgot-password-link'></p>
            <NavLink to='/#' className='forgot-password-link'>
              Quên mật khẩu?
            </NavLink>
          </Form.Item>
          <Form.Item>
            <Button className='login-slider-form-submit' type='primary' htmlType='submit'>
              Xác Nhận
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col className='login-content'></Col>
    </Row>
  </Layout>
);

export default ResetPassword;

import { AppDispatch } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogoData, selectLogo } from '../redux/slice/logo/logoSlice';
import { Image } from 'antd';
import React, { useEffect } from 'react';

const Login2: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const logo = useSelector(selectLogo);
  useEffect(() => {
    dispatch(fetchLogoData());
  }, [dispatch]);

  return (
    <>
      <Image className='login-slider-img' src={logo.logo} />
      <Image className='login-slider-img' src={logo.logo} />
    </>
  );
};

export default Login2;

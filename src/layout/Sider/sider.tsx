import { Button, Layout, Menu } from 'antd';
import '../../assets/css/sider.css';
import logo from '../../assets/images/Logo alta.png';
import dashboard from '../../assets/icon/dashboard.svg';
import device from '../../assets/icon/device.svg';
import service from '../../assets/icon/service.svg';
import number_level from '../../assets/icon/number_level.svg';
import report from '../../assets/icon/report.svg';
import setting from '../../assets/icon/setting.svg';
import logout from '../../assets/icon/logout.svg';
import { Link, useNavigate } from 'react-router-dom';
const { Sider } = Layout;
const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#FFFFFF',
};
const SiderPage = () => {
  const navigate = useNavigate();
  return (
    <Sider style={siderStyle}>
      <img className='sider-logo' src={logo} alt='' />
      <Menu
        className='sider-menu'
        defaultSelectedKeys={['0']}
        items={[
          {
            key: '0',
            icon: <img src={dashboard} alt='' />,
            label: <Link to='/home/dashboard'>Dashboard</Link>,
          },
          {
            key: '1',
            icon: <img src={device} alt='' />,
            label: <Link to='/home/device'>Thiết Bị</Link>,
          },
          {
            key: '2',
            icon: <img src={service} alt='' />,
            label: <Link to='/home/service'>Dịch vụ</Link>,
          },
          {
            key: '3',
            icon: <img src={number_level} alt='' />,
            label: <Link to='/home/number_level'>Cấp Số</Link>,
          },
          {
            key: '4',
            icon: <img src={report} alt='' />,
            label: <Link to='/home/report'>Báo Cáo</Link>,
          },
          {
            key: '5',
            icon: <img src={setting} alt='' />,
            label: <Link to='/home/setting'>Cài đặt hệ thống</Link>,
          },
        ]}
      />
      <Button className='sider-button' onClick={() => navigate(`/login`)}>
        <img className='sider-button-image' src={logout} alt='' />
        Đăng Xuất
      </Button>
    </Sider>
  );
};

export default SiderPage;

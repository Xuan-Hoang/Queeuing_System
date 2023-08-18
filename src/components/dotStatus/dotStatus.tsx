import React from 'react';

interface MyIconProps {
  status: string;
}

const DotStatus: React.FC<MyIconProps> = ({ status }) => {
  let iconColor = '#34CD26';

  if (status === 'Ngưng hoạt động' || status === 'Mất kết nối') {
    iconColor = '#EC3740';
  }

  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='8' height='9' viewBox='0 0 8 9' fill='none'>
      <circle cx='4' cy='4.5' r='4' fill={iconColor} />
    </svg>
  );
};

export default DotStatus;

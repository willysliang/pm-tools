/**
 * @ Author: willysliang
 * @ CreateTime: 2024-06-21 22:06:05
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-06-22 11:24:10
 * @ Description: 404 系统页
 */

import React from 'react';
import systemNotfound from '@assets/common/system-not-found.png';
import systemNotfoundCloud from '@assets/common/system-not-found-cloud.png';
import './NotFound.scss';

const NotFound: React.FC = () => {
  return (
    <div className='w-full h-full relative inset not-found'>
      <img
        src={systemNotfound}
        alt='404'
        style={{ maxWidth: '90%', maxHeight: '90%' }}
        className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'
      />
      <img src={systemNotfoundCloud} alt='404动画图' className='not-found-animation animation1' />
      <img src={systemNotfoundCloud} alt='404动画图' className='not-found-animation animation2' />
      <img src={systemNotfoundCloud} alt='404动画图' className='not-found-animation animation3' />
    </div>
  );
};

export default NotFound;

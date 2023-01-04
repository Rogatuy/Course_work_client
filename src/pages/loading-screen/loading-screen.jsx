import React from 'react';
import './loading-screen.scss';

const LoadingScreen = () => {
  return (
    <div className='wrapper'>
      <p className="text-secondary">Данные загружаются. Пожалуйста, подождите или перезагрузите страницу</p>
      <div className="dualRing border-primary"></div>
    </div>
  );
}

export default LoadingScreen;

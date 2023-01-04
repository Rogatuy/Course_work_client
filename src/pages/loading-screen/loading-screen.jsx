import React from 'react';
import './loading-screen.scss';

const LoadingScreen = () => {
  return (
    <div className='wrapper'>
      <p className="text-secondary">Loading data, please wait or try reloading the page.</p>
      <div className="dualRing border-primary"></div>
    </div>
  );
}

export default LoadingScreen;

import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="text-white text-xl">Creating Playlist...</div>
    </div>
  );
};

export default LoadingScreen;

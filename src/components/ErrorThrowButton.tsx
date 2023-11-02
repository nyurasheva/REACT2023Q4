import React, { useState } from 'react';

const ErrorThrowButton: React.FC = () => {
  const [shouldThrow, setShouldThrow] = useState(false);

  const throwError = () => {
    throw new Error('This is a test error!');
  };

  return (
    <div>
      <button className="button" onClick={() => setShouldThrow(true)}>
        Выбросить ошибку
      </button>
      {shouldThrow && <div>{throwError()}</div>}
    </div>
  );
};

export default ErrorThrowButton;

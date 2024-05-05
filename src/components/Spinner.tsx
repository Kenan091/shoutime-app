import { FC } from 'react';

interface SpinnerProps {
  width: number;
  height: number;
}

const Spinner: FC<SpinnerProps> = ({ width, height }) => {
  return (
    <div className='loadingSpinnerContainer'>
      <div
        className='loadingSpinner'
        style={{ width: width, height: height }}></div>
    </div>
  );
};

export default Spinner;

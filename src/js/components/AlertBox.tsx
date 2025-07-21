import React from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { RootState } from '../store';

const AlertBox: React.FC = () => {
  const weatherReport = useSelector((state: RootState) => state.weatherReport);
  const { alertText, status, alertStyle } = weatherReport;

  if (alertText === '') return null;

  return (
    <div className={`alert alert-${alertStyle}`}>
      <h4>
        {status === 'loading' && <span className="spinner-border spinner-border-sm" />}
        &nbsp;{alertText}
      </h4>
    </div>
  );
};

export default AlertBox;

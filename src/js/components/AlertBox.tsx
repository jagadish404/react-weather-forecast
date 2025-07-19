import React from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { RootState } from '../store';

const AlertBox: React.FC = () => {
  const weatherReport = useSelector((state: RootState) => state.weatherReport);
  const { alertText, showSpinner, alertStyle, showAlert } = weatherReport;

  if (!showAlert) return null;

  return (
    <Alert variant={alertStyle}>
      <h4>
        {showSpinner && <span className="spinner-border spinner-border-sm" />}
        &nbsp;{alertText}
      </h4>
    </Alert>
  );
};

export default AlertBox;

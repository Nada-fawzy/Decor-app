import * as React from 'react';
import Spinner from 'react-bootstrap/Spinner';
export default function SimpleBackdrop() {
  return (
    <div>
      {/* <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner> */}
    <div className="d-flex justify-content-center vh-100 align-items-center ">
            <div className="spinner-grow mx-1" style={{ width: '3rem', height: '3rem' }} role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow mx-1" style={{ width: '3rem', height: '3rem' }} role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow mx-1" style={{ width: '3rem', height: '3rem' }} role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
    </div>
  );
}

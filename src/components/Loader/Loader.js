import React from 'react';

import './styles.css';
import { CircularProgress } from '@material-ui/core';

const Loader = (props) => {
  return (
    <div className="loader-container loader" {...props}>
      {/* <h3 className="loader-content">Loading..</h3> */}
      <CircularProgress/>
    </div>
  );
};

export default Loader;

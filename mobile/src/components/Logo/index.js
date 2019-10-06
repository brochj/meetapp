import React from 'react';
import PropTypes from 'prop-types';

import { M } from './styles';

export default function Logo({ size }) {
  return <M size={size}>M</M>;
}

Logo.defaultProps = {
  size: 70,
};

Logo.propTypes = {
  size: PropTypes.number,
};

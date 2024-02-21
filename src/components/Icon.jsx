// Inside your Icon.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import * as Icons from '@fortawesome/free-solid-svg-icons';

const Icon = ({ iconName }) => {
  const icon = Icons[iconName] ? Icons[iconName] : Icons.faQuestionCircle;
  return <FontAwesomeIcon icon={icon} style={{ color: 'white' }} />;
};

export default Icon;

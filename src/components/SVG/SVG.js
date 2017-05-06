import React from 'react';
import PropTypes from 'prop-types';

const SVG = ({ file, name, events }) => (
  <div className={name} dangerouslySetInnerHTML={{__html: file}} {...events} />
);

SVG.propTypes = {
  file: PropTypes.string.isRequired,
  name: PropTypes.string,
  events: PropTypes.object
};

export default SVG;

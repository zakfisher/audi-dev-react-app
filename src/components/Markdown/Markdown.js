import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import './Markdown.sass';

const Markdown = ({content}) => (<div
  className="Markdown"
  dangerouslySetInnerHTML={{
  __html: marked(content)
}}/>);

Markdown.propTypes = {
  content: PropTypes.string.isRequired
};

export default Markdown;

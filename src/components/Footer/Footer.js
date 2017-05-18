import React from 'react';
import './Footer.sass';

const Footer = ({user}) => user ? <footer className="Footer"/> : null;

export default Footer;

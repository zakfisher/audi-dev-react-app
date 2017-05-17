import React from 'react';
import './Sidebar.sass';
import { getPreviewHiddenString } from '../../helpers/preview';

const Sidebar = ({ children }) => <div className={'Sidebar' + getPreviewHiddenString()}>{children}</div>;

export default Sidebar;

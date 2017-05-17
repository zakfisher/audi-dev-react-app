import React, { Component } from 'react';
import ComponentDoc from '../../components/ComponentDoc/ComponentDoc';
import COMPONENTS from '../../app/components';

import './ComponentDocsList.sass';

const ComponentDocsList = () => (
    <div className="ComponentDocsList">
        {Object.keys(COMPONENTS).map((componentId, i) => {
        return <ComponentDoc componentId={componentId} key={i}/>
        })}
    </div>
);
export default ComponentDocsList;
import React, { Component } from 'react';
import ComponentDoc from '../../components/ComponentDoc/ComponentDoc';
import COMPONENTS from '../../app/components';

import './ComponentDocsList.sass';

class ComponentDocsList extends Component {
    
    render(){
        return (
            <div className="ComponentDocsList">
              {Object.keys(COMPONENTS).map((componentId, i) => {
                return <ComponentDoc componentId={componentId} key={i}/>
              })}
            </div>
        )
    }
}

export default ComponentDocsList;
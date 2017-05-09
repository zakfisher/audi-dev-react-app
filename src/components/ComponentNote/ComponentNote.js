import React, { Component } from 'react';
import DOCS from '../../audi/components/docs.index';
import Markdown from '../Markdown/Markdown';

class ComponentNote extends Component {

    constructor(props){
        super();
    }

    render(){
        let docs = DOCS;
        let propRows;
        let propList = docs[this.props.componentId]["props"];

        if (propList){
            propRows = Object.keys(propList).map( (prop, i)=>(
                <tr key={i}>
                    <td className="blue">{propList[prop]["name"]}</td>
                    <td className="red">{propList[prop]["type"]}</td>
                    <td>{propList[prop]["default"]}</td>
                    <td>{propList[prop]["description"]}</td>
                </tr>
            ))
        }

        return (
            <section id={this.props.componentId}>
                <h2>{this.props.componentId}</h2>
                <hr/>
                <p>{docs[this.props.componentId]["description"]}</p>
                <div className="component-container">
                <h2>{this.props.componentId + " example"}</h2>
                <div id="component-display">
                    {docs[this.props.componentId]["example"]}
                </div>
                </div>
                <h2>{"Properties"}</h2>
                <table>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Default</th>
                    <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {propRows}
                </tbody>
                </table>
                <br/>
                <h2>{"Documentation"}</h2>
                    <Markdown content={docs[this.props.componentId]["documentation"]}/>
                <hr/>
            </section>
        )
    }

}

export default ComponentNote;
import React, { Component } from 'react';
import DOCS from '../../audi/components/docs.index';
import Markdown from '../Markdown/Markdown';

class ComponentNote extends Component {

    constructor(props){
        super();
    }

    render(){
        let docs = DOCS;
        let propRows, description, propList, example, documentation;
        try{
            propList = docs[this.props.componentId]["props"];

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

            description = docs[this.props.componentId]["description"];
            example = docs[this.props.componentId]["example"];
            documentation = docs[this.props.componentId]["documentation"];

        }
        catch (err){
            console.log(err)
        }

        return (
            <section id={this.props.componentId}>
                <h2>{this.props.componentId}</h2>
                <hr/>
                <p>{description}</p>
                <div className="component-container">
                <h3>{this.props.componentId + " example"}</h3>
                <div id="component-display">
                    {example}
                </div>
                </div>
                <h3>{"Properties"}</h3>
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
                <h3>{"Documentation"}</h3>
                    <Markdown content={documentation || ""}/>
            </section>
        )
    }

}

export default ComponentNote;
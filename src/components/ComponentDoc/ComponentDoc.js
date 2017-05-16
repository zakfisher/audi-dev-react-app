import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DOCS from '../../app/docs';
import Markdown from '../Markdown/Markdown';

class ComponentDoc extends Component {

    constructor(props){
        super();
    }

    render(){
        let propRows, description, propList, example, documentation;
        let componentId = this.props.componentId;
        let component = DOCS[componentId];
        try{
            propList = component["props"];

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

            description = component["description"];
            example = component["example"];
            documentation = component["documentation"];

        }
        catch (err){
            if (!component) console.log("Missing all documentation for " + componentId);
            else console.log(err);
        }

        return (
            <section id={componentId}>
                <h2><Link to={`/component/${componentId}`}>{componentId}</Link></h2>
                <hr/>
                <p>{description}</p>
                <div className="component-container">
                <h3>{componentId + " example"}</h3>
                <div id="component-display">
                    {example}
                </div>
                </div>
                <h3>{"Properties"}</h3>
                <table>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>PropType</th>
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

export default ComponentDoc;

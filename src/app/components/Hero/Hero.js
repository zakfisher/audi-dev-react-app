import React, { Component } from 'react';
import './Hero.sass';

class Hero extends Component {
    constructor(props){
        super();
    }

    static defaultProps = {
        source: 'https://firebasestorage.googleapis.com/v0/b/audi-fe-notes.appspot.com/o/uploads%2Fpackage.jpeg?alt=media&token=963ef745-f867-4de4-bd1f-1df269ed0d4f'
    };

    render(){
        return (
            <div className="hero-div">
                <img id={this.props.id} className={this.props.className} src={this.props.source} alt="#"/>
            </div>
        )
    }
}

export default Hero

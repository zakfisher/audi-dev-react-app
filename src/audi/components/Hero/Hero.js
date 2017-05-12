import React, { Component } from 'react';
import './Hero.sass';

class Hero extends Component {
    constructor(props){
        super();
    }

    render(){
        return (
            <div className="hero-div">
                <img id={this.props.id} className={this.props.className} src={this.props.source} alt="#"/>
            </div>
        )
    }
}

export default Hero
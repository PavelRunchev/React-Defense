import React, { Component } from 'react';
import './Footer.css';

export default class Footer extends Component {
    constructor(props){
        super(props);

        this.state = {
            date: new Date()
        }
    }

    componentDidMount() {
        setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval();
    }

    tick() {
        this.setState({date: new Date()});
    }


    render() {
        return (
            <footer>
                <div className="App-timer">  
                    <strong className="App-time">Live Time: {this.state.date.toLocaleTimeString()}</strong>
                </div>
                <p>Copyright 2018 RAIDERS Team - All Right Reserved!</p>
            </footer>
        )
       
    }
}
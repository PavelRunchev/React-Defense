import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import './HomePage.css';

export default class HomePage extends Component {
  

    componentDidMount() {
        
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.page !== this.props.match.params.page) {
        
            this.getData(Number(nextProps.match.params.page));
        }
    }

    render() {
        return (
            <div className="home">
                <div className="title">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0-86V7A53QeA0zllXRWPolxMHdQv9feaLMJOUZm1WDaZUArKvKQ" alt="logo" height="157"/>
                    <h1>WELCOME</h1>
                    <h1>to</h1>
                    <h1>Free Gems Catalog</h1>
                   
                </div>
                <img src="https://st2.depositphotos.com/1496387/11352/v/950/depositphotos_113525160-stock-illustration-vintage-jewelry-with-gems-jewellery.jpg" alt="" width/>
                <h1>Welcome to gems experience...</h1>
                <p>Authenticated users only!</p><br/>
                <p>There is a section with list gems where you can take the stones that you like.</p><br/>
                <p>Choose your type of gems and you will have the ability to upgrade (Jewel) them to three equal types of one type. </p>
                <p>If the upgrades are successful, they automatically go to your section and to the public for Jewels.</p>
                <p>There you can give all Jewels posts and ratings ... Entertain yourself.</p>
            </div>
        );
    }
}
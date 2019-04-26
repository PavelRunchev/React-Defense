import React from 'react';
import './SpecialThanks.scss';

export default class SpecialThanks extends React.Component {
    render () {
        return(
            <div className="container-fluid special-thanks">
                <h2>Special Thanks</h2>
                <div className="inner-special-thanks">
                    <div className="box">
                        <p>lector: <span>Ivaylo Kenov</span></p>
                        <p>lektor: <span>Viktor Kostadinov</span></p>
                        <p>lektor: <span>William Abboud</span></p>
                        <p>lektor: <span>Kiril Kirilov</span></p>
                    </div>
                </div>
            </div>
        );
    }
}
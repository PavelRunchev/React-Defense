import React, { Fragment } from 'react';
import './FormMyGem.scss';

const FormMyGem = (props) => {
    return (
        <Fragment>
            {props.handler.length === 0 ? '' : 
                <div className="myGems-form">
                    <form onSubmit={props.handler[0]}>
                        <p className="font-weight-bold">Select Gems by Name!</p>
                        <div className="form-group">
                            <select name="gemName" onChange={props.handler[1]} className="form-control gem-name">
                                <option>Amethyst</option>
                                <option>Diamond</option>
                                <option>Emerald</option>
                                <option>Ruby</option>                          
                                <option>Sapphire</option>
                                <option>Topaz</option>
                            </select>
                            <button type="submit" className="gems">Gems</button>
                        </div>
                    </form> 
                </div>
            }
        </Fragment>
    );
};

export default FormMyGem;
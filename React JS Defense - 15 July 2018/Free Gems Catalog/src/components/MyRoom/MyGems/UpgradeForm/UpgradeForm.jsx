import React, { Fragment } from 'react';
import './UpgradeForm.scss';

const UpgradeForm = (props) => {

    return (
        <Fragment>
            {props.handler.length === 0 ? '' : 
                <section className="upgrade-form">
                    <h3 className="text-center font-weight-bold">Upgrade Section!</h3>
                    <h4 className="text-center font-weight-bold">For upgrade you needed 3 gems from one type (set)!</h4>
                    <form onSubmit={props.handler[0]}>                     
                        <div className="form-group">
                            <select name="upgradeSet" onChange={props.handler[1]} className="form-control upgradeSet">
                                <option>Ring</option>
                                <option>Pendant</option>
                                <option>Bracelet</option>
                            </select>
                            <button type="submit" className="gems-upgrade-btn">Upgrade</button>
                        </div>
                    </form> 
                    {props.myJewels.length === 0 ? '' : <h4>You is created {props.myJewels.length} Jewels!</h4>}
                </section>
            }
        </Fragment>
    );
};

export default UpgradeForm;
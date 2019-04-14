import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import DateConvertor from  '../../../utils/DateConvertor';

const User = (props) => {
    const user = props.props;

    return (
        <tr className={user.index % 2 === 0 ? 'table-info' : 'table-active'}>
            <td>{user.index}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{DateConvertor(user._kmd.ect)}</td>
            <td>{user._kmd.roles === undefined ? 'User' : 'Admin'}</td>           
            <td>
                <Link className="edit-user" to={`/adminOptions/edit-user/${user._id}`}>Edit</Link>
                <button onClick={(e) => props.handler(e, user._id)} id="delete-user">Delete</button>
            </td>
        </tr>
    );
};

export default withRouter(User);
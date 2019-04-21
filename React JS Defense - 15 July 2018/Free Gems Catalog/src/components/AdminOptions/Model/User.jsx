import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import DateConvertor from  '../../../utils/DateConvertor';
import auth from '../../../utils/Auth';

const User = (props) => {
    const user = props.props;
    const colorForUser = { color: 'lightgreen' };
    const colorForAdmin = { color: 'goldenrod'};
    const colorForModerator = { color: '#88D4F1'};
    return (
        <tr className={user.index % 2 === 0 ? 'table-info' : 'table-active'}>
            <td>{user.index}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{DateConvertor(user._kmd.ect)}</td>
            {user._kmd.roles === undefined ? <td style={colorForUser}>User</td> :
                user._kmd.roles[0]['roleId'] === auth.adminId ? 
                    <td style={colorForAdmin}>Admin</td> : <td style={colorForModerator}>Moderator</td>}          
            <td>
                <Link className="info-user" to={`/adminOptions/info-user/${user._id}`}>Info</Link>
                <button onClick={(e) => props.handler(e, user._id)} className="delete-user">Delete</button>
            </td>
        </tr>
    );
};

export default withRouter(User);
import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ReqHandler from '../../utils/ReqHandler';
import toastr from 'toastr';

class DeleteComment extends Component {
    componentDidMount() {
        let commentId = this.props.match.params.id;
        ReqHandler.deleteComment(commentId).then(() => {
            toastr.success('Deleted comment successful');
            this.props.history.push('/upgradedJewels');
        }).catch(err => console.log(err.message));
    }

    render () {
        return (
            ''
        );
    }
}

export default withRouter(DeleteComment);
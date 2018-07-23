import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ReqHandler from '../../utils/ReqHandler';
import toastr from 'toastr';

class DeleteGem extends Component {
    componentDidMount() {
        let gemId = this.props.match.params.id;
        ReqHandler.deleteGem(gemId).then(() => {
            toastr.success('Deleted gem successful');
            this.props.history.push('/listGems');
        }).catch(err => console.log(err.message));
    }

    render () {
        return (
            ''
        );
    }
}

export default withRouter(DeleteGem);
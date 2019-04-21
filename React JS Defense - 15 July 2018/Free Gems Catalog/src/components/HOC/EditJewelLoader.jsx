import React from 'react';
import Loading from '../Loading/Loading';
import RequestPublicJewels from '../../utils/RequestPublicJewels';
import RequestJewels from '../../utils/RequestJewels';
import toastr from 'toastr';
import swal from 'sweetalert';

export default function EditJewelLoader(WrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                jewel: {},
                ready: false,
                name: '',
                rating: 0,
                imageUrl: '',
                gems: '',
                type: '',
                owner: ''
            };

            this.onChangeHandler = this.onChangeHandler.bind(this);
            this.onSubmit = this.onSubmit.bind(this);
            this.onDelete = this.onDelete.bind(this);
        }

        async componentDidMount() {
            if(this.props.match.path === '/publicJewels/publicJewelEdit/:id') {
                try{
                    const id = this.props.match.params.id;
                    const jewel = await RequestPublicJewels.getJewelById(id);                   
                    if(jewel.error === 'InvalidCredentials') {
                        return toastr.error('This operation is denied, invalid credentils! Please, sign in system for access!');
                    }
    
                    this.setState({ ready: true, jewel });
                }catch(error) { console.log(error.message); }
            } else if(this.props.match.path === '/jewels/editJewel/:id') {
                try {
                    const id = this.props.match.params.id;
                    const jewel = await RequestJewels.getJewelById(id);
                    if(jewel.error) {
                        return toastr.error('This operation is denied, invalid credentils! Please, sign in system for access!');
                    }

                    this.setState({ ready: true, jewel });
                }catch(error) { console.log(error.message); }
            } 
        }

        onChangeHandler(e) { 
            e.target.rating ? this.setState({ [e.target.name]: Number(e.target.value) }) 
                : this.setState({ [e.target.name]: e.target.value });
        }

        async onSubmit(e) {
            e.preventDefault();

            const { jewel } = this.state;
            const jewelId = jewel._id;
            const name = this.state.name || jewel.name;
            const gems = this.state.gems || jewel.gems;
            const type = this.state.type || jewel.type;
            const imageUrl = this.state.imageUrl || jewel.imageUrl;
            const owner = this.state.owner || jewel.owner;
            const rating = this.state.rating || jewel.raiting;

            /*
            / Name verification
            */
            if(name === '' || name === undefined || name === null) {
                return toastr.warning('Name cannot must be empty!');
            }

            if(!name.match('^[A-Za-z ]+$')) {
                return toastr.warning('Name must be contains only letters!');
            }
            //Compare first letter is uppercase!
            if(name[0] !== name[0].toUpperCase()) {
                return toastr.warning('First letter must be Capital!');
            }

            /*
            / Type verification
            */
            if(type === '' || type === undefined || type === null) {
                return toastr.warning('Type cannot must be empty!');
            }

            if(!type.match('^[A-Za-z]+$')) {
                return toastr.warning('Type must be contains only letters!');
            }

            //Compare first letter is uppercase!
            if(type[0] !== type[0].toUpperCase()) {
                return toastr.warning('Type start with a capital letter!');
            }

            /*
            / Gems verification
            */
            if(gems === '' || gems === undefined || gems === null) {
                return toastr.warning('Gems cannot must be empty!');
            }

            if(!gems.match('^[A-Za-z]+$')) {
                return toastr.warning('Gems must be contains only letters!');
            }
            //Compare first letter is uppercase!
            if(gems[0] !== gems[0].toUpperCase()) {
                return toastr.warning('First letter must be Capital!');
            }

            /*
            / ImageUrl verification
            */
            if(imageUrl === '' || imageUrl === undefined || imageUrl === null) {
                return toastr.warning('ImageUrl cannot be empty!');
            }

            if(!imageUrl.match('^(http://www.|https://www.|http://|https://)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$')) {
                return toastr.warning('ImageUrl must be valid URL link!');
            }

            /*
            / Owner verification
            */
            if(owner === '') {
                return toastr.warning('Owner cannot must be empty!');
            }

            if(!gems.match('^[A-Za-z0-9-_]+$')) {
                return toastr.warning('Owner must be contains only letters, digits and dashes!');
            }

            /*
            / Rating verification
            */
            if(Number(rating) < 0) {
                return toastr.warning('Weight must be positive number!');
            }

            let editJewel = {};
            if(owner === undefined && rating === undefined) {
                editJewel = { name, gems, type, imageUrl };
                if(jewelId !== undefined) {
                    try{
                        const res = await RequestJewels.editJewel(jewelId, editJewel);
                        if(res.error) {
                            return toastr.error('This operation is denied, invalid credentils! Please, sign in system for access!');
                        }
    
                        toastr.success('The public jewel is edited Successful!');
                        this.props.history.push('/jewels/allJewels/listFromJewels');            
                    }catch(error) { console.log(error.message); }
                }        
            } else {
                editJewel = { name, gems, type, imageUrl, owner, raiting: rating };
                if(jewelId !== undefined) {
                    try{
                        const res = await RequestPublicJewels.editPublicJewel(jewelId, editJewel);
                        if(res.error) {
                            return toastr.error('Invalid Credential!You Login!');
                        }
    
                        toastr.success('The public jewel is edited Successful!');
                        this.props.history.push(`/publicJewels/publicJewelDetails/${jewelId}`);                  
                    }catch(error) { console.log(error.message); }
                }        
            }
        }

        async onDelete(e) {
            e.preventDefault();
            const jewelId = this.props.match.params.id;

            if(jewelId !== undefined) {
                const willDelete = await swal({
                    title: 'Are you sure want to delete the Jewel?',
                    text: 'It will be deleted permanently from base?',
                    icon: 'warning',
                    dangerMode: true,
                    showCancelButton: true,
                });
                if (willDelete) {
                    try {
                        const res = await RequestJewels.removeJewel(jewelId);
                        if(res.error) {
                            return toastr.error('This operation is denied, invalid credentils! Please, sign in system for access!');
                        }
    
                        toastr.success('Your jewel is deleted successful!');
                        swal({ title: 'Your jewel is deleted successful!', icon: 'success' });
                        this.props.history.push('/jewels/allJewels/listFromJewels');
                    }catch(error) { console.log(error.message); }
                }                   
            }
        }

        render() {
            const { jewel } = this.state;

            if(this.state.ready) {
                return <WrappedComponent {...this.props} data={jewel} handler={[this.onChangeHandler, this.onSubmit, this.onDelete]}/>;
            }

            return <Loading/>;
        }
    };
}
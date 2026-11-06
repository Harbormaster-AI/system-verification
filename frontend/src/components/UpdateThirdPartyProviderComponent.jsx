import React, { Component } from 'react'
import ThirdPartyProviderService from '../services/ThirdPartyProviderService';

class UpdateThirdPartyProviderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                name: '',
                registrationId: '',
                website: ''
        }
        this.updateThirdPartyProvider = this.updateThirdPartyProvider.bind(this);

        this.changenameHandler = this.changenameHandler.bind(this);
        this.changeregistrationIdHandler = this.changeregistrationIdHandler.bind(this);
        this.changewebsiteHandler = this.changewebsiteHandler.bind(this);
    }

    componentDidMount(){
        ThirdPartyProviderService.getThirdPartyProviderById(this.state.id).then( (res) =>{
            let thirdPartyProvider = res.data;
            this.setState({
                name: thirdPartyProvider.name,
                registrationId: thirdPartyProvider.registrationId,
                website: thirdPartyProvider.website
            });
        });
    }

    updateThirdPartyProvider = (e) => {
        e.preventDefault();
        let thirdPartyProvider = {
            thirdPartyProviderId: this.state.id,
            name: this.state.name,
            registrationId: this.state.registrationId,
            website: this.state.website
        };
        console.log('thirdPartyProvider => ' + JSON.stringify(thirdPartyProvider));
        console.log('id => ' + JSON.stringify(this.state.id));
        ThirdPartyProviderService.updateThirdPartyProvider(thirdPartyProvider).then( res => {
            this.props.history.push('/thirdPartyProviders');
        });
    }

    changenameHandler= (event) => {
        this.setState({name: event.target.value});
    }
    changeregistrationIdHandler= (event) => {
        this.setState({registrationId: event.target.value});
    }
    changewebsiteHandler= (event) => {
        this.setState({website: event.target.value});
    }

    cancel(){
        this.props.history.push('/thirdPartyProviders');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update ThirdPartyProvider</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> name: </label>
                                                <input placeholder="name" name="name" className="form-control" value={this.state.name} onChange={this.changenameHandler}/>

                                            <label> registrationId: </label>
                                                <input placeholder="registrationId" name="registrationId" className="form-control" value={this.state.registrationId} onChange={this.changeregistrationIdHandler}/>

                                            <label> website: </label>
                                                <input placeholder="website" name="website" className="form-control" value={this.state.website} onChange={this.changewebsiteHandler}/>

                                        </div>
                                        <button className="btn btn-success" onClick={this.updateThirdPartyProvider}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default UpdateThirdPartyProviderComponent

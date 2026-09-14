import React, { Component } from 'react'
import ThirdPartyProviderService from '../services/ThirdPartyProviderService';

class CreateThirdPartyProviderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
                name: '',
                registrationId: '',
                website: ''
        }
        this.changenameHandler = this.changenameHandler.bind(this);
        this.changeregistrationIdHandler = this.changeregistrationIdHandler.bind(this);
        this.changewebsiteHandler = this.changewebsiteHandler.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            ThirdPartyProviderService.getThirdPartyProviderById(this.state.id).then( (res) =>{
                let thirdPartyProvider = res.data;
                this.setState({
                    name: thirdPartyProvider.name,
                    registrationId: thirdPartyProvider.registrationId,
                    website: thirdPartyProvider.website
                });
            });
        }        
    }
    saveOrUpdateThirdPartyProvider = (e) => {
        e.preventDefault();
        let thirdPartyProvider = {
                thirdPartyProviderId: this.state.id,
                name: this.state.name,
                registrationId: this.state.registrationId,
                website: this.state.website
            };
        console.log('thirdPartyProvider => ' + JSON.stringify(thirdPartyProvider));

        // step 5
        if(this.state.id === '_add'){
            thirdPartyProvider.thirdPartyProviderId=''
            ThirdPartyProviderService.createThirdPartyProvider(thirdPartyProvider).then(res =>{
                this.props.history.push('/thirdPartyProviders');
            });
        }else{
            ThirdPartyProviderService.updateThirdPartyProvider(thirdPartyProvider).then( res => {
                this.props.history.push('/thirdPartyProviders');
            });
        }
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

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add ThirdPartyProvider</h3>
        }else{
            return <h3 className="text-center">Update ThirdPartyProvider</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> name:&emsp; </label>
                                                <input placeholder="name" name="name" className="form-control" value={this.state.name} onChange={this.changenameHandler}/>

                                            <label> registrationId:&emsp; </label>
                                                <input placeholder="registrationId" name="registrationId" className="form-control" value={this.state.registrationId} onChange={this.changeregistrationIdHandler}/>

                                            <label> website:&emsp; </label>
                                                <input placeholder="website" name="website" className="form-control" value={this.state.website} onChange={this.changewebsiteHandler}/>

                                        </div>

                                        <button className="btn btn-outline-success" onClick={this.saveOrUpdateThirdPartyProvider}>Save</button>
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

export default CreateThirdPartyProviderComponent

import React, { Component } from 'react'
import AccessPolicyService from '../services/AccessPolicyService';

class UpdateAccessPolicyComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                name: '',
                scope: '',
                expiresAt: ''
        }
        this.updateAccessPolicy = this.updateAccessPolicy.bind(this);

        this.changenameHandler = this.changenameHandler.bind(this);
        this.changescopeHandler = this.changescopeHandler.bind(this);
        this.changeexpiresAtHandler = this.changeexpiresAtHandler.bind(this);
    }

    componentDidMount(){
        AccessPolicyService.getAccessPolicyById(this.state.id).then( (res) =>{
            let accessPolicy = res.data;
            this.setState({
                name: accessPolicy.name,
                scope: accessPolicy.scope,
                expiresAt: accessPolicy.expiresAt
            });
        });
    }

    updateAccessPolicy = (e) => {
        e.preventDefault();
        let accessPolicy = {
            accessPolicyId: this.state.id,
            name: this.state.name,
            scope: this.state.scope,
            expiresAt: this.state.expiresAt
        };
        console.log('accessPolicy => ' + JSON.stringify(accessPolicy));
        console.log('id => ' + JSON.stringify(this.state.id));
        AccessPolicyService.updateAccessPolicy(accessPolicy).then( res => {
            this.props.history.push('/accessPolicys');
        });
    }

    changenameHandler= (event) => {
        this.setState({name: event.target.value});
    }
    changescopeHandler= (event) => {
        this.setState({scope: event.target.value});
    }
    changeexpiresAtHandler= (event) => {
        this.setState({expiresAt: event.target.value});
    }

    cancel(){
        this.props.history.push('/accessPolicys');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update AccessPolicy</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> name: </label>
                                                <input placeholder="name" name="name" className="form-control" value={this.state.name} onChange={this.changenameHandler}/>

                                            <label> scope: </label>
                                                <input placeholder="scope" name="scope" className="form-control" value={this.state.scope} onChange={this.changescopeHandler}/>

                                            <label> expiresAt: </label>
                                                <input type="time" placeholder="expiresAt" name="expiresAt" className="form-control" value={this.state.expiresAt} onChange={this.changeexpiresAtHandler}/>

                                        </div>
                                        <button className="btn btn-success" onClick={this.updateAccessPolicy}>Save</button>
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

export default UpdateAccessPolicyComponent

import React, { Component } from 'react'
import AccessPolicyService from '../services/AccessPolicyService';

class CreateAccessPolicyComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
                name: '',
                scope: '',
                expiresAt: ''
        }
        this.changenameHandler = this.changenameHandler.bind(this);
        this.changescopeHandler = this.changescopeHandler.bind(this);
        this.changeexpiresAtHandler = this.changeexpiresAtHandler.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            AccessPolicyService.getAccessPolicyById(this.state.id).then( (res) =>{
                let accessPolicy = res.data;
                this.setState({
                    name: accessPolicy.name,
                    scope: accessPolicy.scope,
                    expiresAt: accessPolicy.expiresAt
                });
            });
        }        
    }
    saveOrUpdateAccessPolicy = (e) => {
        e.preventDefault();
        let accessPolicy = {
                accessPolicyId: this.state.id,
                name: this.state.name,
                scope: this.state.scope,
                expiresAt: this.state.expiresAt
            };
        console.log('accessPolicy => ' + JSON.stringify(accessPolicy));

        // step 5
        if(this.state.id === '_add'){
            accessPolicy.accessPolicyId=''
            AccessPolicyService.createAccessPolicy(accessPolicy).then(res =>{
                this.props.history.push('/accessPolicys');
            });
        }else{
            AccessPolicyService.updateAccessPolicy(accessPolicy).then( res => {
                this.props.history.push('/accessPolicys');
            });
        }
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

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add AccessPolicy</h3>
        }else{
            return <h3 className="text-center">Update AccessPolicy</h3>
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

                                            <label> scope:&emsp; </label>
                                                <input placeholder="scope" name="scope" className="form-control" value={this.state.scope} onChange={this.changescopeHandler}/>

                                            <label> expiresAt:&emsp; </label>
                                                <input type="time" placeholder="expiresAt" name="expiresAt" className="form-control" value={this.state.expiresAt} onChange={this.changeexpiresAtHandler}/>

                                        </div>

                                        <button className="btn btn-outline-success" onClick={this.saveOrUpdateAccessPolicy}>Save</button>
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

export default CreateAccessPolicyComponent

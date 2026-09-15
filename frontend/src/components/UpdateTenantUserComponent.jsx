import React, { Component } from 'react'
import TenantUserService from '../services/TenantUserService';

class UpdateTenantUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                firstName: '',
                lastName: '',
                email: '',
                role: ''
        }
        this.updateTenantUser = this.updateTenantUser.bind(this);

        this.changefirstNameHandler = this.changefirstNameHandler.bind(this);
        this.changelastNameHandler = this.changelastNameHandler.bind(this);
        this.changeemailHandler = this.changeemailHandler.bind(this);
        this.changeRoleHandler = this.changeRoleHandler.bind(this);
    }

    componentDidMount(){
        TenantUserService.getTenantUserById(this.state.id).then( (res) =>{
            let tenantUser = res.data;
            this.setState({
                firstName: tenantUser.firstName,
                lastName: tenantUser.lastName,
                email: tenantUser.email,
                role: tenantUser.role
            });
        });
    }

    updateTenantUser = (e) => {
        e.preventDefault();
        let tenantUser = {
            tenantUserId: this.state.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            role: this.state.role
        };
        console.log('tenantUser => ' + JSON.stringify(tenantUser));
        console.log('id => ' + JSON.stringify(this.state.id));
        TenantUserService.updateTenantUser(tenantUser).then( res => {
            this.props.history.push('/tenantUsers');
        });
    }

    changefirstNameHandler= (event) => {
        this.setState({firstName: event.target.value});
    }
    changelastNameHandler= (event) => {
        this.setState({lastName: event.target.value});
    }
    changeemailHandler= (event) => {
        this.setState({email: event.target.value});
    }
    changeRoleHandler= (event) => {
        this.setState({role: event.target.value});
    }

    cancel(){
        this.props.history.push('/tenantUsers');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update TenantUser</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> firstName: </label>
                                                <input placeholder="firstName" name="firstName" className="form-control" value={this.state.firstName} onChange={this.changefirstNameHandler}/>

                                            <label> lastName: </label>
                                                <input placeholder="lastName" name="lastName" className="form-control" value={this.state.lastName} onChange={this.changelastNameHandler}/>

                                            <label> email: </label>
                                                <input placeholder="email" name="email" className="form-control" value={this.state.email} onChange={this.changeemailHandler}/>

                                            <label> Role: </label>
                                                <select value={this.state.role} onChange={this.changeRoleHandler}>
                      <option name="Role" className="form-control" >
                          Admin
                      </option>
                      <option name="Role" className="form-control" >
                          Operator
                      </option>
                      <option name="Role" className="form-control" >
                          Viewer
                      </option>
                      <option name="Role" className="form-control" >
                          Integrator
                      </option>
                    </select>

                                        </div>
                                        <button className="btn btn-success" onClick={this.updateTenantUser}>Save</button>
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

export default UpdateTenantUserComponent

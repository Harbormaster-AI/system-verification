import React, { Component } from 'react'
import TenantService from '../services/TenantService';

class UpdateTenantComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                name: '',
                tenantType: ''
        }
        this.updateTenant = this.updateTenant.bind(this);

        this.changenameHandler = this.changenameHandler.bind(this);
        this.changeTenantTypeHandler = this.changeTenantTypeHandler.bind(this);
    }

    componentDidMount(){
        TenantService.getTenantById(this.state.id).then( (res) =>{
            let tenant = res.data;
            this.setState({
                name: tenant.name,
                tenantType: tenant.tenantType
            });
        });
    }

    updateTenant = (e) => {
        e.preventDefault();
        let tenant = {
            tenantId: this.state.id,
            name: this.state.name,
            tenantType: this.state.tenantType
        };
        console.log('tenant => ' + JSON.stringify(tenant));
        console.log('id => ' + JSON.stringify(this.state.id));
        TenantService.updateTenant(tenant).then( res => {
            this.props.history.push('/tenants');
        });
    }

    changenameHandler= (event) => {
        this.setState({name: event.target.value});
    }
    changeTenantTypeHandler= (event) => {
        this.setState({tenantType: event.target.value});
    }

    cancel(){
        this.props.history.push('/tenants');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Tenant</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> name: </label>
                                                <input placeholder="name" name="name" className="form-control" value={this.state.name} onChange={this.changenameHandler}/>

                                            <label> TenantType: </label>
                                                <select value={this.state.tenantType} onChange={this.changeTenantTypeHandler}>
                      <option name="TenantType" className="form-control" >
                          Enterprise
                      </option>
                      <option name="TenantType" className="form-control" >
                          SMB
                      </option>
                      <option name="TenantType" className="form-control" >
                          ISV
                      </option>
                      <option name="TenantType" className="form-control" >
                          SystemIntegrator
                      </option>
                      <option name="TenantType" className="form-control" >
                          Government
                      </option>
                    </select>

                                        </div>
                                        <button className="btn btn-success" onClick={this.updateTenant}>Save</button>
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

export default UpdateTenantComponent

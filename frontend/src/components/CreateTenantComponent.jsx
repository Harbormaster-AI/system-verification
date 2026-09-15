import React, { Component } from 'react'
import TenantService from '../services/TenantService';

class CreateTenantComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
                name: '',
                tenantType: ''
        }
        this.changenameHandler = this.changenameHandler.bind(this);
        this.changeTenantTypeHandler = this.changeTenantTypeHandler.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            TenantService.getTenantById(this.state.id).then( (res) =>{
                let tenant = res.data;
                this.setState({
                    name: tenant.name,
                    tenantType: tenant.tenantType
                });
            });
        }        
    }
    saveOrUpdateTenant = (e) => {
        e.preventDefault();
        let tenant = {
                tenantId: this.state.id,
                name: this.state.name,
                tenantType: this.state.tenantType
            };
        console.log('tenant => ' + JSON.stringify(tenant));

        // step 5
        if(this.state.id === '_add'){
            tenant.tenantId=''
            TenantService.createTenant(tenant).then(res =>{
                this.props.history.push('/tenants');
            });
        }else{
            TenantService.updateTenant(tenant).then( res => {
                this.props.history.push('/tenants');
            });
        }
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

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Tenant</h3>
        }else{
            return <h3 className="text-center">Update Tenant</h3>
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

                                            <label> TenantType:&emsp; </label>
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

                                        <button className="btn btn-outline-success" onClick={this.saveOrUpdateTenant}>Save</button>
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

export default CreateTenantComponent

import React, { Component } from 'react'
import TenantService from '../services/TenantService'

class ListTenantComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                tenants: []
        }
        this.addTenant = this.addTenant.bind(this);
        this.editTenant = this.editTenant.bind(this);
        this.deleteTenant = this.deleteTenant.bind(this);
    }

    deleteTenant(id){
        TenantService.deleteTenant(id).then( res => {
            this.setState({tenants: this.state.tenants.filter(tenant => tenant.tenantId !== id)});
        });
    }
    viewTenant(id){
        this.props.history.push(`/view-tenant/${id}`);
    }
    editTenant(id){
        this.props.history.push(`/add-tenant/${id}`);
    }

    componentDidMount(){
        TenantService.getTenants().then((res) => {
            this.setState({ tenants: res.data});
        });
    }

    addTenant(){
        this.props.history.push('/add-tenant/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Tenant List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addTenant}> Add Tenant</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Name </th>
                                    <th> TenantType </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.tenants.map(
                                        tenant => 
                                        <tr key = {tenant.tenantId}>
                                             <td> { tenant.name } </td>
                                             <td> { tenant.tenantType } </td>
                                             <td>
                                                 <button onClick={ () => this.editTenant(tenant.tenantId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteTenant(tenant.tenantId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewTenant(tenant.tenantId)} className="btn btn-outline-info btn-sm">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListTenantComponent

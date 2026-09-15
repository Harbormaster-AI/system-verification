import React, { Component } from 'react'
import TenantUserService from '../services/TenantUserService'

class ListTenantUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                tenantUsers: []
        }
        this.addTenantUser = this.addTenantUser.bind(this);
        this.editTenantUser = this.editTenantUser.bind(this);
        this.deleteTenantUser = this.deleteTenantUser.bind(this);
    }

    deleteTenantUser(id){
        TenantUserService.deleteTenantUser(id).then( res => {
            this.setState({tenantUsers: this.state.tenantUsers.filter(tenantUser => tenantUser.tenantUserId !== id)});
        });
    }
    viewTenantUser(id){
        this.props.history.push(`/view-tenantUser/${id}`);
    }
    editTenantUser(id){
        this.props.history.push(`/add-tenantUser/${id}`);
    }

    componentDidMount(){
        TenantUserService.getTenantUsers().then((res) => {
            this.setState({ tenantUsers: res.data});
        });
    }

    addTenantUser(){
        this.props.history.push('/add-tenantUser/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">TenantUser List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addTenantUser}> Add TenantUser</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> FirstName </th>
                                    <th> LastName </th>
                                    <th> Email </th>
                                    <th> Role </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.tenantUsers.map(
                                        tenantUser => 
                                        <tr key = {tenantUser.tenantUserId}>
                                             <td> { tenantUser.firstName } </td>
                                             <td> { tenantUser.lastName } </td>
                                             <td> { tenantUser.email } </td>
                                             <td> { tenantUser.role } </td>
                                             <td>
                                                 <button onClick={ () => this.editTenantUser(tenantUser.tenantUserId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteTenantUser(tenantUser.tenantUserId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewTenantUser(tenantUser.tenantUserId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListTenantUserComponent

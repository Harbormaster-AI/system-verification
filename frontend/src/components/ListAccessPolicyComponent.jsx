import React, { Component } from 'react'
import AccessPolicyService from '../services/AccessPolicyService'

class ListAccessPolicyComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                accessPolicys: []
        }
        this.addAccessPolicy = this.addAccessPolicy.bind(this);
        this.editAccessPolicy = this.editAccessPolicy.bind(this);
        this.deleteAccessPolicy = this.deleteAccessPolicy.bind(this);
    }

    deleteAccessPolicy(id){
        AccessPolicyService.deleteAccessPolicy(id).then( res => {
            this.setState({accessPolicys: this.state.accessPolicys.filter(accessPolicy => accessPolicy.accessPolicyId !== id)});
        });
    }
    viewAccessPolicy(id){
        this.props.history.push(`/view-accessPolicy/${id}`);
    }
    editAccessPolicy(id){
        this.props.history.push(`/add-accessPolicy/${id}`);
    }

    componentDidMount(){
        AccessPolicyService.getAccessPolicys().then((res) => {
            this.setState({ accessPolicys: res.data});
        });
    }

    addAccessPolicy(){
        this.props.history.push('/add-accessPolicy/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">AccessPolicy List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addAccessPolicy}> Add AccessPolicy</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Name </th>
                                    <th> Scope </th>
                                    <th> ExpiresAt </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.accessPolicys.map(
                                        accessPolicy => 
                                        <tr key = {accessPolicy.accessPolicyId}>
                                             <td> { accessPolicy.name } </td>
                                             <td> { accessPolicy.scope } </td>
                                             <td> { accessPolicy.expiresAt } </td>
                                             <td>
                                                 <button onClick={ () => this.editAccessPolicy(accessPolicy.accessPolicyId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteAccessPolicy(accessPolicy.accessPolicyId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewAccessPolicy(accessPolicy.accessPolicyId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListAccessPolicyComponent

import React, { Component } from 'react'
import BranchService from '../services/BranchService'

class ListBranchComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                branchs: []
        }
        this.addBranch = this.addBranch.bind(this);
        this.editBranch = this.editBranch.bind(this);
        this.deleteBranch = this.deleteBranch.bind(this);
    }

    deleteBranch(id){
        BranchService.deleteBranch(id).then( res => {
            this.setState({branchs: this.state.branchs.filter(branch => branch.branchId !== id)});
        });
    }
    viewBranch(id){
        this.props.history.push(`/view-branch/${id}`);
    }
    editBranch(id){
        this.props.history.push(`/add-branch/${id}`);
    }

    componentDidMount(){
        BranchService.getBranchs().then((res) => {
            this.setState({ branchs: res.data});
        });
    }

    addBranch(){
        this.props.history.push('/add-branch/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Branch List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addBranch}> Add Branch</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Name </th>
                                    <th> BranchCode </th>
                                    <th> Address </th>
                                    <th> Phone </th>
                                    <th> OpeningHours </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.branchs.map(
                                        branch => 
                                        <tr key = {branch.branchId}>
                                             <td> { branch.name } </td>
                                             <td> { branch.branchCode } </td>
                                             <td> { branch.address } </td>
                                             <td> { branch.phone } </td>
                                             <td> { branch.openingHours } </td>
                                             <td>
                                                 <button onClick={ () => this.editBranch(branch.branchId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteBranch(branch.branchId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewBranch(branch.branchId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListBranchComponent

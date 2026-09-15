import React, { Component } from 'react'
import DataRetentionPolicyService from '../services/DataRetentionPolicyService'

class ListDataRetentionPolicyComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                dataRetentionPolicys: []
        }
        this.addDataRetentionPolicy = this.addDataRetentionPolicy.bind(this);
        this.editDataRetentionPolicy = this.editDataRetentionPolicy.bind(this);
        this.deleteDataRetentionPolicy = this.deleteDataRetentionPolicy.bind(this);
    }

    deleteDataRetentionPolicy(id){
        DataRetentionPolicyService.deleteDataRetentionPolicy(id).then( res => {
            this.setState({dataRetentionPolicys: this.state.dataRetentionPolicys.filter(dataRetentionPolicy => dataRetentionPolicy.dataRetentionPolicyId !== id)});
        });
    }
    viewDataRetentionPolicy(id){
        this.props.history.push(`/view-dataRetentionPolicy/${id}`);
    }
    editDataRetentionPolicy(id){
        this.props.history.push(`/add-dataRetentionPolicy/${id}`);
    }

    componentDidMount(){
        DataRetentionPolicyService.getDataRetentionPolicys().then((res) => {
            this.setState({ dataRetentionPolicys: res.data});
        });
    }

    addDataRetentionPolicy(){
        this.props.history.push('/add-dataRetentionPolicy/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">DataRetentionPolicy List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addDataRetentionPolicy}> Add DataRetentionPolicy</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Name </th>
                                    <th> RetentionDays </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.dataRetentionPolicys.map(
                                        dataRetentionPolicy => 
                                        <tr key = {dataRetentionPolicy.dataRetentionPolicyId}>
                                             <td> { dataRetentionPolicy.name } </td>
                                             <td> { dataRetentionPolicy.retentionDays } </td>
                                             <td>
                                                 <button onClick={ () => this.editDataRetentionPolicy(dataRetentionPolicy.dataRetentionPolicyId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteDataRetentionPolicy(dataRetentionPolicy.dataRetentionPolicyId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewDataRetentionPolicy(dataRetentionPolicy.dataRetentionPolicyId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListDataRetentionPolicyComponent

import React, { Component } from 'react'
import ProvisioningRecordService from '../services/ProvisioningRecordService'

class ListProvisioningRecordComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                provisioningRecords: []
        }
        this.addProvisioningRecord = this.addProvisioningRecord.bind(this);
        this.editProvisioningRecord = this.editProvisioningRecord.bind(this);
        this.deleteProvisioningRecord = this.deleteProvisioningRecord.bind(this);
    }

    deleteProvisioningRecord(id){
        ProvisioningRecordService.deleteProvisioningRecord(id).then( res => {
            this.setState({provisioningRecords: this.state.provisioningRecords.filter(provisioningRecord => provisioningRecord.provisioningRecordId !== id)});
        });
    }
    viewProvisioningRecord(id){
        this.props.history.push(`/view-provisioningRecord/${id}`);
    }
    editProvisioningRecord(id){
        this.props.history.push(`/add-provisioningRecord/${id}`);
    }

    componentDidMount(){
        ProvisioningRecordService.getProvisioningRecords().then((res) => {
            this.setState({ provisioningRecords: res.data});
        });
    }

    addProvisioningRecord(){
        this.props.history.push('/add-provisioningRecord/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">ProvisioningRecord List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addProvisioningRecord}> Add ProvisioningRecord</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> EnrolledAt </th>
                                    <th> ProvisioningService </th>
                                    <th> Method </th>
                                    <th> Status </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.provisioningRecords.map(
                                        provisioningRecord => 
                                        <tr key = {provisioningRecord.provisioningRecordId}>
                                             <td> { provisioningRecord.enrolledAt } </td>
                                             <td> { provisioningRecord.provisioningService } </td>
                                             <td> { provisioningRecord.method } </td>
                                             <td> { provisioningRecord.status } </td>
                                             <td>
                                                 <button onClick={ () => this.editProvisioningRecord(provisioningRecord.provisioningRecordId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteProvisioningRecord(provisioningRecord.provisioningRecordId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewProvisioningRecord(provisioningRecord.provisioningRecordId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListProvisioningRecordComponent

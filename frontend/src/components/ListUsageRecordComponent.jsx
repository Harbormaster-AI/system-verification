import React, { Component } from 'react'
import UsageRecordService from '../services/UsageRecordService'

class ListUsageRecordComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                usageRecords: []
        }
        this.addUsageRecord = this.addUsageRecord.bind(this);
        this.editUsageRecord = this.editUsageRecord.bind(this);
        this.deleteUsageRecord = this.deleteUsageRecord.bind(this);
    }

    deleteUsageRecord(id){
        UsageRecordService.deleteUsageRecord(id).then( res => {
            this.setState({usageRecords: this.state.usageRecords.filter(usageRecord => usageRecord.usageRecordId !== id)});
        });
    }
    viewUsageRecord(id){
        this.props.history.push(`/view-usageRecord/${id}`);
    }
    editUsageRecord(id){
        this.props.history.push(`/add-usageRecord/${id}`);
    }

    componentDidMount(){
        UsageRecordService.getUsageRecords().then((res) => {
            this.setState({ usageRecords: res.data});
        });
    }

    addUsageRecord(){
        this.props.history.push('/add-usageRecord/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">UsageRecord List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addUsageRecord}> Add UsageRecord</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> PeriodStart </th>
                                    <th> PeriodEnd </th>
                                    <th> MessagesSent </th>
                                    <th> DataVolumeMB </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.usageRecords.map(
                                        usageRecord => 
                                        <tr key = {usageRecord.usageRecordId}>
                                             <td> { usageRecord.periodStart } </td>
                                             <td> { usageRecord.periodEnd } </td>
                                             <td> { usageRecord.messagesSent } </td>
                                             <td> { usageRecord.dataVolumeMB } </td>
                                             <td>
                                                 <button onClick={ () => this.editUsageRecord(usageRecord.usageRecordId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteUsageRecord(usageRecord.usageRecordId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewUsageRecord(usageRecord.usageRecordId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListUsageRecordComponent

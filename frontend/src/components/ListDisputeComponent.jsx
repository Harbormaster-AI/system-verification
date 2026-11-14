import React, { Component } from 'react'
import DisputeService from '../services/DisputeService'

class ListDisputeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                disputes: []
        }
        this.addDispute = this.addDispute.bind(this);
        this.editDispute = this.editDispute.bind(this);
        this.deleteDispute = this.deleteDispute.bind(this);
    }

    deleteDispute(id){
        DisputeService.deleteDispute(id).then( res => {
            this.setState({disputes: this.state.disputes.filter(dispute => dispute.disputeId !== id)});
        });
    }
    viewDispute(id){
        this.props.history.push(`/view-dispute/${id}`);
    }
    editDispute(id){
        this.props.history.push(`/add-dispute/${id}`);
    }

    componentDidMount(){
        DisputeService.getDisputes().then((res) => {
            this.setState({ disputes: res.data});
        });
    }

    addDispute(){
        this.props.history.push('/add-dispute/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Dispute List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addDispute}> Add Dispute</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> DisputeReference </th>
                                    <th> RaisedOn </th>
                                    <th> Reason </th>
                                    <th> Status </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.disputes.map(
                                        dispute => 
                                        <tr key = {dispute.disputeId}>
                                             <td> { dispute.disputeReference } </td>
                                             <td> { dispute.raisedOn } </td>
                                             <td> { dispute.reason } </td>
                                             <td> { dispute.status } </td>
                                             <td>
                                                 <button onClick={ () => this.editDispute(dispute.disputeId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteDispute(dispute.disputeId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewDispute(dispute.disputeId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListDisputeComponent

import React, { Component } from 'react'
import FundsTransferService from '../services/FundsTransferService'

class ListFundsTransferComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                fundsTransfers: []
        }
        this.addFundsTransfer = this.addFundsTransfer.bind(this);
        this.editFundsTransfer = this.editFundsTransfer.bind(this);
        this.deleteFundsTransfer = this.deleteFundsTransfer.bind(this);
    }

    deleteFundsTransfer(id){
        FundsTransferService.deleteFundsTransfer(id).then( res => {
            this.setState({fundsTransfers: this.state.fundsTransfers.filter(fundsTransfer => fundsTransfer.fundsTransferId !== id)});
        });
    }
    viewFundsTransfer(id){
        this.props.history.push(`/view-fundsTransfer/${id}`);
    }
    editFundsTransfer(id){
        this.props.history.push(`/add-fundsTransfer/${id}`);
    }

    componentDidMount(){
        FundsTransferService.getFundsTransfers().then((res) => {
            this.setState({ fundsTransfers: res.data});
        });
    }

    addFundsTransfer(){
        this.props.history.push('/add-fundsTransfer/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">FundsTransfer List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addFundsTransfer}> Add FundsTransfer</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> TransferReference </th>
                                    <th> Amount </th>
                                    <th> RequestedDate </th>
                                    <th> ExecutionDate </th>
                                    <th> Purpose </th>
                                    <th> FeeAmount </th>
                                    <th> Method </th>
                                    <th> Status </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.fundsTransfers.map(
                                        fundsTransfer => 
                                        <tr key = {fundsTransfer.fundsTransferId}>
                                             <td> { fundsTransfer.transferReference } </td>
                                             <td> { fundsTransfer.amount } </td>
                                             <td> { fundsTransfer.requestedDate } </td>
                                             <td> { fundsTransfer.executionDate } </td>
                                             <td> { fundsTransfer.purpose } </td>
                                             <td> { fundsTransfer.feeAmount } </td>
                                             <td> { fundsTransfer.method } </td>
                                             <td> { fundsTransfer.status } </td>
                                             <td>
                                                 <button onClick={ () => this.editFundsTransfer(fundsTransfer.fundsTransferId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteFundsTransfer(fundsTransfer.fundsTransferId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewFundsTransfer(fundsTransfer.fundsTransferId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListFundsTransferComponent

import React, { Component } from 'react'
import FeeChargeService from '../services/FeeChargeService'

class ListFeeChargeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                feeCharges: []
        }
        this.addFeeCharge = this.addFeeCharge.bind(this);
        this.editFeeCharge = this.editFeeCharge.bind(this);
        this.deleteFeeCharge = this.deleteFeeCharge.bind(this);
    }

    deleteFeeCharge(id){
        FeeChargeService.deleteFeeCharge(id).then( res => {
            this.setState({feeCharges: this.state.feeCharges.filter(feeCharge => feeCharge.feeChargeId !== id)});
        });
    }
    viewFeeCharge(id){
        this.props.history.push(`/view-feeCharge/${id}`);
    }
    editFeeCharge(id){
        this.props.history.push(`/add-feeCharge/${id}`);
    }

    componentDidMount(){
        FeeChargeService.getFeeCharges().then((res) => {
            this.setState({ feeCharges: res.data});
        });
    }

    addFeeCharge(){
        this.props.history.push('/add-feeCharge/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">FeeCharge List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addFeeCharge}> Add FeeCharge</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> FeeCode </th>
                                    <th> Amount </th>
                                    <th> AppliedOn </th>
                                    <th> FeeType </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.feeCharges.map(
                                        feeCharge => 
                                        <tr key = {feeCharge.feeChargeId}>
                                             <td> { feeCharge.feeCode } </td>
                                             <td> { feeCharge.amount } </td>
                                             <td> { feeCharge.appliedOn } </td>
                                             <td> { feeCharge.feeType } </td>
                                             <td>
                                                 <button onClick={ () => this.editFeeCharge(feeCharge.feeChargeId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteFeeCharge(feeCharge.feeChargeId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewFeeCharge(feeCharge.feeChargeId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListFeeChargeComponent

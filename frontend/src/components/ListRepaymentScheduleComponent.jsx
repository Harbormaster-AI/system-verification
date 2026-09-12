import React, { Component } from 'react'
import RepaymentScheduleService from '../services/RepaymentScheduleService'

class ListRepaymentScheduleComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                repaymentSchedules: []
        }
        this.addRepaymentSchedule = this.addRepaymentSchedule.bind(this);
        this.editRepaymentSchedule = this.editRepaymentSchedule.bind(this);
        this.deleteRepaymentSchedule = this.deleteRepaymentSchedule.bind(this);
    }

    deleteRepaymentSchedule(id){
        RepaymentScheduleService.deleteRepaymentSchedule(id).then( res => {
            this.setState({repaymentSchedules: this.state.repaymentSchedules.filter(repaymentSchedule => repaymentSchedule.repaymentScheduleId !== id)});
        });
    }
    viewRepaymentSchedule(id){
        this.props.history.push(`/view-repaymentSchedule/${id}`);
    }
    editRepaymentSchedule(id){
        this.props.history.push(`/add-repaymentSchedule/${id}`);
    }

    componentDidMount(){
        RepaymentScheduleService.getRepaymentSchedules().then((res) => {
            this.setState({ repaymentSchedules: res.data});
        });
    }

    addRepaymentSchedule(){
        this.props.history.push('/add-repaymentSchedule/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">RepaymentSchedule List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addRepaymentSchedule}> Add RepaymentSchedule</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> InstallmentNumber </th>
                                    <th> DueDate </th>
                                    <th> PrincipalDue </th>
                                    <th> InterestDue </th>
                                    <th> TotalDue </th>
                                    <th> Status </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.repaymentSchedules.map(
                                        repaymentSchedule => 
                                        <tr key = {repaymentSchedule.repaymentScheduleId}>
                                             <td> { repaymentSchedule.installmentNumber } </td>
                                             <td> { repaymentSchedule.dueDate } </td>
                                             <td> { repaymentSchedule.principalDue } </td>
                                             <td> { repaymentSchedule.interestDue } </td>
                                             <td> { repaymentSchedule.totalDue } </td>
                                             <td> { repaymentSchedule.status } </td>
                                             <td>
                                                 <button onClick={ () => this.editRepaymentSchedule(repaymentSchedule.repaymentScheduleId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteRepaymentSchedule(repaymentSchedule.repaymentScheduleId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewRepaymentSchedule(repaymentSchedule.repaymentScheduleId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListRepaymentScheduleComponent

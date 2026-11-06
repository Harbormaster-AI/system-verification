import React, { Component } from 'react'
import RepaymentScheduleService from '../services/RepaymentScheduleService';

class UpdateRepaymentScheduleComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                installmentNumber: '',
                dueDate: '',
                principalDue: '',
                interestDue: '',
                totalDue: '',
                status: ''
        }
        this.updateRepaymentSchedule = this.updateRepaymentSchedule.bind(this);

        this.changeinstallmentNumberHandler = this.changeinstallmentNumberHandler.bind(this);
        this.changedueDateHandler = this.changedueDateHandler.bind(this);
        this.changeprincipalDueHandler = this.changeprincipalDueHandler.bind(this);
        this.changeinterestDueHandler = this.changeinterestDueHandler.bind(this);
        this.changetotalDueHandler = this.changetotalDueHandler.bind(this);
        this.changeStatusHandler = this.changeStatusHandler.bind(this);
    }

    componentDidMount(){
        RepaymentScheduleService.getRepaymentScheduleById(this.state.id).then( (res) =>{
            let repaymentSchedule = res.data;
            this.setState({
                installmentNumber: repaymentSchedule.installmentNumber,
                dueDate: repaymentSchedule.dueDate,
                principalDue: repaymentSchedule.principalDue,
                interestDue: repaymentSchedule.interestDue,
                totalDue: repaymentSchedule.totalDue,
                status: repaymentSchedule.status
            });
        });
    }

    updateRepaymentSchedule = (e) => {
        e.preventDefault();
        let repaymentSchedule = {
            repaymentScheduleId: this.state.id,
            installmentNumber: this.state.installmentNumber,
            dueDate: this.state.dueDate,
            principalDue: this.state.principalDue,
            interestDue: this.state.interestDue,
            totalDue: this.state.totalDue,
            status: this.state.status
        };
        console.log('repaymentSchedule => ' + JSON.stringify(repaymentSchedule));
        console.log('id => ' + JSON.stringify(this.state.id));
        RepaymentScheduleService.updateRepaymentSchedule(repaymentSchedule).then( res => {
            this.props.history.push('/repaymentSchedules');
        });
    }

    changeinstallmentNumberHandler= (event) => {
        this.setState({installmentNumber: event.target.value});
    }
    changedueDateHandler= (event) => {
        this.setState({dueDate: event.target.value});
    }
    changeprincipalDueHandler= (event) => {
        this.setState({principalDue: event.target.value});
    }
    changeinterestDueHandler= (event) => {
        this.setState({interestDue: event.target.value});
    }
    changetotalDueHandler= (event) => {
        this.setState({totalDue: event.target.value});
    }
    changeStatusHandler= (event) => {
        this.setState({status: event.target.value});
    }

    cancel(){
        this.props.history.push('/repaymentSchedules');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update RepaymentSchedule</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> installmentNumber: </label>
                                                <input type="number" placeholder="installmentNumber" name="installmentNumber" className="form-control" value={this.state.installmentNumber} onChange={this.changeinstallmentNumberHandler}/>

                                            <label> dueDate: </label>
                                                <input type="date" placeholder="dueDate" name="dueDate" className="form-control" value={this.state.dueDate} onChange={this.changedueDateHandler}/>

                                            <label> principalDue: </label>
                                                <input placeholder="principalDue" name="principalDue" className="form-control" value={this.state.principalDue} onChange={this.changeprincipalDueHandler}/>

                                            <label> interestDue: </label>
                                                <input placeholder="interestDue" name="interestDue" className="form-control" value={this.state.interestDue} onChange={this.changeinterestDueHandler}/>

                                            <label> totalDue: </label>
                                                <input placeholder="totalDue" name="totalDue" className="form-control" value={this.state.totalDue} onChange={this.changetotalDueHandler}/>

                                            <label> Status: </label>
                                                <select value={this.state.status} onChange={this.changeStatusHandler}>
                      <option name="Status" className="form-control" >
                          Due
                      </option>
                      <option name="Status" className="form-control" >
                          Paid
                      </option>
                      <option name="Status" className="form-control" >
                          Overdue
                      </option>
                      <option name="Status" className="form-control" >
                          Deferred
                      </option>
                    </select>

                                        </div>
                                        <button className="btn btn-success" onClick={this.updateRepaymentSchedule}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default UpdateRepaymentScheduleComponent

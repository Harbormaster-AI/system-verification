import React, { Component } from 'react'
import StandingInstructionService from '../services/StandingInstructionService';

class CreateStandingInstructionComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
                instructionId: '',
                amount: '',
                nextExecutionDate: '',
                frequency: '',
                status: ''
        }
        this.changeinstructionIdHandler = this.changeinstructionIdHandler.bind(this);
        this.changeamountHandler = this.changeamountHandler.bind(this);
        this.changenextExecutionDateHandler = this.changenextExecutionDateHandler.bind(this);
        this.changeFrequencyHandler = this.changeFrequencyHandler.bind(this);
        this.changeStatusHandler = this.changeStatusHandler.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            StandingInstructionService.getStandingInstructionById(this.state.id).then( (res) =>{
                let standingInstruction = res.data;
                this.setState({
                    instructionId: standingInstruction.instructionId,
                    amount: standingInstruction.amount,
                    nextExecutionDate: standingInstruction.nextExecutionDate,
                    frequency: standingInstruction.frequency,
                    status: standingInstruction.status
                });
            });
        }        
    }
    saveOrUpdateStandingInstruction = (e) => {
        e.preventDefault();
        let standingInstruction = {
                standingInstructionId: this.state.id,
                instructionId: this.state.instructionId,
                amount: this.state.amount,
                nextExecutionDate: this.state.nextExecutionDate,
                frequency: this.state.frequency,
                status: this.state.status
            };
        console.log('standingInstruction => ' + JSON.stringify(standingInstruction));

        // step 5
        if(this.state.id === '_add'){
            standingInstruction.standingInstructionId=''
            StandingInstructionService.createStandingInstruction(standingInstruction).then(res =>{
                this.props.history.push('/standingInstructions');
            });
        }else{
            StandingInstructionService.updateStandingInstruction(standingInstruction).then( res => {
                this.props.history.push('/standingInstructions');
            });
        }
    }
    
    changeinstructionIdHandler= (event) => {
        this.setState({instructionId: event.target.value});
    }
    changeamountHandler= (event) => {
        this.setState({amount: event.target.value});
    }
    changenextExecutionDateHandler= (event) => {
        this.setState({nextExecutionDate: event.target.value});
    }
    changeFrequencyHandler= (event) => {
        this.setState({frequency: event.target.value});
    }
    changeStatusHandler= (event) => {
        this.setState({status: event.target.value});
    }

    cancel(){
        this.props.history.push('/standingInstructions');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add StandingInstruction</h3>
        }else{
            return <h3 className="text-center">Update StandingInstruction</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> instructionId:&emsp; </label>
                                                <input placeholder="instructionId" name="instructionId" className="form-control" value={this.state.instructionId} onChange={this.changeinstructionIdHandler}/>

                                            <label> amount:&emsp; </label>
                                                <input placeholder="amount" name="amount" className="form-control" value={this.state.amount} onChange={this.changeamountHandler}/>

                                            <label> nextExecutionDate:&emsp; </label>
                                                <input type="date" placeholder="nextExecutionDate" name="nextExecutionDate" className="form-control" value={this.state.nextExecutionDate} onChange={this.changenextExecutionDateHandler}/>

                                            <label> Frequency:&emsp; </label>
                                                <select value={this.state.frequency} onChange={this.changeFrequencyHandler}>
                      <option name="Frequency" className="form-control" >
                          OneTime
                      </option>
                      <option name="Frequency" className="form-control" >
                          Weekly
                      </option>
                      <option name="Frequency" className="form-control" >
                          BiWeekly
                      </option>
                      <option name="Frequency" className="form-control" >
                          Monthly
                      </option>
                      <option name="Frequency" className="form-control" >
                          Quarterly
                      </option>
                      <option name="Frequency" className="form-control" >
                          Annually
                      </option>
                    </select>

                                            <label> Status:&emsp; </label>
                                                <select value={this.state.status} onChange={this.changeStatusHandler}>
                      <option name="Status" className="form-control" >
                          Active
                      </option>
                      <option name="Status" className="form-control" >
                          Paused
                      </option>
                      <option name="Status" className="form-control" >
                          Cancelled
                      </option>
                      <option name="Status" className="form-control" >
                          Completed
                      </option>
                    </select>

                                        </div>

                                        <button className="btn btn-outline-success" onClick={this.saveOrUpdateStandingInstruction}>Save</button>
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

export default CreateStandingInstructionComponent

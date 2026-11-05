import React, { Component } from 'react'
import ScreeningResultService from '../services/ScreeningResultService';

class CreateScreeningResultComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
                screeningDate: '',
                provider: '',
                outcome: ''
        }
        this.changescreeningDateHandler = this.changescreeningDateHandler.bind(this);
        this.changeproviderHandler = this.changeproviderHandler.bind(this);
        this.changeOutcomeHandler = this.changeOutcomeHandler.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            ScreeningResultService.getScreeningResultById(this.state.id).then( (res) =>{
                let screeningResult = res.data;
                this.setState({
                    screeningDate: screeningResult.screeningDate,
                    provider: screeningResult.provider,
                    outcome: screeningResult.outcome
                });
            });
        }        
    }
    saveOrUpdateScreeningResult = (e) => {
        e.preventDefault();
        let screeningResult = {
                screeningResultId: this.state.id,
                screeningDate: this.state.screeningDate,
                provider: this.state.provider,
                outcome: this.state.outcome
            };
        console.log('screeningResult => ' + JSON.stringify(screeningResult));

        // step 5
        if(this.state.id === '_add'){
            screeningResult.screeningResultId=''
            ScreeningResultService.createScreeningResult(screeningResult).then(res =>{
                this.props.history.push('/screeningResults');
            });
        }else{
            ScreeningResultService.updateScreeningResult(screeningResult).then( res => {
                this.props.history.push('/screeningResults');
            });
        }
    }
    
    changescreeningDateHandler= (event) => {
        this.setState({screeningDate: event.target.value});
    }
    changeproviderHandler= (event) => {
        this.setState({provider: event.target.value});
    }
    changeOutcomeHandler= (event) => {
        this.setState({outcome: event.target.value});
    }

    cancel(){
        this.props.history.push('/screeningResults');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add ScreeningResult</h3>
        }else{
            return <h3 className="text-center">Update ScreeningResult</h3>
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
                                            <label> screeningDate:&emsp; </label>
                                                <input type="date" placeholder="screeningDate" name="screeningDate" className="form-control" value={this.state.screeningDate} onChange={this.changescreeningDateHandler}/>

                                            <label> provider:&emsp; </label>
                                                <input placeholder="provider" name="provider" className="form-control" value={this.state.provider} onChange={this.changeproviderHandler}/>

                                            <label> Outcome:&emsp; </label>
                                                <select value={this.state.outcome} onChange={this.changeOutcomeHandler}>
                      <option name="Outcome" className="form-control" >
                          Clear
                      </option>
                      <option name="Outcome" className="form-control" >
                          Match
                      </option>
                      <option name="Outcome" className="form-control" >
                          Review
                      </option>
                    </select>

                                        </div>

                                        <button className="btn btn-outline-success" onClick={this.saveOrUpdateScreeningResult}>Save</button>
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

export default CreateScreeningResultComponent

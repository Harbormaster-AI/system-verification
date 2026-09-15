import React, { Component } from 'react'
import AlertRuleService from '../services/AlertRuleService';

class CreateAlertRuleComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
                name: '',
                expression: '',
                severity: ''
        }
        this.changenameHandler = this.changenameHandler.bind(this);
        this.changeexpressionHandler = this.changeexpressionHandler.bind(this);
        this.changeSeverityHandler = this.changeSeverityHandler.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            AlertRuleService.getAlertRuleById(this.state.id).then( (res) =>{
                let alertRule = res.data;
                this.setState({
                    name: alertRule.name,
                    expression: alertRule.expression,
                    severity: alertRule.severity
                });
            });
        }        
    }
    saveOrUpdateAlertRule = (e) => {
        e.preventDefault();
        let alertRule = {
                alertRuleId: this.state.id,
                name: this.state.name,
                expression: this.state.expression,
                severity: this.state.severity
            };
        console.log('alertRule => ' + JSON.stringify(alertRule));

        // step 5
        if(this.state.id === '_add'){
            alertRule.alertRuleId=''
            AlertRuleService.createAlertRule(alertRule).then(res =>{
                this.props.history.push('/alertRules');
            });
        }else{
            AlertRuleService.updateAlertRule(alertRule).then( res => {
                this.props.history.push('/alertRules');
            });
        }
    }
    
    changenameHandler= (event) => {
        this.setState({name: event.target.value});
    }
    changeexpressionHandler= (event) => {
        this.setState({expression: event.target.value});
    }
    changeSeverityHandler= (event) => {
        this.setState({severity: event.target.value});
    }

    cancel(){
        this.props.history.push('/alertRules');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add AlertRule</h3>
        }else{
            return <h3 className="text-center">Update AlertRule</h3>
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
                                            <label> name:&emsp; </label>
                                                <input placeholder="name" name="name" className="form-control" value={this.state.name} onChange={this.changenameHandler}/>

                                            <label> expression:&emsp; </label>
                                                <input placeholder="expression" name="expression" className="form-control" value={this.state.expression} onChange={this.changeexpressionHandler}/>

                                            <label> Severity:&emsp; </label>
                                                <select value={this.state.severity} onChange={this.changeSeverityHandler}>
                      <option name="Severity" className="form-control" >
                          Info
                      </option>
                      <option name="Severity" className="form-control" >
                          Warning
                      </option>
                      <option name="Severity" className="form-control" >
                          Critical
                      </option>
                    </select>

                                        </div>

                                        <button className="btn btn-outline-success" onClick={this.saveOrUpdateAlertRule}>Save</button>
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

export default CreateAlertRuleComponent

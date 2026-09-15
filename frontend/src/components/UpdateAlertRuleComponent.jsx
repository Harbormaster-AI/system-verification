import React, { Component } from 'react'
import AlertRuleService from '../services/AlertRuleService';

class UpdateAlertRuleComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                name: '',
                expression: '',
                severity: ''
        }
        this.updateAlertRule = this.updateAlertRule.bind(this);

        this.changenameHandler = this.changenameHandler.bind(this);
        this.changeexpressionHandler = this.changeexpressionHandler.bind(this);
        this.changeSeverityHandler = this.changeSeverityHandler.bind(this);
    }

    componentDidMount(){
        AlertRuleService.getAlertRuleById(this.state.id).then( (res) =>{
            let alertRule = res.data;
            this.setState({
                name: alertRule.name,
                expression: alertRule.expression,
                severity: alertRule.severity
            });
        });
    }

    updateAlertRule = (e) => {
        e.preventDefault();
        let alertRule = {
            alertRuleId: this.state.id,
            name: this.state.name,
            expression: this.state.expression,
            severity: this.state.severity
        };
        console.log('alertRule => ' + JSON.stringify(alertRule));
        console.log('id => ' + JSON.stringify(this.state.id));
        AlertRuleService.updateAlertRule(alertRule).then( res => {
            this.props.history.push('/alertRules');
        });
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

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update AlertRule</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> name: </label>
                                                <input placeholder="name" name="name" className="form-control" value={this.state.name} onChange={this.changenameHandler}/>

                                            <label> expression: </label>
                                                <input placeholder="expression" name="expression" className="form-control" value={this.state.expression} onChange={this.changeexpressionHandler}/>

                                            <label> Severity: </label>
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
                                        <button className="btn btn-success" onClick={this.updateAlertRule}>Save</button>
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

export default UpdateAlertRuleComponent

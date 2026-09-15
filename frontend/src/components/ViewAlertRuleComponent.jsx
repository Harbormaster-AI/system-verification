import React, { Component } from 'react'
import AlertRuleService from '../services/AlertRuleService'

class ViewAlertRuleComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            alertRule: {}
        }
    }

    componentDidMount(){
        AlertRuleService.getAlertRuleById(this.state.id).then( res => {
            this.setState({alertRule: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View AlertRule Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> name:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.alertRule.name }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> expression:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.alertRule.expression }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> Severity:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.alertRule.severity }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewAlertRuleComponent

import React, { Component } from 'react'
import ActuatorInstanceService from '../services/ActuatorInstanceService';

class UpdateActuatorInstanceComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                name: '',
                commandTopic: '',
                actuatorType: ''
        }
        this.updateActuatorInstance = this.updateActuatorInstance.bind(this);

        this.changenameHandler = this.changenameHandler.bind(this);
        this.changecommandTopicHandler = this.changecommandTopicHandler.bind(this);
        this.changeActuatorTypeHandler = this.changeActuatorTypeHandler.bind(this);
    }

    componentDidMount(){
        ActuatorInstanceService.getActuatorInstanceById(this.state.id).then( (res) =>{
            let actuatorInstance = res.data;
            this.setState({
                name: actuatorInstance.name,
                commandTopic: actuatorInstance.commandTopic,
                actuatorType: actuatorInstance.actuatorType
            });
        });
    }

    updateActuatorInstance = (e) => {
        e.preventDefault();
        let actuatorInstance = {
            actuatorInstanceId: this.state.id,
            name: this.state.name,
            commandTopic: this.state.commandTopic,
            actuatorType: this.state.actuatorType
        };
        console.log('actuatorInstance => ' + JSON.stringify(actuatorInstance));
        console.log('id => ' + JSON.stringify(this.state.id));
        ActuatorInstanceService.updateActuatorInstance(actuatorInstance).then( res => {
            this.props.history.push('/actuatorInstances');
        });
    }

    changenameHandler= (event) => {
        this.setState({name: event.target.value});
    }
    changecommandTopicHandler= (event) => {
        this.setState({commandTopic: event.target.value});
    }
    changeActuatorTypeHandler= (event) => {
        this.setState({actuatorType: event.target.value});
    }

    cancel(){
        this.props.history.push('/actuatorInstances');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update ActuatorInstance</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> name: </label>
                                                <input placeholder="name" name="name" className="form-control" value={this.state.name} onChange={this.changenameHandler}/>

                                            <label> commandTopic: </label>
                                                <input placeholder="commandTopic" name="commandTopic" className="form-control" value={this.state.commandTopic} onChange={this.changecommandTopicHandler}/>

                                            <label> ActuatorType: </label>
                                                <select value={this.state.actuatorType} onChange={this.changeActuatorTypeHandler}>
                      <option name="ActuatorType" className="form-control" >
                          Relay
                      </option>
                      <option name="ActuatorType" className="form-control" >
                          Motor
                      </option>
                      <option name="ActuatorType" className="form-control" >
                          Valve
                      </option>
                      <option name="ActuatorType" className="form-control" >
                          LED
                      </option>
                      <option name="ActuatorType" className="form-control" >
                          Buzzer
                      </option>
                      <option name="ActuatorType" className="form-control" >
                          Display
                      </option>
                    </select>

                                        </div>
                                        <button className="btn btn-success" onClick={this.updateActuatorInstance}>Save</button>
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

export default UpdateActuatorInstanceComponent

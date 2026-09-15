import React, { Component } from 'react'
import ActuatorInstanceService from '../services/ActuatorInstanceService';

class CreateActuatorInstanceComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
                name: '',
                commandTopic: '',
                actuatorType: ''
        }
        this.changenameHandler = this.changenameHandler.bind(this);
        this.changecommandTopicHandler = this.changecommandTopicHandler.bind(this);
        this.changeActuatorTypeHandler = this.changeActuatorTypeHandler.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            ActuatorInstanceService.getActuatorInstanceById(this.state.id).then( (res) =>{
                let actuatorInstance = res.data;
                this.setState({
                    name: actuatorInstance.name,
                    commandTopic: actuatorInstance.commandTopic,
                    actuatorType: actuatorInstance.actuatorType
                });
            });
        }        
    }
    saveOrUpdateActuatorInstance = (e) => {
        e.preventDefault();
        let actuatorInstance = {
                actuatorInstanceId: this.state.id,
                name: this.state.name,
                commandTopic: this.state.commandTopic,
                actuatorType: this.state.actuatorType
            };
        console.log('actuatorInstance => ' + JSON.stringify(actuatorInstance));

        // step 5
        if(this.state.id === '_add'){
            actuatorInstance.actuatorInstanceId=''
            ActuatorInstanceService.createActuatorInstance(actuatorInstance).then(res =>{
                this.props.history.push('/actuatorInstances');
            });
        }else{
            ActuatorInstanceService.updateActuatorInstance(actuatorInstance).then( res => {
                this.props.history.push('/actuatorInstances');
            });
        }
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

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add ActuatorInstance</h3>
        }else{
            return <h3 className="text-center">Update ActuatorInstance</h3>
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

                                            <label> commandTopic:&emsp; </label>
                                                <input placeholder="commandTopic" name="commandTopic" className="form-control" value={this.state.commandTopic} onChange={this.changecommandTopicHandler}/>

                                            <label> ActuatorType:&emsp; </label>
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

                                        <button className="btn btn-outline-success" onClick={this.saveOrUpdateActuatorInstance}>Save</button>
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

export default CreateActuatorInstanceComponent

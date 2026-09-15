import React, { Component } from 'react'
import HardwareModuleService from '../services/HardwareModuleService';

class CreateHardwareModuleComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
                moduleCode: '',
                datasheetUri: '',
                moduleType: ''
        }
        this.changemoduleCodeHandler = this.changemoduleCodeHandler.bind(this);
        this.changedatasheetUriHandler = this.changedatasheetUriHandler.bind(this);
        this.changeModuleTypeHandler = this.changeModuleTypeHandler.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            HardwareModuleService.getHardwareModuleById(this.state.id).then( (res) =>{
                let hardwareModule = res.data;
                this.setState({
                    moduleCode: hardwareModule.moduleCode,
                    datasheetUri: hardwareModule.datasheetUri,
                    moduleType: hardwareModule.moduleType
                });
            });
        }        
    }
    saveOrUpdateHardwareModule = (e) => {
        e.preventDefault();
        let hardwareModule = {
                hardwareModuleId: this.state.id,
                moduleCode: this.state.moduleCode,
                datasheetUri: this.state.datasheetUri,
                moduleType: this.state.moduleType
            };
        console.log('hardwareModule => ' + JSON.stringify(hardwareModule));

        // step 5
        if(this.state.id === '_add'){
            hardwareModule.hardwareModuleId=''
            HardwareModuleService.createHardwareModule(hardwareModule).then(res =>{
                this.props.history.push('/hardwareModules');
            });
        }else{
            HardwareModuleService.updateHardwareModule(hardwareModule).then( res => {
                this.props.history.push('/hardwareModules');
            });
        }
    }
    
    changemoduleCodeHandler= (event) => {
        this.setState({moduleCode: event.target.value});
    }
    changedatasheetUriHandler= (event) => {
        this.setState({datasheetUri: event.target.value});
    }
    changeModuleTypeHandler= (event) => {
        this.setState({moduleType: event.target.value});
    }

    cancel(){
        this.props.history.push('/hardwareModules');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add HardwareModule</h3>
        }else{
            return <h3 className="text-center">Update HardwareModule</h3>
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
                                            <label> moduleCode:&emsp; </label>
                                                <input placeholder="moduleCode" name="moduleCode" className="form-control" value={this.state.moduleCode} onChange={this.changemoduleCodeHandler}/>

                                            <label> datasheetUri:&emsp; </label>
                                                <input placeholder="datasheetUri" name="datasheetUri" className="form-control" value={this.state.datasheetUri} onChange={this.changedatasheetUriHandler}/>

                                            <label> ModuleType:&emsp; </label>
                                                <select value={this.state.moduleType} onChange={this.changeModuleTypeHandler}>
                      <option name="ModuleType" className="form-control" >
                          RFModule
                      </option>
                      <option name="ModuleType" className="form-control" >
                          MCU
                      </option>
                      <option name="ModuleType" className="form-control" >
                          SensorChipset
                      </option>
                      <option name="ModuleType" className="form-control" >
                          PowerManagement
                      </option>
                      <option name="ModuleType" className="form-control" >
                          Storage
                      </option>
                      <option name="ModuleType" className="form-control" >
                          Other
                      </option>
                    </select>

                                        </div>

                                        <button className="btn btn-outline-success" onClick={this.saveOrUpdateHardwareModule}>Save</button>
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

export default CreateHardwareModuleComponent

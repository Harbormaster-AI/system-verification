import React, { Component } from 'react'
import DeviceGroupService from '../services/DeviceGroupService';

class CreateDeviceGroupComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
                name: '',
                criteria: ''
        }
        this.changenameHandler = this.changenameHandler.bind(this);
        this.changecriteriaHandler = this.changecriteriaHandler.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            DeviceGroupService.getDeviceGroupById(this.state.id).then( (res) =>{
                let deviceGroup = res.data;
                this.setState({
                    name: deviceGroup.name,
                    criteria: deviceGroup.criteria
                });
            });
        }        
    }
    saveOrUpdateDeviceGroup = (e) => {
        e.preventDefault();
        let deviceGroup = {
                deviceGroupId: this.state.id,
                name: this.state.name,
                criteria: this.state.criteria
            };
        console.log('deviceGroup => ' + JSON.stringify(deviceGroup));

        // step 5
        if(this.state.id === '_add'){
            deviceGroup.deviceGroupId=''
            DeviceGroupService.createDeviceGroup(deviceGroup).then(res =>{
                this.props.history.push('/deviceGroups');
            });
        }else{
            DeviceGroupService.updateDeviceGroup(deviceGroup).then( res => {
                this.props.history.push('/deviceGroups');
            });
        }
    }
    
    changenameHandler= (event) => {
        this.setState({name: event.target.value});
    }
    changecriteriaHandler= (event) => {
        this.setState({criteria: event.target.value});
    }

    cancel(){
        this.props.history.push('/deviceGroups');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add DeviceGroup</h3>
        }else{
            return <h3 className="text-center">Update DeviceGroup</h3>
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

                                            <label> criteria:&emsp; </label>
                                                <input placeholder="criteria" name="criteria" className="form-control" value={this.state.criteria} onChange={this.changecriteriaHandler}/>

                                        </div>

                                        <button className="btn btn-outline-success" onClick={this.saveOrUpdateDeviceGroup}>Save</button>
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

export default CreateDeviceGroupComponent

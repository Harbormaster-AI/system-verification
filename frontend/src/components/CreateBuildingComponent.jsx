import React, { Component } from 'react'
import BuildingService from '../services/BuildingService';

class CreateBuildingComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
                name: ''
        }
        this.changenameHandler = this.changenameHandler.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            BuildingService.getBuildingById(this.state.id).then( (res) =>{
                let building = res.data;
                this.setState({
                    name: building.name
                });
            });
        }        
    }
    saveOrUpdateBuilding = (e) => {
        e.preventDefault();
        let building = {
                buildingId: this.state.id,
                name: this.state.name
            };
        console.log('building => ' + JSON.stringify(building));

        // step 5
        if(this.state.id === '_add'){
            building.buildingId=''
            BuildingService.createBuilding(building).then(res =>{
                this.props.history.push('/buildings');
            });
        }else{
            BuildingService.updateBuilding(building).then( res => {
                this.props.history.push('/buildings');
            });
        }
    }
    
    changenameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    cancel(){
        this.props.history.push('/buildings');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Building</h3>
        }else{
            return <h3 className="text-center">Update Building</h3>
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

                                        </div>

                                        <button className="btn btn-outline-success" onClick={this.saveOrUpdateBuilding}>Save</button>
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

export default CreateBuildingComponent

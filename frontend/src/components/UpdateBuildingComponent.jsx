import React, { Component } from 'react'
import BuildingService from '../services/BuildingService';

class UpdateBuildingComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                name: ''
        }
        this.updateBuilding = this.updateBuilding.bind(this);

        this.changenameHandler = this.changenameHandler.bind(this);
    }

    componentDidMount(){
        BuildingService.getBuildingById(this.state.id).then( (res) =>{
            let building = res.data;
            this.setState({
                name: building.name
            });
        });
    }

    updateBuilding = (e) => {
        e.preventDefault();
        let building = {
            buildingId: this.state.id,
            name: this.state.name
        };
        console.log('building => ' + JSON.stringify(building));
        console.log('id => ' + JSON.stringify(this.state.id));
        BuildingService.updateBuilding(building).then( res => {
            this.props.history.push('/buildings');
        });
    }

    changenameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    cancel(){
        this.props.history.push('/buildings');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Building</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> name: </label>
                                                <input placeholder="name" name="name" className="form-control" value={this.state.name} onChange={this.changenameHandler}/>

                                        </div>
                                        <button className="btn btn-success" onClick={this.updateBuilding}>Save</button>
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

export default UpdateBuildingComponent

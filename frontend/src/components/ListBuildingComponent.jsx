import React, { Component } from 'react'
import BuildingService from '../services/BuildingService'

class ListBuildingComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                buildings: []
        }
        this.addBuilding = this.addBuilding.bind(this);
        this.editBuilding = this.editBuilding.bind(this);
        this.deleteBuilding = this.deleteBuilding.bind(this);
    }

    deleteBuilding(id){
        BuildingService.deleteBuilding(id).then( res => {
            this.setState({buildings: this.state.buildings.filter(building => building.buildingId !== id)});
        });
    }
    viewBuilding(id){
        this.props.history.push(`/view-building/${id}`);
    }
    editBuilding(id){
        this.props.history.push(`/add-building/${id}`);
    }

    componentDidMount(){
        BuildingService.getBuildings().then((res) => {
            this.setState({ buildings: res.data});
        });
    }

    addBuilding(){
        this.props.history.push('/add-building/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Building List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addBuilding}> Add Building</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Name </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.buildings.map(
                                        building => 
                                        <tr key = {building.buildingId}>
                                             <td> { building.name } </td>
                                             <td>
                                                 <button onClick={ () => this.editBuilding(building.buildingId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteBuilding(building.buildingId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewBuilding(building.buildingId)} className="btn btn-outline-info btn-sm">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListBuildingComponent

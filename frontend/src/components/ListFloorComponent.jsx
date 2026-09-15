import React, { Component } from 'react'
import FloorService from '../services/FloorService'

class ListFloorComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                floors: []
        }
        this.addFloor = this.addFloor.bind(this);
        this.editFloor = this.editFloor.bind(this);
        this.deleteFloor = this.deleteFloor.bind(this);
    }

    deleteFloor(id){
        FloorService.deleteFloor(id).then( res => {
            this.setState({floors: this.state.floors.filter(floor => floor.floorId !== id)});
        });
    }
    viewFloor(id){
        this.props.history.push(`/view-floor/${id}`);
    }
    editFloor(id){
        this.props.history.push(`/add-floor/${id}`);
    }

    componentDidMount(){
        FloorService.getFloors().then((res) => {
            this.setState({ floors: res.data});
        });
    }

    addFloor(){
        this.props.history.push('/add-floor/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Floor List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addFloor}> Add Floor</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Name </th>
                                    <th> Level </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.floors.map(
                                        floor => 
                                        <tr key = {floor.floorId}>
                                             <td> { floor.name } </td>
                                             <td> { floor.level } </td>
                                             <td>
                                                 <button onClick={ () => this.editFloor(floor.floorId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteFloor(floor.floorId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewFloor(floor.floorId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListFloorComponent

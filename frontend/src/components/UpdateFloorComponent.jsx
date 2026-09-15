import React, { Component } from 'react'
import FloorService from '../services/FloorService';

class UpdateFloorComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                name: '',
                level: ''
        }
        this.updateFloor = this.updateFloor.bind(this);

        this.changenameHandler = this.changenameHandler.bind(this);
        this.changelevelHandler = this.changelevelHandler.bind(this);
    }

    componentDidMount(){
        FloorService.getFloorById(this.state.id).then( (res) =>{
            let floor = res.data;
            this.setState({
                name: floor.name,
                level: floor.level
            });
        });
    }

    updateFloor = (e) => {
        e.preventDefault();
        let floor = {
            floorId: this.state.id,
            name: this.state.name,
            level: this.state.level
        };
        console.log('floor => ' + JSON.stringify(floor));
        console.log('id => ' + JSON.stringify(this.state.id));
        FloorService.updateFloor(floor).then( res => {
            this.props.history.push('/floors');
        });
    }

    changenameHandler= (event) => {
        this.setState({name: event.target.value});
    }
    changelevelHandler= (event) => {
        this.setState({level: event.target.value});
    }

    cancel(){
        this.props.history.push('/floors');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Floor</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> name: </label>
                                                <input placeholder="name" name="name" className="form-control" value={this.state.name} onChange={this.changenameHandler}/>

                                            <label> level: </label>
                                                <input type="number" placeholder="level" name="level" className="form-control" value={this.state.level} onChange={this.changelevelHandler}/>

                                        </div>
                                        <button className="btn btn-success" onClick={this.updateFloor}>Save</button>
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

export default UpdateFloorComponent

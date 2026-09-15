import React, { Component } from 'react'
import RoomService from '../services/RoomService';

class UpdateRoomComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                name: ''
        }
        this.updateRoom = this.updateRoom.bind(this);

        this.changenameHandler = this.changenameHandler.bind(this);
    }

    componentDidMount(){
        RoomService.getRoomById(this.state.id).then( (res) =>{
            let room = res.data;
            this.setState({
                name: room.name
            });
        });
    }

    updateRoom = (e) => {
        e.preventDefault();
        let room = {
            roomId: this.state.id,
            name: this.state.name
        };
        console.log('room => ' + JSON.stringify(room));
        console.log('id => ' + JSON.stringify(this.state.id));
        RoomService.updateRoom(room).then( res => {
            this.props.history.push('/rooms');
        });
    }

    changenameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    cancel(){
        this.props.history.push('/rooms');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Room</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> name: </label>
                                                <input placeholder="name" name="name" className="form-control" value={this.state.name} onChange={this.changenameHandler}/>

                                        </div>
                                        <button className="btn btn-success" onClick={this.updateRoom}>Save</button>
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

export default UpdateRoomComponent

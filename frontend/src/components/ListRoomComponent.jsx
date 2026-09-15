import React, { Component } from 'react'
import RoomService from '../services/RoomService'

class ListRoomComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                rooms: []
        }
        this.addRoom = this.addRoom.bind(this);
        this.editRoom = this.editRoom.bind(this);
        this.deleteRoom = this.deleteRoom.bind(this);
    }

    deleteRoom(id){
        RoomService.deleteRoom(id).then( res => {
            this.setState({rooms: this.state.rooms.filter(room => room.roomId !== id)});
        });
    }
    viewRoom(id){
        this.props.history.push(`/view-room/${id}`);
    }
    editRoom(id){
        this.props.history.push(`/add-room/${id}`);
    }

    componentDidMount(){
        RoomService.getRooms().then((res) => {
            this.setState({ rooms: res.data});
        });
    }

    addRoom(){
        this.props.history.push('/add-room/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Room List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addRoom}> Add Room</button>
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
                                    this.state.rooms.map(
                                        room => 
                                        <tr key = {room.roomId}>
                                             <td> { room.name } </td>
                                             <td>
                                                 <button onClick={ () => this.editRoom(room.roomId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteRoom(room.roomId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewRoom(room.roomId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListRoomComponent

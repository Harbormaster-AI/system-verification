import React, { Component } from 'react'
import RoomService from '../services/RoomService';

class CreateRoomComponent extends Component {
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
            RoomService.getRoomById(this.state.id).then( (res) =>{
                let room = res.data;
                this.setState({
                    name: room.name
                });
            });
        }        
    }
    saveOrUpdateRoom = (e) => {
        e.preventDefault();
        let room = {
                roomId: this.state.id,
                name: this.state.name
            };
        console.log('room => ' + JSON.stringify(room));

        // step 5
        if(this.state.id === '_add'){
            room.roomId=''
            RoomService.createRoom(room).then(res =>{
                this.props.history.push('/rooms');
            });
        }else{
            RoomService.updateRoom(room).then( res => {
                this.props.history.push('/rooms');
            });
        }
    }
    
    changenameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    cancel(){
        this.props.history.push('/rooms');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Room</h3>
        }else{
            return <h3 className="text-center">Update Room</h3>
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

                                        <button className="btn btn-outline-success" onClick={this.saveOrUpdateRoom}>Save</button>
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

export default CreateRoomComponent

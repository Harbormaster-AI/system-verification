import React, { Component } from 'react'
import RoomService from '../services/RoomService'

class ViewRoomComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            room: {}
        }
    }

    componentDidMount(){
        RoomService.getRoomById(this.state.id).then( res => {
            this.setState({room: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Room Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> name:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.room.name }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewRoomComponent

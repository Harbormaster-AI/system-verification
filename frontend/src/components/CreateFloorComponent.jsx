import React, { Component } from 'react'
import FloorService from '../services/FloorService';

class CreateFloorComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
                name: '',
                level: ''
        }
        this.changenameHandler = this.changenameHandler.bind(this);
        this.changelevelHandler = this.changelevelHandler.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            FloorService.getFloorById(this.state.id).then( (res) =>{
                let floor = res.data;
                this.setState({
                    name: floor.name,
                    level: floor.level
                });
            });
        }        
    }
    saveOrUpdateFloor = (e) => {
        e.preventDefault();
        let floor = {
                floorId: this.state.id,
                name: this.state.name,
                level: this.state.level
            };
        console.log('floor => ' + JSON.stringify(floor));

        // step 5
        if(this.state.id === '_add'){
            floor.floorId=''
            FloorService.createFloor(floor).then(res =>{
                this.props.history.push('/floors');
            });
        }else{
            FloorService.updateFloor(floor).then( res => {
                this.props.history.push('/floors');
            });
        }
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

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Floor</h3>
        }else{
            return <h3 className="text-center">Update Floor</h3>
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

                                            <label> level:&emsp; </label>
                                                <input type="number" placeholder="level" name="level" className="form-control" value={this.state.level} onChange={this.changelevelHandler}/>

                                        </div>

                                        <button className="btn btn-outline-success" onClick={this.saveOrUpdateFloor}>Save</button>
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

export default CreateFloorComponent

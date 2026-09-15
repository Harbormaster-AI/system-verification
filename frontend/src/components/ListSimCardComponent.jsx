import React, { Component } from 'react'
import SimCardService from '../services/SimCardService'

class ListSimCardComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                simCards: []
        }
        this.addSimCard = this.addSimCard.bind(this);
        this.editSimCard = this.editSimCard.bind(this);
        this.deleteSimCard = this.deleteSimCard.bind(this);
    }

    deleteSimCard(id){
        SimCardService.deleteSimCard(id).then( res => {
            this.setState({simCards: this.state.simCards.filter(simCard => simCard.simCardId !== id)});
        });
    }
    viewSimCard(id){
        this.props.history.push(`/view-simCard/${id}`);
    }
    editSimCard(id){
        this.props.history.push(`/add-simCard/${id}`);
    }

    componentDidMount(){
        SimCardService.getSimCards().then((res) => {
            this.setState({ simCards: res.data});
        });
    }

    addSimCard(){
        this.props.history.push('/add-simCard/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">SimCard List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addSimCard}> Add SimCard</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Iccid </th>
                                    <th> Imsi </th>
                                    <th> Carrier </th>
                                    <th> Status </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.simCards.map(
                                        simCard => 
                                        <tr key = {simCard.simCardId}>
                                             <td> { simCard.iccid } </td>
                                             <td> { simCard.imsi } </td>
                                             <td> { simCard.carrier } </td>
                                             <td> { simCard.status } </td>
                                             <td>
                                                 <button onClick={ () => this.editSimCard(simCard.simCardId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteSimCard(simCard.simCardId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewSimCard(simCard.simCardId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListSimCardComponent

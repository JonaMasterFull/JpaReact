import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'

class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            employee: {}
        }
    }

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then( res => {
            this.setState({employee: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> Detalles del Empleado</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Nombre del Empleado: </label>
                            <div> { this.state.employee.nombre }</div>
                        </div>
                        <div className = "row">
                            <label> Apellidos del Empleado: </label>
                            <div> { this.state.employee.apellidos }</div>
                        </div>
                        <div className = "row">
                            <label> Edad del Empleado: </label>
                            <div> { this.state.employee.edad }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewEmployeeComponent

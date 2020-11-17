import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";

class CreateEmployeeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // step 2
      id: this.props.match.params.id,
      nombre: "",
      apellidos: "",
      edad: "",
    };
    this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
    this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
    this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
  }

  // step 3
  componentDidMount() {
    // step 4
    if (this.state.id === "_add") {
      return;
    } else {
      EmployeeService.getEmployeeById(this.state.id).then((res) => {
        let employee = res.data;
        this.setState({
          nombre: employee.nombre,
          apellidos: employee.apellidos,
          edad: employee.edad,
        });
      });
    }
  }
  saveOrUpdateEmployee = (e) => {
    e.preventDefault();
    let employee = {
      nombre: this.state.nombre,
      apellidos: this.state.apellidos,
      edad: this.state.edad,
    };
    console.log("employee => " + JSON.stringify(employee));

    // step 5
    if (this.state.id === "_add") {
      EmployeeService.createEmployee(employee).then((res) => {
        this.props.history.push("/employees");
      });
    } else {
      EmployeeService.updateEmployee(employee, this.state.id).then((res) => {
        this.props.history.push("/employees");
      });
    }
  };

  changeFirstNameHandler = (event) => {
    this.setState({ nombre: event.target.value });
  };

  changeLastNameHandler = (event) => {
    this.setState({ apellidos: event.target.value });
  };

  changeEmailHandler = (event) => {
    this.setState({ edad: event.target.value });
  };

  cancel() {
    this.props.history.push("/employees");
  }

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">Agregar Empleados</h3>;
    } else {
      return <h3 className="text-center">Actualizar Empleado</h3>;
    }
  }
  render() {
    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {this.getTitle()}
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label> Nombres: </label>
                    <input
                      placeholder="Nombres"
                      name="nombre"
                      className="form-control"
                      value={this.state.nombre}
                      onChange={this.changeFirstNameHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Apellidos: </label>
                    <input
                      placeholder="Apellidos"
                      name="apellidos"
                      className="form-control"
                      value={this.state.apellidos}
                      onChange={this.changeLastNameHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Edad: </label>
                    <input
                      placeholder="Edad"
                      name="edad"
                      className="form-control"
                      value={this.state.edad}
                      onChange={this.changeEmailHandler}
                    />
                  </div>

                  <button
                    className="btn btn-success"
                    onClick={this.saveOrUpdateEmployee}
                  >
                    Agregar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancelar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateEmployeeComponent;

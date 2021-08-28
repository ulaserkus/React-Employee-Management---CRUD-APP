import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { AddEmpModal } from './AddEmpModal';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { EditEmpModal } from './EditEmpModal';

export class Employee extends Component {

    constructor(props) {
        super(props);

        this.state = {
            emps: [],
            addModalShow: false,
            editModalShow: false
        };
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }


    refreshList() {
        fetch("https://localhost:44394/api/employee").then((response) => {
            return response.json();
        }).then((data) => {
            this.setState({
                emps: data
            })
        });
    }

    deleteEmployee(empId) {
        if (window.confirm('Are you sure ?')) {
            fetch("https://localhost:44394/api/employee/" + empId,
                {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            )
        }

    }

    render() {

        const { emps, empId, empName, dep, mailId, doj } = this.state;
        let addModalClose = () => {
            this.setState({
                addModalShow: false
            })
        }

        let editModalClose = () => {
            this.setState({
                editModalShow: false
            })
        }

        return (
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>Employee Name</th>
                            <th>Department Name</th>
                            <th>Mail</th>
                            <th>Date Of Join</th>
                            <th>Option</th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            emps.map(emp =>
                                <tr key={emp.EmployeeID}>
                                    <td>{emp.EmployeeID}</td>
                                    <td>{emp.EmployeeName}</td>
                                    <td>{emp.Department}</td>
                                    <td>{emp.EmployeeName}</td>
                                    <td>{emp.MailID}</td>
                                    <td>{emp.DOJ}</td>
                                    <td>
                                        <ButtonToolbar>
                                            <Button className="mx-1" onClick={() => this.setState({
                                                editModalShow: true,
                                                empId: emp.EmployeeID,
                                                empName: emp.EmployeeName,
                                                dep: emp.Department,
                                                mailId: emp.MailID,
                                                doj: emp.DOJ
                                            })} >
                                                Edit
                                            </Button>

                                            <Button className="mx-1" variant="danger" onClick={() => this.deleteEmployee(emp.EmployeeID)}>Delete</Button>
                                            <EditEmpModal show={this.state.editModalShow} onHide={editModalClose} empId={empId} empName={empName}
                                                dep={dep}
                                                mailId={mailId}
                                                doj={doj}
                                            ></EditEmpModal>
                                        </ButtonToolbar>
                                    </td>

                                </tr>


                            )
                        }

                    </tbody>

                </Table>
                <ButtonToolbar>
                    <Button onClick={() => this.setState({
                        addModalShow: true
                    })}>
                        Add Employee
                    </Button>
                </ButtonToolbar>
                <AddEmpModal show={this.state.addModalShow} onHide={addModalClose}></AddEmpModal>
            </div>
        )
    }
}



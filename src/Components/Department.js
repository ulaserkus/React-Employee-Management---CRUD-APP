import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { AddDepModal } from './AddDepModal';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { EditDepModal } from './EditDepModal';

export class Department extends Component {

    constructor(props) {
        super(props);

        this.state = {
            deps: [],
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
        fetch("https://localhost:44394/api/department").then((response) => {
            return response.json();
        }).then((data) => {
            this.setState({
                deps: data
            })
        });
    }

    deleteDepartment(depId) {
        if (window.confirm('Are you sure ?')) {
            fetch("https://localhost:44394/api/department/" + depId,
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
        const { deps, depId, depName } = this.state;
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
                            <th>Department ID</th>
                            <th>Department Name</th>
                            <th>Option</th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            deps.map(dep =>
                                <tr key={dep.DepartmentID}>
                                    <td>{dep.DepartmentID}</td>
                                    <td>{dep.DepartmentName}</td>
                                    <td>
                                        <ButtonToolbar>
                                            <Button className="mx-1" onClick={() => this.setState({
                                                editModalShow: true,
                                                depId: dep.DepartmentID,
                                                depName: dep.DepartmentName
                                            })} >
                                                Edit
                                            </Button>

                                            <Button className="mx-1" variant="danger" onClick={() => this.deleteDepartment(dep.DepartmentID)}>Delete</Button>
                                            <EditDepModal show={this.state.editModalShow} onHide={editModalClose} depId={depId} depName={depName} ></EditDepModal>
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
                        Add Department
                    </Button>
                </ButtonToolbar>
                <AddDepModal show={this.state.addModalShow} onHide={addModalClose}></AddDepModal>
            </div>
        )
    }
}



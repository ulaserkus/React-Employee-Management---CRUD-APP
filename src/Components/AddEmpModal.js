import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';


export class AddEmpModal extends Component{

    constructor(props) {
        super(props);
        this.state = {
            snackbarOpen: false,
            snackbarMsg: '',
            deps:[]
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    
    snackbarClose=()=>{
        this.setState({
            snackbarOpen: false
        });
    }

    componentDidMount(){
        fetch("https://localhost:44394/api/department")
        .then(response => response.json())
        .then(data=>{
            this.setState({
                deps:data
            })
        });
    }

 
    handleSubmit(event) {
        event.preventDefault();
        fetch("https://localhost:44394/api/employee", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    EmployeeID: null,
                    EmployeeName: event.target.EmployeeName.value,
                    Department: event.target.Department.value,
                    MailID: event.target.MailID.value,
                    DOJ: event.target.DOJ.value,

                }
            )
        })
            .then(res => res.json())
            .then((result) => {

               this.setState({
                   snackbarOpen:true,
                   snackbarMsg:result
               })

            }, (err) => {
                
                this.setState({
                    snackbarOpen:true,
                    snackbarMsg:'Failed'
                })
            }
            );

    }

    render() {
        return (
            <div className="container">
                <Snackbar
                    anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
                    open={this.state.snackbarOpen}
                    autoHideDuration={3000}
                    onClose={this.snackbarClose}
                    message={<span id="message-id">{this.state.snackbarMsg}</span>}
                    action={[
                        <IconButton key="close" aria-label="close" color="inherit" onClick={this.snackbarClose}>
                            x
                        </IconButton>
                    ]}

                />
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Employee
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="EmployeeName">
                                        <Form.Label>Employee Name</Form.Label>
                                        <Form.Control type="text" required placeholder="Employee Name"></Form.Control>

                                    </Form.Group>
                                    <Form.Group controlId="Department">
                                        <Form.Label>Department</Form.Label>
                                        <Form.Control as="select">
                                            {this.state.deps.map(dep=> <option key={dep.DepartmentID}>{dep.DepartmentName}</option>)}
                                            
                                        </Form.Control>

                                    </Form.Group>
                                    <Form.Group controlId="MailID">
                                        <Form.Label>Mail</Form.Label>
                                        <Form.Control type="text"  required placeholder="Mail Address"></Form.Control>

                                    </Form.Group>
                                    <Form.Group controlId="DOJ">
                                        <Form.Label>Date Of Join</Form.Label>
                                        <Form.Control type="date" required placeholder="Date Of Join"></Form.Control>

                                    </Form.Group>
                                    <Form.Group>
                                        <Button className="mt-2" variant="primary" type="submit">
                                            Add
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    };


}
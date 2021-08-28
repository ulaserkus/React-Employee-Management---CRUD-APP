import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';


export class AddDepModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            snackbarOpen: false,
            snackbarMsg: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    snackbarClose=()=>{
        this.setState({
            snackbarOpen: false
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch("https://localhost:44394/api/department", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    DepartmentID: null,
                    DepartmentName: event.target.DepartmentName.value
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
                            Add Department
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group>
                                        <Form.Label>Department Name</Form.Label>
                                        <Form.Control type="text" name="DepartmentName" required placeholder="Department Name"></Form.Control>

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
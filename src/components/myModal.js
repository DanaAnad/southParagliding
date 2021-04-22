import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal'
// import 'bootstrap/dist/css/bootstrap.min.css';
import "../modal.css";

export default class MyModalComponent extends Component {
    render() {
        console.log("modalPropss:ii:", this.props);
        return (
            <div>
                <Modal  show={this.props.show} onHide={() => this.props.onHide()}
                >
                <Modal.Header className = "modal-header" closeButton/> 
                    <Modal.Body className ="modal-body">                    
                    <div className = "data-container">
                        {this.props.data} 
                    </div>
                    </Modal.Body>
                    <Modal.Footer className = "modal-footer">
                    </Modal.Footer>
                </Modal>
            </div>
        )
    };
}

import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal'
import "../modal.css";


export default class MyModal extends Component {
    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={() => this.props.onHide()}
                >
                    <Modal.Body className ="modal-body">
                    
                    <div className = "Modal-data-container">
                        {/* <a className="Modal-close-button" onClick={() => this.props.onHide()}>
                            <span className="closeModalIcon">x</span>
                        </a> */}
                        <div className = "Modal-data">
                            {this.props.data} 
                        </div>
                    </div>
                    </Modal.Body>
                </Modal>
            </div>
        )
    };
}

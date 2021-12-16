import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal'
import "../../modal.css";

export default class MyModal extends Component {
  
    render() {
        return (
            <div>
                <Modal className="containerModal" centered show={this.props.show} onHide={() => {this.props.onHide()}}
                >
                 <a href='true' className="Modal-close-button" onClick={(e) => {e.preventDefault(); this.props.onHide()}}>
                    <span className="closeModalIcon">&times;</span>
                </a>
                    <Modal.Body className ="modalBody">
                        <div className = "Modal-data-container">
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

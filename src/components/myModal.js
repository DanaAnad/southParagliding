import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal'
import "../modal.css";


export default class MyModal extends Component {
    render() {
        console.log("modalPropss:ii:", this.props);
        return (
            <div>
                <Modal show={this.props.show} onHide={() => this.props.onHide()}
                >
                    <Modal.Body className ="modal-body">
                    
                    <div className = "data-container">
                    {/* <div class="close">
                        <button className="close-button" onClick={() => this.props.onHide()}>
                            <span>&times;</span>
                        </button>
                    </div> */}
                        {this.props.data} 
                    </div>
                    </Modal.Body>
                </Modal>
            </div>
        )
    };
}

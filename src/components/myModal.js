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
                    {/* <div class="callout" data-closable>
                        <button className="close-button" onClick={() => this.props.onHide()}  aria-label="Dismiss alert" type="button" data-close>
                            <span aria-hidden="true">&times;</span>
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

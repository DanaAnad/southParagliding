import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal'
// import 'bootstrap/dist/css/bootstrap.min.css';
import "../modal.css";


//de obicei numele componentei este si numele fisierului, amandoua cu prima litera mare (daca-i componenta)

export default class MyModalComponent extends Component {
    render() {
        console.log("modalPropss:ii:", this.props);
        return (
            <div>
                <Modal  show={this.props.show} onHide={() => this.props.onHide()}
                >
                <Modal.Header className = "modal-header" closeButton/> 
                {/* header nui inchis nicaieri iti strica si react si css */}
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

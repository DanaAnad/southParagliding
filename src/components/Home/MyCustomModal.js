import React from "react";
import "../../MyCustomModal.css";

export default class MyCustomModal extends React.Component {
  render() {
    return (
      <div className ="customModal" show={this.props.show}>
         <a href='true' className="customModalCloseButton" onClick={(e) => {e.preventDefault(); this.props.onHide()}}>
                    <span className="customModalCloseIcon">&times;</span>
                </a>
          <div className="customModalDialog" >
            <div className="customModalHeader">
            </div>
              <div className="customModalBody">
                <div className="customModalData">
                  {this.props.data}
                </div>
              </div>
          </div>
      </div>
    )
  }
}
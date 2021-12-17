import React from "react";
import "../../MyCustomModal.css";

export default class MyCustomModal extends React.Component {
  render() {
      console.log("customModalPropss::", this.props);
    return (
      <div className ="customModal" show={this.props.show}>
          <div className="customModalDialog" >
            <div className="customModalHeader">
              <a href='true' className="MyCustomModalCloseBtn" onClick={(e) => {e.preventDefault(); this.props.onHide()}}>
                  <span className="customModalCloseIcon">&times;</span>
              </a>
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
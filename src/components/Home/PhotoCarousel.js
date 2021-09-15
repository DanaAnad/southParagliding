import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel';
import "../../carousel.css";

export default class PhotoCarousel extends Component {
  render(){
    console.log("propsFoto::", this.props);
    return(
      <div >
        <Carousel interval={null} className="FotoCarousel">
            {this.props.items ? this.props.items.map((item, index) => {
                return (
                    <Carousel.Item key={index}>
                    <div>
                      {item.fileName && <img className ="pozaModal" src = {item.fileName} alt = {item.id} />}
                    </div>
                    </Carousel.Item>
                );
            }) : null}
        </Carousel>
      </div>
    )
  }
}


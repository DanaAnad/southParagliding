import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel';
import "../carousel.css";

export default class PhotoCarousel extends Component {
  render(){
    return(
      <div >
      <Carousel interval={null} className="FotoCarousel">
          {this.props.items.map((item, index) => {
              return (
                  <Carousel.Item key={index}>
                  <div>
                    <img className ="pozaModal" src = {item.src} alt = {item.id} />
                  </div>
                  </Carousel.Item>
              );
          })}
      </Carousel>
      </div>
    )
  }
}


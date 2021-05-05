import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel';
import "../carousel.css";

export default class LocationsCarousel extends Component {
  render(){
    return(
      <div>
      <Carousel interval={null} className="LocationsCarousel">
          {this.props.items.map((item, index) => {
              return (
                  <Carousel.Item className="locationsItem" key={index}>
                  <div>
                    <img className ="pozaModal" src = {item.src} alt = {item.id} />
                  </div>
                  <Carousel.Caption>
                    <h5>{item.title}</h5>
                  </Carousel.Caption>
                  </Carousel.Item>
              );
          })}
      </Carousel>

      </div>
    )
  }
}


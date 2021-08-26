import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel';
import "../../carousel.css";

export default class LocationsCarousel extends Component {
  render(){
    console.log("propsLocations::", this.props);
    return(
      <div>
      <Carousel interval={null} className="locationsCarousel">
          {this.props.items.map((item, index) => {
              return (
                  <Carousel.Item className="locationsItem" key={index}>
                  <div>
                    <img className ="pozaModal" src = {item.fileName} alt = {item.id} />
                  </div>
                  <Carousel.Caption className="locationsCaption">
                    <h5>{item.titlu}</h5>
                  </Carousel.Caption>
                  </Carousel.Item>
              );
          })}
      </Carousel>

      </div>
    )
  }
}


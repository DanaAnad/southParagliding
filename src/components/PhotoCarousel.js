import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel';
import "../carousel.css";

export default class PhotoCarousel extends Component {
  render(){
    return(
      <div className="ReusableCarousel">
      <Carousel interval={null} className="FotoCarousel">
          {this.props.items.map((item, index) => {
            console.log("itemSrc::", item.src)
              return (
                  <Carousel.Item key={index}>
                  <div>
                    <img className ="pozaModal" src = {item.src} alt = {item.id} />
                  </div>
                  <Carousel.Caption>
                    <h3>{item.title}</h3>
                  </Carousel.Caption>
                  </Carousel.Item>
              );
          })}
      </Carousel>
      </div>
    )
  }
}


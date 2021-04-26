import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import "../carousel.css";

export default class ReusableCarousel extends Component {
  render(){
    return(
      <div>
      <Carousel interval={null} className="carousel">
          {this.props.items.map((item, index) => {
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

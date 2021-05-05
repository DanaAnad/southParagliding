import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import "../carousel.css";

export default class VideoCarousel extends Component {

  render(){
    return(
      <div>
      <Carousel interval={null} >
          {this.props.items.map((item, index) => {
              return (
                  <Carousel.Item key={index}>
                  <video className="videoItem" controls="controls">
                        <source src={item.src} type="video/mp4"/>
                    </video>
                  {/* <Carousel.Caption>
                    <h2>{item.title}</h2>
                  </Carousel.Caption> */}
                  </Carousel.Item>
              );
          })}
      </Carousel>
      </div>
    )
  }
}


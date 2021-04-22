import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import "../carousel.css";

export default class VideoCarousel extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    // this.carousel().on('slide.bs.carousel',function(){
    //   this.carousel.item.find('video').each(function(){
    //     this.pause();
    //   });
    // });	
    // this.carousel().on('slide.bs.carousel',function(){
    //   this.carousel.item.active.find('video').each(function(){
    //     this.play();
    //   });
    // });
    return(
      <div>
      <Carousel interval={null}  className="carousel">
          {this.props.items.map((item, index) => {
              return (
                  <Carousel.Item key={index}>
                  <video className="videoItem" controls="controls">
                        <source src={item.src} type="video/mp4"/>
                    </video>
                  <Carousel.Caption>
                    {/* <h2>{item.title}</h2> */}
                  </Carousel.Caption>
                  </Carousel.Item>
              );
          })}
      </Carousel>
      </div>
    )
  }
}


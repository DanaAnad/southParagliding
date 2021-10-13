import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card'
import "../../carousel.css";

export default class VideoCarousel extends Component {

  render(){
    console.log("propsVideo::", this.props);
    return(
      <div>
      {this.props.items.length === 1 ? 
      <Carousel controls={false} className="videoCarousel" interval={null} >
        {this.props.items.reverse().map((item, index) => {
            return (
              <Carousel.Item key={index}>
                <video className="videoItem" controls="controls">
                    {item.fileName && <source src={item.fileName} type="video/mp4"/> }
                </video>
              </Carousel.Item>
            )
          })
        } 
      </Carousel> :
      this.props.items.length > 1 ?
      <Carousel className="videoCarousel" interval={null} >
        {this.props.items.reverse().map((item, index) => {
            return (
              <Carousel.Item key={index}>
                <video className="videoItem" controls="controls">
                    {item.fileName && <source src={item.fileName} type="video/mp4"/> }
                </video>
              </Carousel.Item>
            )
          })
        } 
      </Carousel> :
        <Card
            bg={"#fff"}
            text={ 'dark'}
            className="mb-2 bodyCard"
        >
            <Card.Body>
            <Card.Text>
                <span> No news here. <br />
                Admin please upload some data for the users.</span>
            </Card.Text>
            </Card.Body>
        </Card> 
      } 
      </div>
    )
  }
}

